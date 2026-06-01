import { Stack, Button, Typography } from "@mui/material";
import type { ChatSession } from "../../../api/hooks/tanstack/chat/useGetSessions";
import { useDeleteSession } from "../../../api/hooks/tanstack/chat/useDeleteSesion";
import Icon, { IconsEnum } from "../../Icons/Icon";
import { useChatContext } from "../../../chatContext/ChatContext";
import Popover from "../../Popover/Popover";

type SessionCardProps = {
    session: ChatSession
}

export default function SessionCard({ session }: SessionCardProps) {
    const { title, id } = session
    const { mutateAsync: deleteSession } = useDeleteSession()
    const { changeSession } = useChatContext();
    return (
        <Stack direction="row" className="items-center rounded-xl p-1.5 bg-[#F5F9FB] border border-[#a4a4a4]">
            <Button onClick={() => changeSession(id)}>
                {title}
            </Button>
            <Typography>
                <Popover trigger={<Icon iconName={IconsEnum.DOTS} />}
                    items={[
                        {
                            label: "Delete",
                            onClick: async () => { await deleteSession(id) }
                        }
                    ]}
                />
            </Typography>
        </Stack>
    )
}
