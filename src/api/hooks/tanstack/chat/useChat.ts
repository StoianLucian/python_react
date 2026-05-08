import { useMutation } from '@tanstack/react-query';
import { chat } from '../../../chatApi';

type ChatProps = {
    obj: {
        prompt: string,
        model: string
    },
    handleChunk: (chunk: string) => void,
    signal: AbortSignal
}

export function useChat() {
    return useMutation({
        mutationFn: async ({ obj, handleChunk, signal }: ChatProps) => {
            return await chat(obj, handleChunk, signal);
        },
    });
}