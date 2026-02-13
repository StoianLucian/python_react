import { Button, Container, Stack } from '@mui/material'
import React from 'react'


type AuthFormProps = {
    children: React.ReactNode,
    onSubmit: () => void,
    btnText: string
}
function AuthFrom({ children, onSubmit, btnText }: AuthFormProps) {
    

    return (
        <Container maxWidth="lg"
            sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <form onSubmit={onSubmit}>
                <Stack maxWidth="35rem" sx={{
                    width: "50vw"
                }} spacing={2}>
                    {children}
                    <Button variant="contained" type='submit'>{btnText}</Button>
                </Stack>
            </form>
        </Container>

    )
}

export default AuthFrom