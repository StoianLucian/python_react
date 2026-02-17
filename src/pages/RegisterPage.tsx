import { Controller, useForm } from 'react-hook-form'

import AuthFrom from '../components/Auth/AuthFrom'
import InputComponent, { InputComponentTypes } from '../components/inputComponent/InputComponent'
import { useTranslation } from 'react-i18next'
import { useRegister } from '../api/hooks/tanstack/useRegister'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../routing/routes'

export type RegisterCredentials = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const defaultValues: RegisterCredentials = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
}

function RegisterPage() {
    const { t } = useTranslation()

    const methods = useForm<RegisterCredentials>({
        defaultValues
    })

    const { control, handleSubmit, watch } = methods

    const { mutateAsync } = useRegister()

    const submitData = async (data: RegisterCredentials) => {
        try {
            await mutateAsync(data)
        } catch (error) {

        }
    }

    return (
        <AuthFrom onSubmit={handleSubmit(submitData)} btnText={t("registerPage.register")}>
            <Controller
                name="username"
                control={control}
                rules={{ required: t("errors.isRequired", { field: t("registerPage.username") }) }}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("registerPage.username")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        error={!!error?.message}
                    />
                )} />
            <Controller
                name="email"
                control={control}
                rules={
                    {
                        required: t("errors.isRequired", { field: t("registerPage.email") }),
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: t("errors.invalidEmail")  // your translation for invalid email
                        }
                    }
                }
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("registerPage.email")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        error={!!error?.message}
                        type={InputComponentTypes.EMAIL}
                    />
                )} />
            <Controller
                name="password"
                control={control}
                rules={{ required: t("errors.isRequired", { field: t("registerPage.password") }) }}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("registerPage.password")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        type={InputComponentTypes.PASSWORD}
                        error={!!error?.message}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: t("errors.isRequired", { field: t("registerPage.confirmPassword") }),
                    validate: (value) => {
                        if (value !== watch("password")) {
                            return t("errors.passwordsDoNotMatch")
                        }
                    }
                }}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label={t("registerPage.confirmPassword")}
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        type={InputComponentTypes.PASSWORD}
                        error={!!error?.message}
                    />
                )}
            />
        </AuthFrom>
    )
}

export default RegisterPage