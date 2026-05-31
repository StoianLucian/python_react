import { Stack, Button } from "@mui/material";
import type { ChatSession } from "../../../api/hooks/tanstack/chat/useGetSessions";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../../routing/routes";
import { useDeleteSession } from "../../../api/hooks/tanstack/chat/useDeleteSesion";
import Icon, { IconsEnum } from "../../Icons/Icon";

type SessionCardProps = {
    session: ChatSession
}

export default function SessionCard({ session }: SessionCardProps) {
    const { title, id } = session
    const navigate = useNavigate();
    const { mutateAsync: deleteSession } = useDeleteSession()

    function handleClick() {
        navigate(`${APP_PATHS.CHAT}/${id}`)
    }

    return (
        <Stack direction="row" className="items-center rounded-xl p-1.5 bg-[#F5F9FB] border border-[#a4a4a4]">
            <Button onClick={handleClick}>
                {title}
            </Button>
            <Button onClick={async () => { await deleteSession(id) }}>
                <Icon iconName={IconsEnum.COG} />
            </Button>
        </Stack>
    )
}
