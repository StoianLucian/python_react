import { Box, Button } from '@mui/material'
import useGetSessions, { type ChatSession } from '../../../api/hooks/tanstack/chat/useGetSessions'
import LoadingRows from '../../LoadingRows/LoadingRows'
import SessionCard from '../SessionCard/SessionCard'
import { useChatContext } from '../../../chatContext/ChatContext'

export type AiChatHistoryProps = {
    // chatItems: ChatResponse[]
    // chatPending: boolean
}

export default function AiChatHistory({ }: AiChatHistoryProps) {

    const { data: sessions = [], isLoading, isFetching } = useGetSessions();

    const { startSession } = useChatContext();

    function renderSessions(sessions: ChatSession[]) {

        if (isLoading || isFetching || sessions == undefined) return <LoadingRows rows={20} />

        const sessionsData = sessions.map((session) => <SessionCard key={session.id} session={session} />)

        return sessionsData
    }

    return (
        <Box>
            <Button onClick={startSession}>New Chat</Button>
            {renderSessions(sessions)}
        </Box>

    )
}
