import { List, ListItemButton, Paper, Popper } from '@mui/material';

type MentionContainerProps<T extends { id: string }> = {
    anchor: any;
    items: T[];
    clickHandler: (item: T) => void
    displayKey: keyof T;

}

function MentionContainer<T extends { id: string }>({ anchor, items, clickHandler, displayKey }: MentionContainerProps<T>) {


    function returnItemLabel(displayKey: keyof T, item: T) {
        const label = displayKey ? String(item[displayKey]) : "no label"

        return label
    }
    return (
        <Popper
            open={!!anchor}
            anchorEl={anchor}
            placement="top"
        >
            <Paper>
                <List>
                    {items.map((item) => (
                        <ListItemButton
                            key={item.id}
                            onClick={() => clickHandler(item)}

                        >
                            {returnItemLabel(displayKey, item)}
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </Popper>
    )
}

export default MentionContainer