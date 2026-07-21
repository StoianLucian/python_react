import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../enums/queryKeys";
import { getSkills } from "../../../skillsApi";

export type Skill = {
    id: string,
    name: string
}

const useGetSkills = () => {

    return useQuery<Skill[], any>({
        queryFn: () => getSkills(),
        queryKey: queryKeys.skills,
    });
};

export default useGetSkills;

