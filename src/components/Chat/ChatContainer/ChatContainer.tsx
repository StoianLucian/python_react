import { Box, CircularProgress, Stack } from '@mui/material'
import CollapsableContainer from '../../CollapsableContainer/CollapsableContainer'
import { useTranslation } from 'react-i18next'
import { translations } from '../../../../i18n'
import { RoleEnum } from '../AiChat'
import type { ChatResponse } from '../../../chatContext/ChatContext'
import ChatMessage from '../ChatMessage/ChatMessage'

export type AiChatBoxProps = {
    chatItems: ChatResponse[]
    chatPending: boolean
    sessionFetching?: boolean
}

export default function ChatContainer({ chatItems, chatPending, sessionFetching }: AiChatBoxProps) {
    const { t } = useTranslation()

    return (
        <Box className="h-[80vh] overflow-y-auto bg-gray-100 rounded-lg my-4 p-6 flex flex-col gap-2">
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
                                    <ChatMessage
                                        message={chatItem.thinking}
                                        alignRight={isUser}
                                    />
                                </CollapsableContainer>
                            )}

                            <ChatMessage
                                message={chatItem.content}
                                alignRight={isUser}
                            />
                            <Box className="flex flex-wrap gap-2 mb-2">
                                {(chatItem?.images || []).map((img, idx) => {
                                    const imageSrc = `data:image/png;base64,${img}`;

                                    return (
                                        <a
                                            key={idx}
                                            href={imageSrc}
                                            download={`attachment-${idx}.png`}
                                        >
                                            <img
                                                src={imageSrc}
                                                alt="attachment"
                                                className="max-w-50 max-h-50 rounded-lg border cursor-pointer"
                                            />
                                        </a>
                                    );
                                })}
                            </Box>
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
