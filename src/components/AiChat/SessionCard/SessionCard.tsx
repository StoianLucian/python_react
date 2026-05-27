import { Stack, Box, Button } from "@mui/material";
import Icon, { IconsEnum } from "../../Icons/Icon";
import type { ChatSession } from "../../../api/hooks/tanstack/chat/useGetSessions";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../../routing/routes";

type SessionCardProps = {
    session: ChatSession
}

export default function SessionCard({ session }: SessionCardProps) {
    const { title, id } = session
    const navigate = useNavigate();

    function handleClick() {
        navigate(`${APP_PATHS.CHAT}/${id}`)
    }

    return (
        <Stack direction="row" className="items-center rounded-xl p-1.5 bg-[#F5F9FB] border border-[#a4a4a4]">
            <Box>
                <Box className="max-w-40 truncate" >
                    {title}
                </Box>
            </Box>
            <Button onClick={handleClick}>
                <Icon iconName={IconsEnum.DOWNLOAD} />
            </Button>
        </Stack>
    )
}
