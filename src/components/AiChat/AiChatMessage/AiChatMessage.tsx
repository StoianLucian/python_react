import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

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
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                    code(props) {
                        const { children, className } = props

                        if (className === "language-html") {
                            return <div dangerouslySetInnerHTML={{ __html: String(children) }} />
                        }

                        return <code className={className}>{children}</code>
                    }
                }}
            >
                {message}
            </ReactMarkdown>
        </Box>
    )
}
