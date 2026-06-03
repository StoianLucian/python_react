import { Box, Button, Collapse, Grid } from '@mui/material'
import { useMemo, useState } from 'react'
import Icon, { IconsEnum } from '../../components/Icons/Icon';
import { translations } from '../../../i18n';
import { useTranslation } from 'react-i18next';
import AiChat from '../../components/AiChat/AiChat';
import ComponenTabs from '../../components/componenTabs/ComponenTabs';
import FileManagement from '../../components/fileManagement/FileManagement';
import AiChatHistory from '../../components/AiChat/AiChatHistory/AiChatHistory';

function ChatPage() {
    const { t } = useTranslation()
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [open, setOpen] = useState(true)

    const toggleDrag = (toggle: boolean, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(toggle);
    }

    const items = useMemo(
        () => [
            {
                label: t(translations.filesPage.files),
                element: <FileManagement isDragging={isDragging} />
            },
            {
                label: t(translations.aiChat.chatHistory),
                element: <AiChatHistory />
            }
        ],
        [t, isDragging]
    );

    return (
        <Grid
            container
            direction="row"
            className="h-screen w-screen"
            onDrop={(e) => toggleDrag(false, e)}
            onDragOver={(e) => toggleDrag(true, e)}
            onDragLeave={(e) => toggleDrag(false, e)}
        >
            <Box className="flex flex-row items-start">
                <Collapse in={open} orientation="horizontal">
                    <ComponenTabs items={items} />
                </Collapse>
            </Box>
            <Box className="w-0">
                <Button onClick={() => setOpen(!open)}>
                    <Icon
                        iconName={IconsEnum.ARROW}
                        className={`
                            transition-transform duration-700
                             ${open ? "rotate-180" : "rotate-0"}`
                        }
                    />
                </Button>
            </Box>
            <AiChat />
        </Grid >
    )
}

export default ChatPage