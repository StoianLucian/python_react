import { api, request, ApiMethod } from "./axiosConfig";

const enum FILE_ROUTES_ENUM {
    FILES = "/files",
}

export const FILE_ROUTES = {
    FILES: FILE_ROUTES_ENUM.FILES,
    GET_FILE: (id: string) => `${FILE_ROUTES_ENUM.FILES}/${id}`,
}

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file)

    return await request({ method: ApiMethod.POST, url: FILE_ROUTES.FILES, data: formData })
}

export async function getFIles() {
    return await request({ method: ApiMethod.GET, url: FILE_ROUTES.FILES })
}

export async function getFile(id: string) {
    // alert("clicked");
    // return
    return await request({ method: ApiMethod.GET, url: FILE_ROUTES.GET_FILE(id) })
}