import { Box, Button, Grid } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { toggleIcon } from '../../pages/chat/helper'
import InputComponent from '../inputComponent/InputComponent'
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import { useChatModel } from '../../api/hooks/tanstack/chat/useChat'
import Icon from '../Icons/Icon'
import AiChatContainer from './AiChatContainer/AiChatContainer'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import { useCreateSession } from '../../api/hooks/tanstack/chat/useCreateSession'
import { useParams } from 'react-router-dom'
export enum Role {
    AGENT = "assistant",
    USER = "user",
}
export type ChatResponse = {
    content: string
    thinking: string
    role: Role
    isThinking?: boolean
    thinkingTime?: number
}

export type History = Pick<ChatResponse, "role" | "content">

export default function AiChat() {
    const [query, setQuery] = useState("")
    const [model, setModel] = useState<string>("")
    const [chatResponse, setChatResponse] = useState<ChatResponse[]>([]);
    const controllerRef = useRef<AbortController | null>(null);

    const { id } = useParams();

    const sessionId = id === "new" ? "" : id

    const aiIndexRef = useRef<number | null>(null);

    const { mutateAsync: startChat, isPending: chatPending } = useChatModel();
    const { mutateAsync: createSession } = useCreateSession()

    const { data: options = [], isLoading: loadingOptions, isSuccess: isModelsLoaded } = useChatModels()

    useEffect(() => {
        return () => {
            controllerRef.current?.abort();
        };
    }, []);

    function showAiResponse(chunk: string, isResponse: boolean, isLoading: boolean = false, time: number = 0) {

        setChatResponse((prev) => {
            let updated = [...prev];

            if (aiIndexRef.current === null) {
                aiIndexRef.current = updated.length;
                updated.push({
                    content: "",
                    thinking: "",
                    role: Role.AGENT
                });
            }

            const prevMessage = updated[aiIndexRef.current]?.content || ""
            const prevThinking = updated[aiIndexRef.current]?.thinking || ""

            updated[aiIndexRef.current] = {
                ...updated[aiIndexRef.current],

                ...(isResponse
                    ? {
                        content:
                            (prevMessage || "") + chunk,
                    }
                    : {
                        thinking:
                            (prevThinking || "") + chunk,
                        isThinking: isLoading,
                        thinkingTime: time
                    }),

                role: Role.AGENT,
            };

            return updated;
        });
    };


    const handleQuerySubmit = async (query: string) => {
        if (query.trim() === "") return
        controllerRef.current = new AbortController();
        aiIndexRef.current = null;

        const signal = controllerRef.current.signal;
        setQuery("");

        const newMessage = {
            content: query,
            thinking: "",
            role: Role.USER
        }

        const updatedHistory = [
            ...chatResponse,
            newMessage
        ];
        setChatResponse(updatedHistory);



        if (sessionId) {
            // console.log(sessionId);
            // await createSession()
        } else {
            await createSession({ query })
        }

        const obj = {
            model,
            history: updatedHistory.map((response) => ({
                role: response.role,
                content: response.content
            }))
        };

        await startChat({ obj, handleChunk: showAiResponse, signal })
    };

    function stopChat() {
        controllerRef.current?.abort();
    };

    function handleButton(bool: boolean) {
        if (bool) {
            stopChat()
        } else {
            handleQuerySubmit(query)
        }
    }

    useEffect(() => {
        if (isModelsLoaded && options[0]?.id) {
            setModel(options[0].id)
        }
    }, [isModelsLoaded])

    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10 h-screen'>
            <StatusDot model={model} />
            <AiChatContainer chatItems={chatResponse} chatPending={chatPending} />
            <Grid className="grid grid-cols-4 gap-4">
                <Box className="col-span-1">
                    <SelectComponent
                        onChange={setModel}
                        value={model}
                        options={options}
                        isLoading={loadingOptions}
                    />
                </Box>
                <Box className="col-span-3">
                    <InputComponent
                        value={query}
                        onChange={(value) => setQuery(value)}
                        endIcon={
                            <Button onClick={() => handleButton(chatPending)}>
                                <Icon
                                    iconName={toggleIcon(chatPending)}
                                    className="mx-1"
                                />
                            </Button>
                        }
                        frontIcon={
                            <Button onClick={() => handleButton(chatPending)}>
                                <Icon
                                    iconName={toggleIcon(chatPending)}
                                    className="mx-1"
                                />
                            </Button>
                        }
                    />
                </Box>
            </Grid>
        </Box>
    )
}

