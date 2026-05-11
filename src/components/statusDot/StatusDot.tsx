import { Box, CircularProgress, Typography } from '@mui/material'
import { BsCircleFill } from 'react-icons/bs'


type StatusDotProps = {
    status: boolean;
    statusPending: boolean
}
export default function StatusDot({ status, statusPending }: StatusDotProps) {
    const color = status ? "green" : "red"
    const text = status ? "Active" : "Inactive"
    return (
        <Box className="flex justify-start items-center gap-2">
            {statusPending
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
