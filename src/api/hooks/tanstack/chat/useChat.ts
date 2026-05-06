import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { chat } from '../../../chatApi';

type ChatProps = {
    query: string,
    handleChunk: (chunk: string) => void,
    signal: AbortSignal
}

export function useChat() {
    return useMutation({
        mutationFn: async ({ query, handleChunk, signal }: ChatProps) => {
            return await chat(query, handleChunk, signal);
        },
    });
}