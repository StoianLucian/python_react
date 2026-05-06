import { Box, Button, CircularProgress, Collapse, Grid, Stack } from '@mui/material'
import { useRef, useState } from 'react'
import InputComponent from '../components/inputComponent/InputComponent'
import Icon, { IconsEnum } from '../components/Icons/Icon';
import { uploadFile } from '../api/fileApi';
import useGetFile from '../api/hooks/tanstack/files/useGetFile';
import useGetFiles from '../api/hooks/tanstack/files/useGetFIles';
import { useChat } from '../api/hooks/tanstack/chat/useChat';
import { useAuthContext } from '../authContext/AuthContext';
type Message = {
    message: string,
    sender: string
}

function FilesPage() {
    const { user } = useAuthContext()
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [open, setOpen] = useState(true)
    const [search, setSearch] = useState("")
    const [query, setQuery] = useState("")
    const [response, setResponse] = useState<Message[]>([]);
    const controllerRef = useRef<AbortController | null>(null);
    let aiIndex: number | null = null;
    let buffer = "";

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    const handleChunk = (chunk: string) => {
        buffer += chunk;

        setResponse((prev) => {
            let updated = [...prev];

            if (aiIndex === null) {
                aiIndex = updated.length;
                updated.push({
                    message: "",
                    sender: "AI",
                });
            }

            updated[aiIndex] = {
                message: buffer,
                sender: "AI",
            };

            return updated;
        });
    };

    const { mutateAsync, isPending } = useChat();

    const stopChat = () => {
        controllerRef.current?.abort();
    };

    const handleQuerySubmit = async (query: string) => {
        controllerRef.current = new AbortController();

        const signal = controllerRef.current.signal;
        setQuery("");
        setResponse((prev) => [
            ...prev,
            { message: query, sender: user?.id || "test" },
        ]);

        await mutateAsync({ query, handleChunk, signal })


    };
    const toggleDrag = (toggle: boolean, e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragging(toggle);
    }

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            const response = await uploadFile(files[0]);
            console.log(response);
        }

    };

    const { data: files = [] } = useGetFiles();
    const { mutateAsync: getFile } = useGetFile()

    function toggleIcon(bool: boolean) {
        return bool ? IconsEnum.COG : IconsEnum.ARROW
    }

    function handleButton(bool: boolean) {

        if (bool) {
            stopChat()
        } else {
            handleQuerySubmit(query)
        }

    }

    return (
        <Grid
            container
            direction="row"
            className="h-screen w-screen"
            onDrop={(e) => toggleDrag(false, e)}
            onDragOver={(e) => toggleDrag(true, e)}
            onDragLeave={(e) => toggleDrag(false, e)}
        >
            <Box className={`flex flex-row items-start`}>
                <Collapse in={open} orientation="horizontal">
                    <Grid className="pl-10">
                        <InputComponent
                            value={search}
                            onChange={(value) => handleSearch(value)}
                            icon={<Icon
                                iconName={IconsEnum.PROFILE}
                                className='mx-1'
                            />}
                        />
                        <Stack
                            direction="column"
                        >
                            {files?.map((file: any) => <Stack key={file.id} direction="column">
                                <Box>{file.file_name}</Box>
                                {/* <Box>{file.storage_key}</Box> */}
                                <Button onClick={() => getFile({ id: file.id, filename: file.file_name })}>
                                    Download file
                                </Button>
                            </Stack>)
                            }
                        </Stack>
                        <Box
                            onDrop={handleDrop}
                            className={`
                                h-60
                                transition-all duration-200
                                ${isDragging ? "bg-blue-50 border-blue-400" : ""}
                                border-2 border-dashed rounded-lg
                                flex justify-center items-center
                                flex-col
                            `}>
                            <Icon iconName={IconsEnum.PDF} size={100} />
                            Drag PDF file
                        </Box>
                    </Grid>
                </Collapse>
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
            <Box className='flex-1 flex flex-col border-l-2 border-gray-200 p-10'>

                <Box className="h-[80vh] overflow-y-scroll bg-gray-100 rounded-lg my-4 p-6 flex flex-col gap-2">
                    {response.map((item, i) => (
                        <div
                            key={i}
                            className={`max-w-[75%] px-3 py-2 rounded-lg ${item.sender === user?.id
                                ? "bg-blue-500 text-white self-end"
                                : "bg-white self-start"
                                }`}

                        >
                            {item.message}
                        </div>
                    ))}
                    <Box className="flex justify-center" >
                        {isPending && <CircularProgress />}
                    </Box>
                </Box>
                <InputComponent
                    value={query}
                    onChange={(value) => setQuery(value)}
                    icon={
                        <Button onClick={() => handleButton(isPending)}>
                            <Icon
                                iconName={toggleIcon(isPending)}
                                className='mx-1'
                            />
                        </Button>
                    }
                    iconPosition="end"
                />
            </Box>
        </Grid >
    )
}

export default FilesPage