import { request, ApiMethod } from "./axiosConfig";

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

export async function getFile(id: string, filename: string) {

    const downloadFile = (data: Blob, filename: string) => {
        const url = window.URL.createObjectURL(data)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
    }

    const fileData = await request({
        method: ApiMethod.GET,
        url: FILE_ROUTES.GET_FILE(id),
        responseType: "blob"
    })

    downloadFile(fileData, filename)
}
