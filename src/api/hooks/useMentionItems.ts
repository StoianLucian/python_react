import { useMemo } from "react";
import useGetUsers from "./tanstack/users/useGetUsers";
import useGetSkills from "./tanstack/skills/useGetSkills";

export type MentionType = "users" | "skills";

export function useMentionItems(mentionType: MentionType | null) {
    const { data: users = [] } = useGetUsers();
    const { data: skills = [] } = useGetSkills();

    const items = useMemo(() => {
        switch (mentionType) {
            case "users":
                return users.map(({ id, username }) => ({
                    id,
                    label: username,
                }));

            case "skills":
                return skills.map(({ id, name }) => ({
                    id,
                    label: name,
                }));

            default:
                return [];
        }
    }, [mentionType, users, skills]);

    return { items }
}