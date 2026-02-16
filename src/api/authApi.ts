import type { LoginSubmit } from "../pages/LoginPage"
import { api } from "./axiosConfig"


const enum ROUTES {
    LOGIN = "/auth/login",
    LOGOUT = "/auth/logout"
}



export async function login(credentials: LoginSubmit) {

    try {
        // const response = await api.post(ROUTES.LOGIN, credentials)

        return credentials
    } catch (error) {
        throw error
    }
}

export function logout() {

    try {
        const response = api.post(ROUTES.LOGIN)

        return response
    } catch (error) {

    }


}