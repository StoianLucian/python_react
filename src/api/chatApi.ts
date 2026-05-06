import { ApiMethod } from "./axiosConfig";

const enum CHAT_ROUTES_ENUM {
    CHAT = "/chat",
}

export async function chat(prompt: string, handleChunk: (chunk: string) => void, signal: AbortSignal) {
    const res = await fetch("http://localhost:8000/chat", {
        method: ApiMethod.POST,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();

    if (!reader) {
        console.log("No stream body received");
        return;
    }

    const decoder = new TextDecoder();
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (true) {
        const { value, done } = await reader.read();
        if (signal?.aborted) {
            reader.cancel();
            break;
        }
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        console.log(chunk)

        await sleep(200);
        handleChunk(chunk)
    }
}