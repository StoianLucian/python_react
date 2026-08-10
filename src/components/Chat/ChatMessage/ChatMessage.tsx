import { Alert, Box, Button } from '@mui/material'
import HoverPopover from '../../HoverPopover/HoverPopover'
import { EntityType } from '../../../types/chat';
import { jsonrepair } from "jsonrepair";
import { useMemo } from 'react';
import { SkillMentionComponent } from '../../ChatEditor/components/SkillMention';
import { UserMentionComponent } from '../../ChatEditor/components/UserMention';


type ChatMessageProps = {
    message: string;
    alignRight: boolean;
}


function ChatMessage({ message, alignRight }: ChatMessageProps) {

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

    const data = useMemo(() => {
        const cleaned = parseLLMJson(message);

        if (cleaned) {
            return Array.isArray(cleaned) ? cleaned : [cleaned];
        }

        return [
            {
                type: "text",
                text: message,
            },
        ];
    }, [message]);

    const renderedMessage = useMemo(() => {
        return data.map((item) => {
            const id = crypto.randomUUID()
            switch (item.type) {
                case EntityType.TEXT:
                    return <p key={id}>{item.text}</p>;

                case EntityType.BUTTON:
                    return (
                        <Button key={id}>
                            {item.text}
                        </Button>
                    );
                case EntityType.SKILL_MENTION:
                    return (<SkillMentionComponent key={id} label={item.attrs.label} />)

                case EntityType.USER_MENTION:
                    return (<UserMentionComponent key={id} label={item.attrs.label || "<User>"} />)

                case EntityType.POPOVER:
                    return (
                        <HoverPopover
                            key={id}
                            item={item}
                        />
                    );

                case EntityType.ERROR:
                    return (
                        <Alert key={id} severity="error">
                            {item.text}
                        </Alert>
                    );

                default:
                    return message
            }
        });
    }, [data]);

    const alignEnd = "bg-blue-500 text-white self-end"
    const alignStart = "bg-white self-start"
    const AiClasses = "text-gray-400 p-2 rounded-lg font-mono text-[13px] border-l-[3px] border-l-blue-500 opacity-90"

    return (
        <Box
            className={`${AiClasses} ${alignRight
                ? alignEnd
                : alignStart
                } `}
        >
            {renderedMessage}
        </Box>
    )
}

export default ChatMessage;
