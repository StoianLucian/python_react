import type { RegisterCredentials } from "../pages/register/RegisterPage";
import { ApiMethod, request } from "./axiosConfig";

const USER_ROUTES = {
    USERS: "/users",
}

export async function register(credentials: RegisterCredentials) {
    return await request({ method: ApiMethod.POST, url: USER_ROUTES.USERS, data: credentials })
}

export async function getUsers() {
    return await request({ method: ApiMethod.GET, url: USER_ROUTES.USERS })
}