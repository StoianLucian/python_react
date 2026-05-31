import { Box, CircularProgress, Stack } from '@mui/material'
import AiChatMessage from '../AiChatMessage/AiChatMessage'
import CollapsableContainer from '../../CollapsableContainer/CollapsableContainer'
import { useTranslation } from 'react-i18next'
import { translations } from '../../../../i18n'
import { RoleEnum, type ChatResponse } from '../AiChat'

export type AiChatBoxProps = {
    chatItems: ChatResponse[]
    chatPending: boolean
    sessionFetching?: boolean
}

export default function AiChatContainer({ chatItems, chatPending, sessionFetching }: AiChatBoxProps) {
    const { t } = useTranslation()

    return (
        <Box className="h-[80vh] overflow-y-scroll bg-gray-100 rounded-lg my-4 p-6 flex flex-col gap-2">
            {sessionFetching ? (
                <CircularProgress />
            ) : (
                chatItems.map((chatItem, i) => {
                    const isUser = chatItem.role === RoleEnum.USER

                    return (
                        <Stack
                            key={i}
                            className={`max-w-[75%] px-3 py-2 rounded-lg gap-5 ${isUser
                                ? "self-end"
                                : "self-start"
                                }`}
                        >
                            {!isUser && chatItem.thinking && (
                                <CollapsableContainer
                                    loadingText={t(translations.aiChat.thinking)}
                                    text={t(translations.aiChat.thinkingTime, {
                                        value: chatItem?.thinkingTime || 0
                                    })}
                                    isLoading={chatItem?.isThinking}
                                >
                                    <AiChatMessage
                                        message={chatItem.thinking}
                                        alignRight={isUser}
                                    />
                                </CollapsableContainer>
                            )}

                            <AiChatMessage
                                message={chatItem.content}
                                alignRight={isUser}
                            />
                        </Stack>
                    )
                })
            )}
            <Box className="flex justify-center" >
                {chatPending && <CircularProgress />}
            </Box>
        </Box>
    )
}
