import { List, ListItemButton, ListItemText, Paper, Popper } from '@mui/material';

type MentionItem = {
    id: string;
    label: string;
    slug: string
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
            modifiers={[
                {
                    name: "offset",
                    options: {
                        offset: [0, 50], // x, y
                    },
                },
            ]}
        >
            <Paper>
                <List className='max-h-80 min-w-50 overflow-auto h-min-30'>
                    {items?.length === 0 ? (
                        <ListItemButton disabled>
                            <ListItemText primary="No items found" />
                        </ListItemButton>
                    ) : (
                        items?.map((item, index) => (
                            <ListItemButton
                                key={item.id}
                                onClick={() => onSelect(item)}
                                ref={index === 0 ? firstItemRef : null}
                            >
                                <ListItemText>
                                    {item.label}
                                </ListItemText>
                            </ListItemButton>
                        ))
                    )}
                </List>
            </Paper>
        </Popper>
    )
}

export default MentionContainer