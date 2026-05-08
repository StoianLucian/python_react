import { Box, CircularProgress, Typography } from '@mui/material'
import { BsCircleFill } from 'react-icons/bs'


type StatusDotProps = {
    status: boolean;
    isPending: boolean
}
export default function StatusDot({ status, isPending }: StatusDotProps) {
    const color = status ? "green" : "red"
    const text = status ? "Active" : "Inactive"
    return (
        <Box className="flex justify-start items-center gap-2">
            {isPending
                ?
                <>
                    <CircularProgress size={20} /> Loading...
                </>
                :
                (<>
                    <BsCircleFill color={color} />
                    <Typography variant="caption">
                        {text}
                    </Typography></>)}
        </Box>
    )
}
