import { Box, Button, Grid, } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { toggleIcon } from '../../pages/chat/helper'
import SelectComponent from '../select/SelectComponent'
import StatusDot from '../statusDot/StatusDot'
import Icon from '../Icons/Icon'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import { useChatSession } from '../../api/hooks/tanstack/chat/useChatSession'
import { useChatContext, type ChatResponse } from '../../api/context/chatContext/ChatContext'
import { useParams } from 'react-router-dom'
import ChatContainer from './ChatContainer/ChatContainer'
import MentionContainer from '../MentionContainer/MentionContainer'
import { useChatEditor } from '../../api/hooks/useChatEditor'
import { EditorContent } from '@tiptap/react'
import { MENTION_TYPES, useMentionItems } from '../../api/hooks/useMentionItems'
import { DEFAULT_PROVIDER, LLM_PROVIDERS, type LlmProvider } from '../../enums/providers'

export const RoleEnum = {
    AGENT: "assistant",
    USER: "user",
}

export type Role = typeof RoleEnum[keyof typeof RoleEnum];

export type History = Pick<ChatResponse, "role" | "content">

export default function AiChat() {
    const { editor, clearText, focusInput, getJson } = useChatEditor()
    const { items, setSearch, setMentionType, mentionType } = useMentionItems()
    const { changeSession } = useChatContext()
    const [model, setModel] = useState<string>("")
    const [provider, setProvider] = useState<LlmProvider>(DEFAULT_PROVIDER)

    const [virtualAnchor, setVirtualAnchor] = useState<any>(null)
    const editorRef = useRef<HTMLDivElement>(null);

    const firstItemRef = useRef(null)

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
    } = useChatSession(model, provider)

    const { data: options = [], isLoading: loadingOptions } = useChatModels(setModel, provider)

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
            sendMessage(JSON.stringify(getJson().content[0].content))
            clearText()
            focusInput()
        }
    }

    function closeMention() {
        setVirtualAnchor(null);
        setMentionType(null);
        focusInput();
    }


    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);



    function handleMention(item: { id: string; label: string, slug: string }) {
        if (!editor) return;

        setVirtualAnchor(null);

        const { from } = editor.state.selection;
        const textBefore = editor.state.doc.textBetween(0, from, "\n");

        const match = textBefore.match(/([@/])(\w*)$/);

        if (!match) return;

        const query = match[2];
        if (mentionType) {
            editor
                .chain()
                .focus()
                .deleteRange({
                    from: from - query.length - 1,
                    to: from,
                })
                .insertContent({
                    type: mentionType, // or whatever your node name is
                    attrs: {
                        id: item.id,
                        label: item.slug,
                    },
                })
                .run();
        }
    }

    useEffect(() => {
        if (!editor) return;

        const openMention = () => {

            const { from } = editor.state.selection;

            const textBefore = editor.state.doc.textBetween(0, from, "\n");

            const match = textBefore.match(/([@/])(\w*)$/);

            if (!match) {
                setMentionType(null);
                setVirtualAnchor(null);
                return;
            }

            const trigger = match[1];
            const query = match[2];

            setSearch(query)

            setMentionType(trigger === "@" ? MENTION_TYPES.USERS : MENTION_TYPES.SKILLS);

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

        editor.on("update", openMention);

        return () => {
            editor.off("update", openMention);
        };
    }, [editor])

    // While the mention popover is open, ArrowUp moves focus from the editor
    // into the list (the popover is rendered above the input).
    useEffect(() => {
        if (!editor) return;

        const dom = editor.view.dom;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!virtualAnchor) return;

            if (event.key === "ArrowUp") {
                event.preventDefault();
                (firstItemRef.current as HTMLElement | null)?.focus();
            } else if (event.key === "Escape") {
                event.preventDefault();
                closeMention();
            }
        };

        dom.addEventListener("keydown", handleKeyDown);

        return () => {
            dom.removeEventListener("keydown", handleKeyDown);
        };
    }, [editor, virtualAnchor])



    return (
        <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10 h-screen'>
            <Box className="flex items-center gap-4">
                <SelectComponent
                    onChange={setProvider}
                    value={provider}
                    options={LLM_PROVIDERS.map((p) => ({ id: p.id, name: p.name }))}
                    isLoading={false}
                />
                <StatusDot
                    model={model}
                    provider={provider}
                />

            </Box>
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
                    <MentionContainer
                        anchor={virtualAnchor}
                        items={items}
                        onSelect={(item) => handleMention(item)}
                        firstItemRef={firstItemRef}
                        onEscape={closeMention}
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



