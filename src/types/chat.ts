
export type Entity = {
    type: string,
    text: string
    action?: string
    source_id?: string
    page_number?: string
}

export const EntityType = {
    TEXT: "text",
    BUTTON: "button",
    ERROR: "error",
    POPOVER: "popover",
    SKILL_MENTION: "skill-mention",
    USER_MENTION: 'user-mention'
}