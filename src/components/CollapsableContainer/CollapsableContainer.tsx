import { Button, Collapse } from '@mui/material'
import React, { useState } from 'react'
import Icon, { IconsEnum } from '../Icons/Icon'

type CollapsableContainerProps = {
    children: React.ReactNode
}

export default function CollapsableContainer({ children }: CollapsableContainerProps) {
    const [open, setOpen] = useState(true)
    return (
        <>
            <Button onClick={() => setOpen((prev) => !prev)}><Icon iconName={IconsEnum.ARROW} className={`
                            transition-transform duration-700
                             ${open ? "-rotate-90" : "rotate-90"}`
            } /></Button>
            <Collapse in={open} orientation="vertical">
                {children}
            </Collapse>
        </>

    )
}
