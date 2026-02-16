import { useMutation } from '@tanstack/react-query';
import { login } from '../../authApi';
import type { LoginSubmit } from '../../../pages/LoginPage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function useLogin() {
    const { t } = useTranslation()
    return useMutation({
        mutationFn: async (credentials: LoginSubmit) => {
            const response = await login(credentials); // credentials passed here
            throw new Error("testerror")
            return response;
        },
        onError: (error) => {
            toast("test")
        }
    });
}
