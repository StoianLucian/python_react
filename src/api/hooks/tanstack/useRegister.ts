import { useMutation } from '@tanstack/react-query';
import { register } from '../../userApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { APP_PATHS } from '../../../routing/routes';
import type { RegisterCredentials } from '../../../pages/register/RegisterPage';


export function useRegister() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (credentials: RegisterCredentials) => {
            const response = await register(credentials);
            return response;
        },
        onError: (error) => {
            console.log(error)
            toast("test")
        },
        onSuccess: (success) => {
            console.log(success)
            toast(t("success.accountCreated"), { type: "success" })
            navigate(APP_PATHS.LOGIN);

        }
    });
}
