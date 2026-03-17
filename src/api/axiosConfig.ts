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
}

export const request = async ({ method, url, data }: RequestType) => {


  console.log(method, url, data)
  try {
    const response = await api.request({ method, url, data })
    return response.data
  } catch (error) {
    throw error
  }

}