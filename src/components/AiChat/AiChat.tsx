import { Box, Button } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { options, toggleIcon } from '../../pages/files/helper'
import InputComponent from '../inputComponent/InputComponent'
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import { usePingModel } from '../../api/hooks/tanstack/usePingChat'
import { useChatModel } from '../../api/hooks/tanstack/chat/useChat'
import Icon from '../Icons/Icon'
import AiChatContainer from './AiChatContainer/AiChatContainer'

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
    const [status, setStatus] = useState<boolean>(false)
    const [model, setModel] = useState<string>(options[1].id)
    const [chatResponse, setChatResponse] = useState<ChatResponse[]>([]);
    const controllerRef = useRef<AbortController | null>(null);

    const aiIndexRef = useRef<number | null>(null);

    const { mutateAsync: pingModel, isPending: pingPending } = usePingModel(setStatus);
    const { mutateAsync: startChat, isPending: chatPending } = useChatModel();

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
        pingModel(model)
    }, [model])
    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10'>
            <StatusDot status={status} statusPending={pingPending} />
            <AiChatContainer chatItems={chatResponse} chatPending={chatPending} />
            <Box className="flex gap-4">
                <SelectComponent
                    onChange={setModel}
                    value={model}
                    options={options}
                    itemKey="id"
                />
                <InputComponent
                    // isDisabled={pingPending}
                    classNames='w-full'
                    value={query}
                    onChange={(value) => setQuery(value)}
                    endIcon={
                        <Button onClick={() => handleButton(chatPending)}>
                            <Icon
                                iconName={toggleIcon(chatPending)}
                                className='mx-1'
                            />
                        </Button>
                    }
                />
            </Box>
        </Box>
    )
}
