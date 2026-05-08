import { useMutation } from '@tanstack/react-query';
import { pingModel } from '../../chatApi';

export function usePingModel(statusHandler: React.Dispatch<React.SetStateAction<boolean>>) {
    return useMutation({
        mutationFn: async (model: string) => {
            const response = await pingModel(model);
            return response;
        },
        onError: (error) => {
            console.error(error)
            statusHandler(false)
        },
        onSuccess: (_success) => {
            statusHandler(true)
        }
    });
}
