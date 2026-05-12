import { Button, Collapse, Stack } from '@mui/material'
import React, { useState } from 'react'
import Icon, { IconsEnum } from '../Icons/Icon'

type CollapsableContainerProps = {
    children: React.ReactNode
    isLoading?: boolean
    icon?: IconsEnum
    text?: string
}

export default function CollapsableContainer({ children, text, icon = IconsEnum.ARROW, isLoading }: CollapsableContainerProps) {
    const [open, setOpen] = useState(false)
    return (
        <Stack direction="column">
            <Button onClick={() => setOpen((prev) => !prev)}>
                <Icon iconName={icon} size={20} className={`
                            transition-transform duration-700
                             ${open ? "-rotate-90" : "rotate-90"}`
                } />
                {(isLoading && text) && <span className={`inline-block overflow-hidden whitespace-nowrap ${isLoading ? "animate-loading" : ""} `}>
                    {text}
                </span>}
            </Button>
            <Collapse in={open} orientation="vertical">
                {children}
            </Collapse>
        </Stack>

    )
}
