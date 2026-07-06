
export type Entity = {
    type: string,
    content: string
    action?: string
    source_id?: string
    page_number?: string
}

export const EntityType = {
    TEXT: "message",
    BUTTON: "button",
    ERROR: "error",
    POPOVER: "popover"
}