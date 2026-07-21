
const baseQueryKeys = {
    sessions: "sessions",
    models: "models",
    files: "files",
    users: "users",
    skills: "skills"
} as const;

export const queryKeys = {
    sessions: [baseQueryKeys.sessions],
    session_id: (id: string) => [baseQueryKeys.sessions, id],
    models: [baseQueryKeys.models],
    files: [baseQueryKeys.files],
    file: (id: string) => [baseQueryKeys.files, id],
    users: [baseQueryKeys.users],
    skills: [baseQueryKeys.skills]

} as const;