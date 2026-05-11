import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'

type AiChatMessageProps = {
    message: string;
    alignMessage: boolean;
    showMessage: boolean;
}

export default function AiChatMessage({ message, alignMessage, showMessage }: AiChatMessageProps) {

    if (!showMessage || message == "") return

    const alignEnd = "bg-blue-500 text-white self-end"
    const alignStart = "bg-white self-start"
    const AiClasses = "text-gray-400 p-2 rounded-lg font-mono text-[13px] border-l-[3px] border-l-blue-500 opacity-90"

    return (
        <Box
            className={`${AiClasses} ${alignMessage
                ? alignEnd
                : alignStart
                } `}
        >

            <ReactMarkdown>{message}</ReactMarkdown>

        </Box>
    )
}
