import { Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'

type PopoverProps = {
    trigger: React.ReactNode
    items: { label: string, onClick: () => void }[]
}

function Popover({ trigger, items }: PopoverProps) {
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event: any) {
        setAnchorEl(event.currentTarget); // anchor the menu to this button
    }

    function handleClose() {
        setAnchorEl(null); // close menu
    }

    return (
        <>
            <div onClick={handleClick}>
                {trigger}
            </div>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {items.map((item, index) => (
                    <MenuItem key={index} onClick={() => { handleClose(); item.onClick(); }}>
                        {item.label}
                    </MenuItem>
                ))}
            </Menu>
        </>



    )
}

export default Popover