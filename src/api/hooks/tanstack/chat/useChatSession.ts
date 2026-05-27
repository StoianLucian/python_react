import { useEffect, useRef, useState } from "react"
import { useChatModel } from "./useChat"
import { useCreateSession } from "./useCreateSession"
import { useParams } from "react-router-dom"
import { useCreateMessage } from "./useCreateMessage"
import useGetSession from "./useGetSession"

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

export function useChatSession(model: string) {
    const [chatResponse, setChatResponse] = useState<ChatResponse[]>([]);
    const [query, setQuery] = useState("")

    const { id } = useParams();

    const isNewChat = id === "new";


    const controllerRef = useRef<AbortController | null>(null)
    const aiIndexRef = useRef<number | null>(null)

    const { mutateAsync: startChat, isPending: isChatPending } = useChatModel()
    const { mutateAsync: createSession } = useCreateSession()
    const { mutateAsync: createMessage } = useCreateMessage()
    const { data: sessionData, isFetching: isSessionFetching } = useGetSession(id!)

    function stopChat() {
        controllerRef.current?.abort()
    }

    useEffect(() => {
        if (isNewChat) {
            setChatResponse([])
            setQuery("")
            aiIndexRef.current = null
            controllerRef.current?.abort()
        } else {
            const messages = sessionData?.chat_messages.map((message) => ({
                content: message.text,
                thinking: "",
                role: message.created_by === 1 ? Role.USER : Role.AGENT
            })) || [];

            setChatResponse(messages)
        }
    }, [id])

    function showAiResponse(
        chunk: string,
        isResponse: boolean,
        isLoading = false,
        time = 0
    ) {
        setChatResponse((prev) => {
            const updated = [...prev]

            if (aiIndexRef.current === null) {
                aiIndexRef.current = updated.length
                updated.push({
                    content: "",
                    thinking: "",
                    role: Role.AGENT,
                })
            }

            const idx = aiIndexRef.current

            updated[idx] = {
                ...updated[idx],
                role: Role.AGENT,
                ...(isResponse
                    ? {
                        content: (updated[idx]?.content || "") + chunk,
                    }
                    : {
                        thinking: (updated[idx]?.thinking || "") + chunk,
                        isThinking: isLoading,
                        thinkingTime: time,
                    }),
            }
            return updated
        })
    }

    const sendMessage = async (query: string) => {
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

        if (isNewChat) {
            const createdSessionId = await createSession({ query })
            await createMessage({ id: createdSessionId, message: { content: query, role: Role.USER } })
        } else {
            await createMessage({ id: id!, message: { content: query, role: Role.USER } })
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

    return {
        chatResponse,
        query,
        setQuery,
        sendMessage,
        stopChat,
        isChatPending,
        isSessionFetching
    }
}