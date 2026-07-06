import { Alert, Box, Button } from '@mui/material'
import HoverPopover from '../../HoverPopover/HoverPopover'
import { EntityType, type Entity } from '../../../types/chat';
import { jsonrepair } from "jsonrepair";


type ChatMessageProps = {
    message: string;
    alignRight: boolean;
}


export default function ChatMessage({ message, alignRight }: ChatMessageProps) {


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

    const cleaned = parseLLMJson(message);

    function extractJsonBlock(text: string) {
        const firstBracket = text.indexOf("[");
        const firstBrace = text.indexOf("{");

        const startCandidates = [firstBracket, firstBrace].filter(i => i !== -1);
        if (!startCandidates.length) return null;

        const start = Math.min(...startCandidates);
        return text.slice(start).trim();
    }

    // const parsed = maybeParseStreamingJson(cleaned);

    let data: Entity[];

    if (cleaned) {
        data = Array.isArray(cleaned) ? cleaned : [cleaned];
    } else {
        data = [
            {
                type: "message",
                content: message,
            },
        ];
    }

    function returnMessageType(entity: Entity[]) {


        console.log(entity)

        const message = entity.map((item) => {
            switch (item.type) {
                case EntityType.TEXT:
                    return <p>{item.content}</p>;

                case EntityType.BUTTON:
                    return <Button onMouseEnter={() => { console.log("click") }}>{item.content}</Button>;

                case EntityType.POPOVER:
                    return <HoverPopover item={item} fileId={item.source_id} />;

                case EntityType.ERROR:
                    return <Alert severity="error">
                        {item.content}
                    </Alert>
            }
        })

        return message
    }

    // const { } = useGetFile()

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
            {returnMessageType(data)}
        </Box>
    )
}
