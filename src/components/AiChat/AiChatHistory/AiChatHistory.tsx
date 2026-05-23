import { Box } from '@mui/material'
// import { useTranslation } from 'react-i18next'
import useGetSessions from '../../../api/hooks/tanstack/chat/useGetSessions'
import LoadingRows from '../../LoadingRows/LoadingRows'
import SessionCard from '../SessionCard/SessionCard'
import type { ChatSession } from '../../../api/hooks/tanstack/chat/useGetSession'

export type AiChatHistoryProps = {
    // chatItems: ChatResponse[]
    // chatPending: boolean
}

export default function AiChatHistory({ }: AiChatHistoryProps) {
    // const { t } = useTranslation()

    const { data: sessions = [], isLoading } = useGetSessions();

    function renderSessions(sessions: any) {

        if (isLoading) return <LoadingRows rows={50} />

        const sessionsData = sessions.map((session: ChatSession) => <SessionCard key={session.id} session={session} />)

        return sessionsData
    }
    return (
        <Box>
            {renderSessions(sessions)}
        </Box>

    )
}
