import { Box, Button, Grid } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { toggleIcon } from '../../pages/chat/helper'
import InputComponent from '../inputComponent/InputComponent'
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import Icon from '../Icons/Icon'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import { keyboardShortcuts } from '../inputComponent/helper'
import { useChatSession } from '../../api/hooks/tanstack/chat/useChatSession'
import { useChatContext, type ChatResponse } from '../../chatContext/ChatContext'
import { useParams } from 'react-router-dom'
import ChatContainer from './ChatContainer/ChatContainer'

export const RoleEnum = {
    AGENT: "assistant",
    USER: "user",
}

export type Role = typeof RoleEnum[keyof typeof RoleEnum];

export type History = Pick<ChatResponse, "role" | "content">

export default function AiChat() {
    const { changeSession } = useChatContext()
    const [model, setModel] = useState<string>("")

    const { id } = useParams();

    const {
        chatResponse,
        sendMessage,
        stopChat,
        isChatPending,
        query,
        setQuery,
        isSessionFetching,
        setFile,
        file
    } = useChatSession(model)

    const { data: options = [], isLoading: loadingOptions } = useChatModels(setModel)

    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (id && id !== "new") {
            changeSession(id)
        }
    }, [])

    function handleButton(bool: boolean) {
        if (bool) {
            stopChat()
        } else {
            sendMessage(query)
        }
    }

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

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const files = Array.from(e.dataTransfer.files);

        console.log(files[0]);

        if (files.length > 0) {
            const file = files[0];
            setFile(file);
        };
    }

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // cleanup to avoid memory leaks
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10 h-screen'>
            <StatusDot
                model={model}
            />
            <ChatContainer
                chatItems={chatResponse}
                chatPending={isChatPending}
                sessionFetching={isSessionFetching}
            />
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
                    {file && (
                        <div>
                            <p>File ready to be sent: {file.name}</p>
                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{ width: 200, height: "auto", marginTop: 10 }}
                                />
                            )}
                        </div>

                    )}
                    <InputComponent
                        onDropHandler={handleDrop}
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



