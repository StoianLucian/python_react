import { Checkbox, FormControlLabel, Stack } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import AuthFrom from '../components/Auth/AuthFrom'
import InputComponent, { InputComponentTypes } from '../components/inputComponent/InputComponent'
import { useTranslation } from 'react-i18next';
import { useLogin } from '../api/hooks/tanstack/useLogin';
import { APP_PATHS } from '../routing/routes';
import NavigationLink from '../components/navigationLink/NavigationLink';
import { useAuthContext } from '../authContext/AuthContext';


export type LoginCredentials = {
    account: string,
    password: string,
    remember: boolean
}

const defaultValues: LoginCredentials = {
    account: "",
    password: "",
    remember: false

}

function LoginPage() {

    const { t } = useTranslation()
    const methods = useForm<LoginCredentials>({
        defaultValues
    })

    const { setUser, setIsAuthenticated } = useAuthContext()

    const { control, handleSubmit } = methods

    const { mutateAsync: loginHandler } = useLogin()

    function handleLogin(user: { id: string, username: string, email: string }) {
        setUser(user)
        setIsAuthenticated(true)
    }

    const submitData = async (data: LoginCredentials) => {
        try {
            const user = await loginHandler(data);

            handleLogin(user)
        } catch (error) {

        }
    }

    return (
        <AuthFrom onSubmit={handleSubmit(submitData)} btnText={t("loginPage.login")} >
            <Controller
                name="account"
                control={control}
                rules={{ required: t("errors.isRequired", { field: t("loginPage.account") }) }}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("loginPage.account")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        error={!!error?.message}
                    />
                )} />
            <Controller
                name="password"
                control={control}
                rules={{ required: t("errors.isRequired", { field: t("loginPage.password") }) }}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("loginPage.password")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        error={!!error?.message}
                        type={InputComponentTypes.PASSWORD}
                    />
                )}
            />
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Controller
                    name="remember"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />}
                            label={t("loginPage.rememberMe")}
                        />
                    )}
                />
                <NavigationLink to={APP_PATHS.REGISTER} linkText={t("loginPage.registerNewAccount")} />
            </Stack>
        </AuthFrom>
    )
}

export default LoginPage