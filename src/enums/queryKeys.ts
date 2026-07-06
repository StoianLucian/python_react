
const baseQueryKeys = {
    sessions: "sessions",
    models: "models",
    files: "files",
} as const;

export const queryKeys = {
    sessions: [baseQueryKeys.sessions],
    session_id: (id: string) => [baseQueryKeys.sessions, id],
    models: [baseQueryKeys.models],
    files: [baseQueryKeys.files],
    file: (id: string) => [baseQueryKeys.files, id]

} as const;