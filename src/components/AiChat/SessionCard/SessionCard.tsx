import { Stack, Box, Button } from "@mui/material";
import Icon, { IconsEnum } from "../../Icons/Icon";
import type { ChatSession } from "../../../api/hooks/tanstack/chat/useGetSessions";

type SessionCardProps = {
    session: ChatSession
}

export default function SessionCard({ session }: SessionCardProps) {
    const { title, id } = session
    return (
        <Stack direction="row" className="items-center rounded-xl p-1.5 bg-[#F5F9FB] border border-[#a4a4a4]">
            <Box>
                <Box className="max-w-40 truncate" >
                    {title}
                </Box>
            </Box>
            <Button onClick={() => { console.log(id) }}>
                <Icon iconName={IconsEnum.DOWNLOAD} />
            </Button>
        </Stack>
    )
}
