import axios from "axios"

export const api = axios.create({
  baseURL: '/api',   // proxy Vite
  withCredentials: true
})

export enum ApiMethod {
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  GET = "get"
}


interface RequestType {
  method: ApiMethod,
  url: string
  data?: any
  responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream"
}

export const request = async ({ method, url, data, responseType = "json" }: RequestType) => {

  try {
    const response = await api.request({ method, url, data, responseType })

    return response.data
  } catch (error) {
    throw error
  }

}