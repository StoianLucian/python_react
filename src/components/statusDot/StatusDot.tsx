import { Box, CircularProgress, Typography } from '@mui/material'
import { BsCircleFill } from 'react-icons/bs'
import { usePingModel } from '../../api/hooks/tanstack/chat/usePingChat';
import { useEffect, useState } from 'react';
import type { LlmProvider } from '../../enums/providers';


type StatusDotProps = {
    model: string;
    provider: LlmProvider;
}
export default function StatusDot({ model, provider }: StatusDotProps) {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (model)
            pingModel({ model, provider })
    }, [model, provider])

    const { mutateAsync: pingModel, isSuccess } = usePingModel(setStatus);
    const color = status ? "green" : "red"
    const text = status ? "Active" : "Inactive"

    return (
        <Box className="flex justify-start items-center gap-2">
            {!isSuccess
                ?
                <>
                    <CircularProgress size={20} />
                    <Typography className={`overflow-hidden ${!isSuccess ? "animate-loading" : ""} `}>
                        Loading...
                    </Typography>
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
