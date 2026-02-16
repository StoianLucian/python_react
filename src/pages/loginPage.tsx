import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import AuthFrom from '../components/Auth/AuthFrom'
import InputComponent, { InputComponentTypes } from '../components/inputComponent/InputComponent'
import { useTranslation } from 'react-i18next';
import { useLogin } from '../api/hooks/tanstack/useLogin';


export type LoginSubmit = {
    account: string,
    password: string,
    remember: boolean
}

const defaultValues: LoginSubmit = {
    account: "",
    password: "",
    remember: false

}

function LoginPage() {

    const { t } = useTranslation()
    const methods = useForm<LoginSubmit>({
        defaultValues
    })

    const { control, handleSubmit } = methods

    const { mutateAsync } = useLogin()

    const submitData = async (data: LoginSubmit) => {
        try {
            const test = await mutateAsync(data)
        } catch (error) {

        }

    }

    return (
        <AuthFrom onSubmit={handleSubmit(submitData)} btnText={t("loginPage.login")} >
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
                name="remember"
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <FormControlLabel
                        control={<Checkbox
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                        />}
                        label="Remember me"
                    />
                )}
            />
        </AuthFrom>
    )
}

export default LoginPage