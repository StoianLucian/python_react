import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";

type ChatEditorProps<T> = {
    onChange: (str: string) => void
    items: T[]
    displayKey: keyof T
}

export default function ChatEditor<T>({ onChange, items, displayKey }: ChatEditorProps<T>) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Mention.configure({
                suggestion: {
                    char: "@",
                    items: ({ query }) => {
                        return items
                            .filter(item =>
                                String(item[displayKey])
                                    .toLowerCase()
                                    .includes(query.toLowerCase())
                            )
                            .slice(0, 5);
                    },
                },
            })
        ],
        onUpdate: () => onChange(editor.getText()),
        content: "",
    });

    return <EditorContent className="border rounded-md p-2 w-full" editor={editor} />;
}