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

export enum Sender {
    AGENT = "AGENT",
    USER = "USER",
}
export type ChatResponse = {
    message: string
    thinking: string
    sender: Sender
}

export default function AiChat() {
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState<boolean>(false)
    const [model, setModel] = useState<string>(options[1].id)
    const [chatResponse, setChatResponse] = useState<ChatResponse[]>([]);
    const controllerRef = useRef<AbortController | null>(null);

    let aiIndex: number | null = null;

    const { mutateAsync: pingModel, isPending: pingPending } = usePingModel(setStatus);
    const { mutateAsync: startChat, isPending: chatPending } = useChatModel();

    function showAiResponse(chunk: string, isResponse: boolean) {

        setChatResponse((prev) => {
            let updated = [...prev];

            if (aiIndex === null) {
                aiIndex = updated.length;
                updated.push({
                    message: "",
                    thinking: "",
                    sender: Sender.AGENT,
                });
            }

            const prevMessage = updated[aiIndex]?.message || ""
            const prevThinking = updated[aiIndex]?.thinking || ""

            updated[aiIndex] = {
                ...updated[aiIndex],

                ...(isResponse
                    ? {
                        message:
                            (prevMessage || "") + chunk,
                    }
                    : {
                        thinking:
                            (prevThinking || "") + chunk,
                    }),

                sender: Sender.AGENT,
            };

            return updated;
        });
    };


    const handleQuerySubmit = async (query: string) => {
        if (query.trim() === "") return
        controllerRef.current = new AbortController();


        const signal = controllerRef.current.signal;
        setQuery("");
        setChatResponse((prev) => [
            ...prev,
            { message: query, thinking: "", sender: Sender.USER },
        ]);

        console.log(chatResponse)

        const obj = {
            model: model,
            prompt: query
        }

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
