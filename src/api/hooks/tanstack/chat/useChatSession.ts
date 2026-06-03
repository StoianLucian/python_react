import { useEffect, useRef, useState } from "react"
import { useChatModel } from "./useChat"
import { useCreateSession } from "./useCreateSession"
import { useParams } from "react-router-dom"
import { useCreateMessage } from "./useCreateMessage"
import { useChatContext } from "../../../../chatContext/ChatContext"

export const RoleEnum = {
    AGENT: "assistant",
    USER: "user",
}

export type Role = typeof RoleEnum[keyof typeof RoleEnum];

export type ChatResponse = {
    content: string
    thinking: string
    role: Role
    isThinking?: boolean
    thinkingTime?: number
}

export function useChatSession(model: string) {
    const { chatResponse = [], setChatResponse, isSessionFetching } = useChatContext()
    const [query, setQuery] = useState("")
    const [file, setFile] = useState<File | null>(null)

    function resetInputs() {
        setQuery("");
        setFile(null);
    }

    const { id } = useParams();

    const isNewChat = id === "new";

    const controllerRef = useRef<AbortController | null>(null)
    const aiIndexRef = useRef<number | null>(null)

    const { mutateAsync: startChat, isPending: isChatPending } = useChatModel()
    const { mutateAsync: createSession } = useCreateSession()
    const { mutateAsync: createMessage } = useCreateMessage()

    function stopChat() {
        controllerRef.current?.abort()
    }

    useEffect(() => {
        if (isNewChat) {
            setQuery("");
            aiIndexRef.current = null;
            controllerRef.current?.abort();
            return;
        }
    }, [isNewChat]);

    function attachHistory(query: string) {
        const message = {
            content: query,
            thinking: "",
            role: RoleEnum.USER
        };

        const history = [...chatResponse, message];

        setChatResponse?.(history);

        resetInputs();

        return history;
    }

    function showAiResponse(
        chunk: string,
        isResponse: boolean,
        isLoading = false,
        time = 0
    ) {
        setChatResponse?.((prev) => {
            const updated = [...prev]

            if (aiIndexRef.current === null) {
                aiIndexRef.current = updated.length
                updated.push({
                    content: "",
                    thinking: "",
                    role: RoleEnum.AGENT,
                })
            }

            const idx = aiIndexRef.current

            updated[idx] = {
                ...updated[idx],
                role: RoleEnum.AGENT,
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

    async function handleUserMessage(query: string) {
        if (isNewChat) {
            const sessionId = await createSession({ query });
            await createMessage({ id: sessionId, message: { content: query, role: RoleEnum.USER } })
            return sessionId
        } else {
            await createMessage({ id: id!, message: { content: query, role: RoleEnum.USER } })
            return id
        }
    }

    const sendMessage = async (query: string) => {
        if (query.trim() === "") return
        controllerRef.current?.abort();
        controllerRef.current = new AbortController();
        aiIndexRef.current = null;

        const signal = controllerRef.current.signal;

        const updatedHistory = attachHistory(query)

        const history = {
            model,
            history: updatedHistory.map((message) => ({
                role: message.role,
                content: message.content
            }))
        };

        const sessionId = await handleUserMessage(query)

        const aiMessage = await startChat({
            obj: history,
            handleChunk: showAiResponse,
            signal,
        });

        if (sessionId && aiMessage) {
            await createMessage({ id: sessionId, message: { content: aiMessage, role: RoleEnum.AGENT } })
        }
    };

    return {
        chatResponse,
        query,
        setQuery,
        sendMessage,
        stopChat,
        isChatPending,
        isSessionFetching,
        setFile,
        file
    }
}