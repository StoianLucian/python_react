import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'

type AiChatMessageProps = {
    message: string;
    alignRight: boolean;
}

export default function AiChatMessage({ message, alignRight }: AiChatMessageProps) {

    if (message == "") return

    const alignEnd = "bg-blue-500 text-white self-end"
    const alignStart = "bg-white self-start"
    const AiClasses = "text-gray-400 p-2 rounded-lg font-mono text-[13px] border-l-[3px] border-l-blue-500 opacity-90"

    return (
        <Box
            className={`${AiClasses} ${alignRight
                ? alignEnd
                : alignStart
                } `}
        >
            <ReactMarkdown>{message}</ReactMarkdown>
        </Box>
    )
}
