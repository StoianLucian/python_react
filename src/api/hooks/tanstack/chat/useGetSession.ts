import { useQuery } from "@tanstack/react-query";
import { getSession } from "../../../sessionApi";

export type ChatSession = {
    id: string,
    title: string,
    created_at: Date
    chat_messages: ChatMessage[]
}

export type ChatMessage = {
    id: string,
    text: string,
    session_id: number,
    created_at: Date,
    created_by: number,
}

const useGetSession = (id: string) => {
    return useQuery({
        queryKey: ["session", id],
        queryFn: () => getSession(id),
        enabled: !!id,
    });
};

export default useGetSession;
