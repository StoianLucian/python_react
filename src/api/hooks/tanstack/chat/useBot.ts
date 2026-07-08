import { useMutation } from '@tanstack/react-query';
import { bot } from '../../../botApi';
import type { History } from '../../../../components/Chat/AiChat';


export type BotModelProps = {
    messages: History[]
    model: string
}

export function useBotModel() {
    return useMutation<string, Error, BotModelProps>({
        mutationFn: async ({ messages, model }: BotModelProps) => {
            return await bot({ messages, model });
        },
    });
}