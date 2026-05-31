import type { RegisterCredentials } from "../pages/register/RegisterPage";
import { api } from "./axiosConfig";

const USER_ROUTES = {
    CREATE_USER: "/users",
}

export async function register(credentials: RegisterCredentials) {

    try {
        const response = await api.post(USER_ROUTES.CREATE_USER, credentials);

        return response.data
    } catch (error: any) {
        throw error
    }
}