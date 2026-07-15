import { Box, Button, Grid, } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { toggleIcon } from '../../pages/chat/helper'``
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import Icon from '../Icons/Icon'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import { useChatSession } from '../../api/hooks/tanstack/chat/useChatSession'
import { useChatContext, type ChatResponse } from '../../chatContext/ChatContext'
import { useParams } from 'react-router-dom'
import ChatContainer from './ChatContainer/ChatContainer'
import useGetUsers from '../../api/hooks/tanstack/users/useGetUsers'
import MentionContainer from '../MentionContainer/MentionContainer'
import { useChatEditor } from '../../api/hooks/useChatEditor'
import { EditorContent } from '@tiptap/react'

export const RoleEnum = {
    AGENT: "assistant",
    USER: "user",
}

export type Role = typeof RoleEnum[keyof typeof RoleEnum];

export type History = Pick<ChatResponse, "role" | "content">

export default function AiChat() {
    const { changeSession } = useChatContext()
    const [model, setModel] = useState<string>("")

    const [virtualAnchor, setVirtualAnchor] = useState<any>(null)
    const editorRef = useRef<HTMLDivElement>(null);

    const { id } = useParams();

    const {
        chatResponse,
        sendMessage,
        stopChat,
        chatPending,
        isSessionFetching,
        // setFile,
        file,
        loading
    } = useChatSession(model)

    const { data: users = [] } = useGetUsers();

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
            sendMessage(getText())
            clearText()
            focusInput()
        }
    }


    // const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault();

    //     const files = Array.from(e.dataTransfer.files);

    //     console.log(files[0]);

    //     if (files.length > 0) {
    //         const file = files[0];
    //         setFile(file);
    //     };
    // }

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    const { editor, getText, clearText, focusInput, setContent } = useChatEditor()

    function handleMention(item: string) {
        setVirtualAnchor(null)

        const editorText = getText()

        const indexOfMention = editorText.lastIndexOf("@");

        const mentionText = editorText.slice(0, indexOfMention)

        setContent(mentionText + item)

        focusInput()
    }

    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {

            const { from } = editor.state.selection;

            const textBefore = editor.state.doc.textBetween(0, from, "\n");

            const match = textBefore.match(/@(\w*)$/);

            if (match) {
                const coords = editor.view.coordsAtPos(from);

                setVirtualAnchor({
                    getBoundingClientRect: () => ({
                        x: coords.left,
                        y: coords.bottom,
                        top: coords.bottom,
                        left: coords.left,
                        right: coords.left,
                        bottom: coords.bottom,
                        width: 0,
                        height: 0,
                    }),
                });
            } else {
                setVirtualAnchor(null);
            }
        };

        editor.on("update", handleUpdate);

        return () => {
            editor.off("update", handleUpdate);
        };
    }, [editor])


    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10 h-screen'>
            <StatusDot
                model={model}
            />
            <ChatContainer
                chatItems={chatResponse}
                chatPending={loading}
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
                <Box className="col-span-3 flex">
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
                    {/* <InputComponent
                        inputRef={textarea}
                        onDropHandler={handleDrop}
                        hotKey={keyboardShortcuts.submit}
                        onKeyDown={() => sendMessage(query)}
                        value={query}
                        onChange={handleChange}
                    /> */}
                    <MentionContainer
                        anchor={virtualAnchor}
                        items={users}
                        displayKey="username"
                        clickHandler={(item) => handleMention(item.email)}
                    />
                    <EditorContent ref={editorRef} className="w-full" editor={editor} />
                    <Button onClick={() => handleButton(chatPending)}>
                        <Icon
                            iconName={toggleIcon(chatPending)}
                            className="mx-1"
                        />
                    </Button>
                </Box>
            </Grid>
        </Box>
    )
}



