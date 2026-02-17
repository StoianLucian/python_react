import { AxiosError } from "axios";
import type { RegisterCredentials } from "../pages/RegisterPage";
import { api } from "./axiosConfig";

const enum USER_ROUTES {
    REGISTER = "/users",
}

export async function register(credentials: RegisterCredentials) {

    try {
        const response = await api.post(USER_ROUTES.REGISTER, credentials);
        return response.data;
    } catch (error) {
        console.log((error as AxiosError).response);
        throw error;
    }
}