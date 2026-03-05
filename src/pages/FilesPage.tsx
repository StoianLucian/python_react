import { Box, Button, Collapse, Grid, Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import InputComponent from '../components/inputComponent/InputComponent'
import Icon, { IconsEnum } from '../components/Icons/Icon';

const updates = [
    { message: "Updated profile picture", time: "2026-03-03 10:15 AM" },
    { message: "Changed password", time: "2026-03-02 03:42 PM" },
    { message: "Added new project", time: "2026-03-01 09:20 AM" },
    { message: "Updated settings", time: "2026-02-28 11:50 AM" },
    { message: "Joined new team", time: "2026-02-27 02:05 PM" },
];

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

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);


        if (files[0].type !== "application/pdf") {
            alert("pdf type supported only")
        }
    };

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
                            {updates.map((update) => <Stack key={update.time} direction="column">
                                <Box>{update.message}</Box>
                                <Box>{update.time}</Box>
                            </Stack>)}
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