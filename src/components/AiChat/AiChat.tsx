import { Box, Button, Grid } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toggleIcon } from '../../pages/chat/helper'
import InputComponent from '../inputComponent/InputComponent'
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import { useChatModel } from '../../api/hooks/tanstack/chat/useChat'
import Icon from '../Icons/Icon'
import AiChatContainer from './AiChatContainer/AiChatContainer'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import { useParams } from 'react-router-dom'
import { keyboardShortcuts } from '../inputComponent/helper'
import { useChatSession } from '../../api/hooks/tanstack/chat/useChatSession'

export enum Role {
    AGENT = "assistant",
    USER = "user",
}
export type ChatResponse = {
    content: string
    thinking: string
    role: Role
    isThinking?: boolean
    thinkingTime?: number
}

export type History = Pick<ChatResponse, "role" | "content">

export default function AiChat() {
    const [model, setModel] = useState<string>("")
    // const controllerRef = useRef<AbortController | null>(null);

    const { id } = useParams();


    const { chatResponse, sendMessage, stopChat, isChatPending, query, setQuery } = useChatSession(model, id)

    const { data: options = [], isLoading: loadingOptions, isSuccess: isModelsLoaded } = useChatModels()

    function handleButton(bool: boolean) {
        if (bool) {
            stopChat()
        } else {
            sendMessage(query)
        }
    }

    useEffect(() => {
        if (isModelsLoaded && options[0]?.id) {
            setModel(options[0].id)
        }
    }, [isModelsLoaded])

    const endIcon = useMemo(() => {
        return (
            <Button onClick={() => handleButton(isChatPending)}>
                <Icon
                    iconName={toggleIcon(isChatPending)}
                    className="mx-1"
                />
            </Button>
        )
    }, [isChatPending, query])

    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10 h-screen'>
            <StatusDot model={model} />
            <AiChatContainer chatItems={chatResponse} chatPending={isChatPending} />
            <Grid className="grid grid-cols-4 gap-4">
                <Box className="col-span-1">
                    <SelectComponent
                        onChange={setModel}
                        value={model}
                        options={options}
                        isLoading={loadingOptions}
                    />
                </Box>
                <Box className="col-span-3">
                    <InputComponent
                        hotKey={keyboardShortcuts.submit}
                        onKeyDown={() => sendMessage(query)}
                        value={query}
                        onChange={(value) => setQuery(value)}
                        endIcon={endIcon}
                    />
                </Box>
            </Grid>
        </Box>
    )
}

