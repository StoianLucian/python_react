import { useMutation } from '@tanstack/react-query';
import { sendMessage } from '../../../messageApi';
import type { ChatResponse } from '../../../../chatContext/ChatContext';

type CreateMessageProps = {
    id: string,
    message: PartialChatResponse,
}

export type PartialChatResponse = Pick<ChatResponse, "content" | "role">

export function useCreateMessage() {
    return useMutation({
        mutationFn: async ({ id, message }: CreateMessageProps) => {
            return await sendMessage({ id, message });
        },
        onError(e) {
                console.log(e)
        }
    });
}
