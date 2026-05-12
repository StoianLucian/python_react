import { useQuery } from '@tanstack/react-query';
import { getAvailableModels } from '../../../chatApi';


export function useChatModels() {
    return useQuery({
        queryFn: () => getAvailableModels(),
        queryKey: ["models"],
    });
}
