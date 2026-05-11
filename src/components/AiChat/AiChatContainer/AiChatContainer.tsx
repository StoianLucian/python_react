import { Box, CircularProgress, Stack } from '@mui/material'
import { Sender, type ChatResponse } from '../AiChat'
import AiChatMessage from '../AiChatMessage/AiChatMessage'
import CollapsableContainer from '../../CollapsableContainer/CollapsableContainer'

export type AiChatBoxProps = {
    chatItems: ChatResponse[]
    chatPending: boolean
}

export default function AiChatContainer({ chatItems, chatPending }: AiChatBoxProps) {
    return (
        <Box className="h-[80vh] overflow-y-scroll bg-gray-100 rounded-lg my-4 p-6 flex flex-col gap-2">
            {chatItems.map((chatItem, i) => {
                const isUser = chatItem.role === Sender.USER

                return (
                    <Stack key={i} className={`max-w-[75%] px-3 py-2 rounded-lg gap-5 ${isUser
                        ? "self-end"
                        : "self-start"
                        }`}>

                        <CollapsableContainer>
                            <AiChatMessage
                                message={chatItem.thinking}
                                alignMessage={isUser}
                                showMessage={!isUser} />
                        </CollapsableContainer>
                        <AiChatMessage
                            message={chatItem.content}
                            alignMessage={isUser}
                            showMessage
                        />
                    </Stack>
                )
            })}
            <Box className="flex justify-center" >
                {chatPending && <CircularProgress />}
            </Box>
        </Box>
    )
}
