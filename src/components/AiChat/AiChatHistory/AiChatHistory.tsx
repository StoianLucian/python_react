import { Box, Button } from '@mui/material'
// import { useTranslation } from 'react-i18next'
import useGetSessions from '../../../api/hooks/tanstack/chat/useGetSessions'
import LoadingRows from '../../LoadingRows/LoadingRows'
import SessionCard from '../SessionCard/SessionCard'
import type { ChatSession } from '../../../api/hooks/tanstack/chat/useGetSession'
import { useNavigate } from 'react-router-dom'
import { APP_PATHS } from '../../../routing/routes'

export type AiChatHistoryProps = {
    // chatItems: ChatResponse[]
    // chatPending: boolean
}

export default function AiChatHistory({ }: AiChatHistoryProps) {
    // const { t } = useTranslation()

    const navigate = useNavigate();

    const { data: sessions = [], isLoading } = useGetSessions();

    function renderSessions(sessions: any) {

        if (isLoading) return <LoadingRows rows={50} />

        const sessionsData = sessions.map((session: ChatSession) => <SessionCard key={session.id} session={session} />)

        return sessionsData
    }
    return (
        <Box>
            <Button onClick={() => navigate(APP_PATHS.CHAT_NEW, { replace: true })}>newChat</Button>
            {renderSessions(sessions)}
        </Box>

    )
}
