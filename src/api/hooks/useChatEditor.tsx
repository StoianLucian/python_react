import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function useChatEditor() {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],

        content: "",
    });

    const getText = () => editor?.getText() ?? "";

    const clearText = () => editor?.commands.clearContent();

    const focusInput = () => editor?.commands.focus();

    const setContent = (text: string) => editor?.commands.setContent(text)

    return {
        editor,
        getText,
        clearText,
        focusInput,
        setContent
    };
}