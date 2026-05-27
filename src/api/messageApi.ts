import { ApiMethod, request } from "./axiosConfig";
import type { PartialChatResponse } from "./hooks/tanstack/chat/useCreateMessage";

const enum MESSAGE_ROUTES_ENUM {
    SESSION = "/message",
}

export const MESSAGE_ROUTES = {
    MESSAGE_ID: (id: string) => `${MESSAGE_ROUTES_ENUM.SESSION}/${id}`,
}


export async function sendMessage({ id, message }: { id: string, message: PartialChatResponse }) {
    return await request({ method: ApiMethod.POST, url: MESSAGE_ROUTES.MESSAGE_ID(id), data: message })
}