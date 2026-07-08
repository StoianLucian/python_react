import { useState } from 'react'
import InputComponent from '../../components/inputComponent/InputComponent'
import { useBotModel } from '../../api/hooks/tanstack/chat/useBot'
import { Box, Button, CircularProgress, Stack } from '@mui/material'
import SelectComponent from '../../components/select/SelectComponent'
import { useChatModels } from '../../api/hooks/tanstack/chat/useChatModels'
import type { History } from '../../components/Chat/AiChat'

function BotPage() {

    const [value, setValue] = useState<string>("")
    const [response, setResponse] = useState<{ role: string, content: string }[]>([])
    const [model, setModel] = useState<string>("")

    const { mutateAsync: sendBotMessage, isPending } = useBotModel()

    const { data: options = [], isLoading: loadingOptions } = useChatModels(setModel)

    async function handleBotMessage(query: string) {

        const message = { content: query, role: "user" }

        setResponse((prev) => [...prev, message])

        const messages: History[] = [...response, message]


        setValue("")
        const botResponse = await sendBotMessage({ messages, model })

        const botMessage: History = {
            role: "assistant",
            content: botResponse
        }

        setResponse((prev) => [...prev, botMessage])
    }
    return (
        <Box className="w-[80vw] flex flex-col justify-center items-center">
            <Stack>
                {isPending && <CircularProgress />}
                {response.map((r) => <div>

                    {r.role}
                    {r.content}</div>)}
            </Stack>

            <Box className="flex flex-row justify-center items-center">
                <SelectComponent
                    onChange={setModel}
                    value={model}
                    options={options}
                    isLoading={loadingOptions}
                />
                <InputComponent value={value} onChange={(e) => setValue(e)} />
                <Button onClick={() => { handleBotMessage(value) }}>submit</Button>
            </Box>

        </Box>
    )
}

export default BotPage