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

    try {
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
        let buffer = "";

        while (true) {
            const { done, value } = await reader!.read();

            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");

            buffer = lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;

                const parsed = JSON.parse(line);

                console.log(parsed);

                handleChunk(parsed.response, true);
                handleChunk(parsed.thinking, false);
            }
        }
    } catch (error) {
        throw error
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