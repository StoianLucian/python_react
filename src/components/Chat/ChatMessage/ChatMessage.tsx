import { Alert, Box, Button } from '@mui/material'
import HoverPopover from '../../HoverPopover/HoverPopover'
import { EntityType } from '../../../types/chat';
import { jsonrepair } from "jsonrepair";
import { useMemo, useRef } from 'react';
import { SkillMentionComponent } from '../../ChatEditor/components/SkillMention';
import { UserMentionComponent } from '../../ChatEditor/components/UserMention';
import { UrlComponent } from '../../ChatEditor/components/Url';


type ChatMessageProps = {
    message: string;
    alignRight: boolean;
    isStreaming?: boolean;
}


function ChatMessage({ message, alignRight, isStreaming = false }: ChatMessageProps) {

    function safeParseJson(input: string) {
        try {
            return JSON.parse(input);
        } catch {
            try {
                return JSON.parse(jsonrepair(input));
            } catch {
                return null;
            }
        }
    }

    function parseLLMJson(message: string) {

        const cleaned = message
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return safeParseJson(cleaned);
    }

    const lastValidData = useRef<any[] | null>(null);

    const data = useMemo<any[]>(() => {
        const cleaned = parseLLMJson(message);

        if (cleaned) {
            const next = Array.isArray(cleaned) ? cleaned : [cleaned];
            lastValidData.current = next;
            return next;
        }

        if (isStreaming) {
            return lastValidData.current ?? [];
        }

        return [
            {
                type: "text",
                text: message,
            },
        ];
    }, [message, isStreaming]);

    const renderedMessage = useMemo(() => {

        return data.map((item, index) => {
            switch (item.type) {
                case EntityType.TEXT:
                    return <p key={index}>{item.text}</p>;

                case EntityType.BUTTON:
                    return (
                        <Button key={index}>
                            {item.text}
                        </Button>
                    );
                case EntityType.SKILL_MENTION:
                    return (<SkillMentionComponent key={index} label={item?.attrs?.label} />)

                case EntityType.USER_MENTION:
                    return (<UserMentionComponent key={index} label={item?.attrs?.label} />)

                case EntityType.URL:
                    return (<UrlComponent key={index} text={item.text} url={item.url} />)

                case EntityType.POPOVER:

                    return <HoverPopover key={index} item={item} />


                case EntityType.ERROR:
                    return (
                        <Alert key={index} severity="error">
                            {item.text}
                        </Alert>
                    );

                default:
                    return message
            }
        });
    }, [data]);

    const base =
        "flex flex-col gap-1.5 px-4 py-3 text-[15px] leading-relaxed break-words rounded-3xl"
    const alignEnd = "bg-[#5B8C7B] text-white self-end rounded-tr-md"
    const alignStart =
        "bg-white text-[#1F2933] self-start rounded-tl-md shadow-sm ring-1 ring-[#ECEAE4]"

    return (
        <Box
            className={`${base} ${alignRight ? alignEnd : alignStart}`}
        >
            {renderedMessage}
        </Box>
    )
}

export default ChatMessage;
