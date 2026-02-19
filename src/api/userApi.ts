import { AxiosError } from "axios";
import type { RegisterCredentials } from "../pages/RegisterPage";
import { api } from "./axiosConfig";

const enum USER_ROUTES {
    CREATE_USER = "/users",
}

export async function register(credentials: RegisterCredentials) {

    try {
        const response = await api.post(USER_ROUTES.CREATE_USER, credentials);

        return response.data
    } catch (error: any) {
        console.log(error.response)
        throw error
    }
}