import { useMutation } from '@tanstack/react-query';
import { logout } from '../../authApi';
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

export function useLogout() {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuthContext();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: async () => {
            const response = await logout();
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
            if (data?.status === 200) {
                toast(t('logout.success'), { type: 'success' });
                setIsAuthenticated(false);
                setUser(undefined);
                navigate(APP_PATHS.LOGIN);
            } else {
                toast(t('logout.error'), { type: 'error' });
            }

        }

    });
}