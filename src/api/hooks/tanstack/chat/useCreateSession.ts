import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../../../sessionApi';
import { APP_PATHS } from '../../../../routing/routes';

export type CreateSessionProps = {
    query: string,
}

export function useCreateSession() {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ query }: CreateSessionProps) => {
            const response = await createSession({ query });
            return response;
        },
        onSuccess(id) {
            navigate(`${APP_PATHS.CHAT}/${id}`, { replace: true })
        }
    });
}
