import { Button, CircularProgress, Container, Stack } from '@mui/material'
import React from 'react'


type AuthFormProps = {
    children: React.ReactNode,
    onSubmit: () => void,
    btnText: string,
    isPending: boolean
}
function AuthFrom({ children, onSubmit, btnText, isPending }: AuthFormProps) {

    return (
        <Container maxWidth="lg" className='flex justify-center items-center'>
            <form onSubmit={onSubmit}>
                <Stack maxWidth="35rem" sx={{
                    width: "50vw"
                }} spacing={2}>
                    {children}
                    <Button variant="contained" type='submit'>{isPending ? <CircularProgress size={25} color="inherit" /> : btnText}</Button>
                </Stack>
            </form>
        </Container>

    )
}

export default AuthFrom