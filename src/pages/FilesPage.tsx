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
    const [open, setOpen] = useState(true)
    const [search, setSearch] = useState("")
    const ref = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState<number>(0)

    const handleSearch = (value: string) => {
        setSearch(value)
    }

    return (
        <Grid container direction="row" className="h-screen w-screen">
            <Box className="flex items-start">
                <Collapse ref={ref} in={open} orientation="horizontal">
                    <Grid sx={{ flexBasis: "33%" }}>
                        <InputComponent value={search} onChange={(value) => handleSearch(value)} />
                        <Stack direction="column">
                            {updates.map((update) => <Stack direction="column">
                                <Box>{update.message}</Box>
                                <Box>{update.time}</Box>
                            </Stack>)}
                        </Stack>
                    </Grid>
                </Collapse>
                <Button onClick={() => setOpen(!open)}>
                    <Icon
                        iconName={IconsEnum.ARROW}
                        className={`
                            transition-transform duration-700
                             ${open ? "rotate-180" : "rotate-0"}`
                        }
                    /></Button>
            </Box>
            <Grid style={{ flexBasis: "66%" }}>
                Bottom Section
            </Grid>
        </Grid>
    )
}

export default FilesPage