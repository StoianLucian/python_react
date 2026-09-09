import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCreateSkill } from '../../api/hooks/tanstack/skills/useCreateSkill';

function slugify(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');
}

export default function AddSkillDialog() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [key, setKey] = useState('');
    const [keyEdited, setKeyEdited] = useState(false);
    const { mutateAsync, isPending } = useCreateSkill();

    const effectiveKey = keyEdited ? key : slugify(name);

    function close() {
        setOpen(false);
        setName('');
        setKey('');
        setKeyEdited(false);
    }

    async function submit() {
        const trimmedName = name.trim();
        if (!trimmedName || !effectiveKey || isPending) return;
        await mutateAsync({ name: trimmedName, key: effectiveKey });
        close();
    }

    return (
        <>
            <Tooltip title="Add skill">
                <IconButton onClick={() => setOpen(true)} size="small">
                    <AddIcon />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
                <DialogTitle>Add skill</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        margin="dense"
                        label="Skill name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submit();
                        }}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        label="Slug"
                        value={effectiveKey}
                        onChange={(e) => {
                            setKeyEdited(true);
                            setKey(slugify(e.target.value));
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submit();
                        }}
                        helperText="Auto-filled from the name; edit to override."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={submit} variant="contained" disabled={!name.trim() || !effectiveKey || isPending}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
