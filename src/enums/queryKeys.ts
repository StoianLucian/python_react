
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
    models: (provider: string) => [baseQueryKeys.models, provider],
    files: [baseQueryKeys.files],
    file: (id: string) => [baseQueryKeys.files, id],
    users: (search: string) => [baseQueryKeys.users, search],
    skills: (search: string) => [baseQueryKeys.skills, search]
} as const;