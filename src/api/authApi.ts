import type { LoginCredentials } from "../pages/LoginPage"
import type { RegisterCredentials } from "../pages/RegisterPage"
import { api } from "./axiosConfig"


const enum AUTH_ROUTES {
    LOGIN = "/auth/login",
    LOGOUT = "/auth/logout"
}



export async function login(credentials: LoginCredentials) {

    try {
        const response = await api.post(AUTH_ROUTES.LOGIN, credentials)

        return response
    } catch (error) {
        throw error
    }
}



export function logout() {

    try {
        const response = api.post(AUTH_ROUTES.LOGIN)

        return response
    } catch (error) {

    }


}