import { Box, Skeleton } from '@mui/material'

type LoadingRowsType = {
    rows?: number
    height?: number
}

export default function LoadingRows({ rows = 1, height = 20 }: LoadingRowsType) {
    return (
        <>
            {Array.from({ length: rows }).map((_, index) => (
                <Box className="m-1.5" key={index}>
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        height={height}
                        className="w-full"
                    />
                </Box>
            ))}
        </>

    )
}
