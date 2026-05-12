import { useMutation } from '@tanstack/react-query';
import { chat } from '../../../chatApi';
import type { History } from '../../../../components/AiChat/AiChat';

type ChatProps = {
    obj: {
        history: History[],
        model: string
    },
    handleChunk: (chunk: string, isResponse: boolean) => void,
    signal: AbortSignal
}

export function useChatModel() {
    return useMutation({
        mutationFn: async ({ obj, handleChunk, signal }: ChatProps) => {
            return await chat(obj, handleChunk, signal);
        },
    });
}