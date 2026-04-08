import { Box, Button, Collapse, Grid, Stack } from '@mui/material'
import { useRef, useState } from 'react'
import InputComponent from '../components/inputComponent/InputComponent'
import Icon, { IconsEnum } from '../components/Icons/Icon';
import { uploadFile } from '../api/fileApi';
import useGetFile from '../api/hooks/tanstack/files/useGetFile';
import useGetFiles from '../api/hooks/tanstack/files/useGetFIles';


function FilesPage() {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [open, setOpen] = useState(true)
    const [search, setSearch] = useState("")
    const ref = useRef<HTMLDivElement>(null)

    const handleSearch = (value: string) => {
        setSearch(value)
    }

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

    return (
        <Grid container direction="row" className="h-screen w-screen"
            onDrop={(e) => toggleDrag(false, e)}
            onDragOver={(e) => toggleDrag(true, e)}
            onDragLeave={(e) => toggleDrag(false, e)}
        >
            <Box className={`flex flex-row items-start`}>
                <Collapse ref={ref} in={open} orientation="horizontal">
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
            <Grid >
                <InputComponent
                    value={search}
                    onChange={(value) => handleSearch(value)}
                    icon={<Icon
                        iconName={IconsEnum.PROFILE}
                        className='mx-1'
                    />}
                />
            </Grid>
        </Grid>
    )
}

export default FilesPage