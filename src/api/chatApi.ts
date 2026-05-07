import { ApiMethod } from "./axiosConfig";

// const enum CHAT_ROUTES_ENUM {
//     CHAT = "/chat",
// }

export async function chat(prompt: string, handleChunk: (chunk: string) => void, signal: AbortSignal) {
    const url = import.meta.env.VITE_API_URL
    const isDev = import.meta.env.VITE_IS_PROD
    const baseURL = isDev ? "http://127.0.0.1:8000" : url
    const res = await fetch(baseURL + "/chat", {
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
    // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    while (true) {
        const { value, done } = await reader.read();
        if (signal?.aborted) {
            reader.cancel();
            break;
        }
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        console.log(chunk)

        // await sleep(200);
        handleChunk(chunk)
    }
}