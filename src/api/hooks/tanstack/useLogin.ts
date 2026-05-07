import { useMutation } from '@tanstack/react-query';
import { login } from '../../authApi';
// import type { LoginCredentials } from '../../../pages/LoginPage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '../../../authContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { APP_PATHS } from '../../../routing/routes';

export type LoginResponse = {
    id: string
    username: string
    email: string
}

export function useLogin() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuthContext();
    const { t } = useTranslation();
    return useMutation<LoginResponse, any>({
        mutationFn: async (credentials) => {
            const response = await login(credentials);
            return response;
        },
        onError: (error: any) => {
            const errorCode = error.response?.data?.detail?.errorCode;
            if (errorCode) {
                toast(t(`errors.${errorCode}`), { type: 'error' });
            } else {
                toast(t('errors.unknownError'), { type: 'error' });
            }
        },
        onSuccess(data) {
            setIsAuthenticated(true);
            setUser(data);
            navigate(APP_PATHS.HOME);
        }
    });
}