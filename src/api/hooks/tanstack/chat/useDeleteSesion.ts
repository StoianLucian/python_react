import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSession } from '../../../sessionApi';


export type CreateSessionProps = {
    query: string,
}

export function useDeleteSession() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            return await deleteSession(id);
        },
        onSuccess() {
            // navigate(`${APP_PATHS.CHAT}/${id}`, { replace: true })
            client.invalidateQueries({ queryKey: ['sessions'] })
        }
    });
}
