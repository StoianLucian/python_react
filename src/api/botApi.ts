import { ApiMethod, request } from "./axiosConfig";
import type { BotModelProps } from "./hooks/tanstack/chat/useBot";

const URLS = {
    BOT: "/bot"
}

export async function bot({ messages, model }: BotModelProps): Promise<string> {
    return await request({ method: ApiMethod.POST, url: URLS.BOT, data: { messages, model } })
}