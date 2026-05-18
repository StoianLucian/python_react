import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { translations } from '../../../../i18n'

export type AiChatHistoryProps = {
    // chatItems: ChatResponse[]
    // chatPending: boolean
}

export default function AiChatHistory({ }: AiChatHistoryProps) {
    const { t } = useTranslation()
    return (
        <Box className="h-[80vh] overflow-y-scroll bg-gray-100 rounded-lg my-4 p-6 flex flex-col gap-2">
            {t(translations.aiChat.chatHistory)}
        </Box>
    )
}
