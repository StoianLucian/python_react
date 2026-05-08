
import type { LoginCredentials } from "../pages/login/LoginPage";
import { api, ApiMethod, request } from "./axiosConfig"


const enum AUTH_ROUTES {
    LOGIN = "/auth/login",
    LOGOUT = "/auth/logout"
}

export async function login(credentials: LoginCredentials) {

    console.log(credentials);
    return await request({ method: ApiMethod.POST, url: AUTH_ROUTES.LOGIN, data: credentials })
}


export function logout() {

    try {
        const response = api.post(AUTH_ROUTES.LOGOUT, {});

        return response
    } catch (error) {

    }


}