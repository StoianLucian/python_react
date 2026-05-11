import axios from "axios";
import { ApiMethod, baseURL } from "./axiosConfig";

const enum CHAT_ROUTES_ENUM {
    CHAT = "/chat",
    CHAT_PING = "/chat/ping"
}

export async function chat(
    obj: {
        prompt: string,
        model: string
    },
    handleChunk: (chunk: string, isResponse: boolean) => void,
    signal: AbortSignal
) {
    const res = await fetch(baseURL + CHAT_ROUTES_ENUM.CHAT, {
        method: ApiMethod.POST,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    });

    const reader = res.body?.getReader();

    if (!reader) {
        console.log("No stream body received");
        return;
    }

    const decoder = new TextDecoder();
    // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (true) {

        if (signal.aborted) {
            break
        }
        const { value, done } = await reader.read();
        if (done) break;

        const chunkStr = decoder.decode(value, { stream: true });


        const res = JSON.parse(chunkStr);

        if (res.thinking) {
            const thinkingchung = res.thinking
            handleChunk(thinkingchung, false)
        }

        if (res.response) {
            const responseChunk = res.response
            handleChunk(responseChunk, true)
        }
    }
}

export async function pingModel(
    model: string
) {

    try {
        const res = await axios.post(baseURL + CHAT_ROUTES_ENUM.CHAT_PING, { model });

        return res
    } catch (error) {
        console.log(error)
        throw error
    }


}