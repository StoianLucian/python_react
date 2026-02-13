import { Controller, useForm } from 'react-hook-form'

import AuthFrom from '../components/Auth/AuthFrom'
import InputComponent, { InputComponentTypes } from '../components/inputComponent/InputComponent'
import { useTranslation } from 'react-i18next'

type RegisterSubmit = {
    account: string,
    password: string,
    confirmPassword: string
}

const defaultValues: RegisterSubmit = {
    account: "",
    password: "",
    confirmPassword: ""
}

function RegisterPage() {

    const { t } = useTranslation()

    const methods = useForm<RegisterSubmit>({
        defaultValues
    })

    const { control, handleSubmit } = methods

    const submitData = (data: RegisterSubmit) => {
        console.log(data);
    }
    return (
        <AuthFrom onSubmit={handleSubmit(submitData)} btnText={t("registerPage.register")}>
            <Controller
                name="account"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label="account"
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                    />
                )} />
            <Controller
                name="password"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label="password"
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        type={InputComponentTypes.PASSWORD}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <InputComponent
                        label="confirm password"
                        value={field.value}
                        onChange={field.onChange}
                        helperText={error?.message}
                        type={InputComponentTypes.PASSWORD}
                    />
                )}
            />
        </AuthFrom>
    )
}

export default RegisterPage