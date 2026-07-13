import { Alert, Box, Button } from '@mui/material'
import HoverPopover from '../../HoverPopover/HoverPopover'
import { EntityType } from '../../../types/chat';
import { jsonrepair } from "jsonrepair";
import { useMemo } from 'react';


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

        const extracted = extractJsonBlock(cleaned);
        if (!extracted) return null;

        return safeParseJson(extracted);
    }

    function extractJsonBlock(text: string) {
        const firstBracket = text.indexOf("[");
        const firstBrace = text.indexOf("{");

        const startCandidates = [firstBracket, firstBrace].filter(i => i !== -1);
        if (!startCandidates.length) return null;

        const start = Math.min(...startCandidates);
        return text.slice(start).trim();
    }

    const data = useMemo(() => {
        const cleaned = parseLLMJson(message);

        if (cleaned) {
            return Array.isArray(cleaned) ? cleaned : [cleaned];
        }

        return [
            {
                type: "message",
                content: message,
            },
        ];
    }, [message]);

    const renderedMessage = useMemo(() => {
        return data.map((item, index) => {
            switch (item.type) {
                case EntityType.TEXT:
                    return <p key={index}>{item.content}</p>;

                case EntityType.BUTTON:
                    return (
                        <Button key={index}>
                            {item.content}
                        </Button>
                    );

                case EntityType.POPOVER:
                    return (
                        <HoverPopover
                            key={index}
                            item={item}
                            fileId={item.source_id}
                        />
                    );

                case EntityType.ERROR:
                    return (
                        <Alert key={index} severity="error">
                            {item.content}
                        </Alert>
                    );
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
