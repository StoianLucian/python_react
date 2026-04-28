import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim()
  ? import.meta.env.VITE_API_BASE_URL
  : import.meta.env.DEV
    ? '/api'
    : 'http://127.0.0.1:8000'

export const api = axios.create({
  baseURL,
  withCredentials: true,
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
    const response = await api.request({ method, url, data, responseType, withCredentials: true })

    return response.data
  } catch (error) {
    throw error
  }

}