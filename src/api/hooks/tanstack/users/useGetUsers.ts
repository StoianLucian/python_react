import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../enums/queryKeys";
import { getUsers } from "../../../userApi";

export type User = {
    id: string,
    username: string
    email: string
}

const useGetUsers = () => {

    return useQuery<User[], any>({
        queryFn: () => getUsers(),
        queryKey: queryKeys.users,
    });
};

export default useGetUsers;
