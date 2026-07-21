import { List, ListItemButton, Paper, Popper } from '@mui/material';

type MentionItem = {
    id: string;
    label: string;
};

type MentionContainerProps = {
    anchor: any;
    items: MentionItem[] | null;
    onSelect: (item: MentionItem) => void;
    firstItemRef: any;
};

function MentionContainer({ anchor, items, onSelect, firstItemRef }: MentionContainerProps) {

    return (
        <Popper
            open={!!anchor}
            anchorEl={anchor}
            placement="top"
        >
            <Paper>
                <List>
                    {items?.map((item, index) => (
                        <ListItemButton
                            key={item.id}
                            onClick={() => onSelect(item)}
                            ref={index === 0 ? firstItemRef : null}
                        >
                            {item.label}
                        </ListItemButton>
                    ))}
                </List>
            </Paper>
        </Popper>
    )
}

export default MentionContainer