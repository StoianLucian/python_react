import { useMutation } from '@tanstack/react-query';
import { login } from '../../authApi';
import type { LoginCredentials } from '../../../pages/LoginPage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export function useLogin() {
    const { t } = useTranslation()
    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await login(credentials); // credentials passed here
            return response;
        },
        onError: (error: any) => {
            const errorCode = error.response?.data?.detail?.errorCode;
            if (errorCode) {
                const errorMessage = t(`errors.${errorCode}`);
                toast(errorMessage, {type: "error"});
            } else {
                toast(t("errors.unknownError"), { type: "error" });
            }
        }
    });
}
