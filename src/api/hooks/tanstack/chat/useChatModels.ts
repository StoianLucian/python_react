import { useQuery } from '@tanstack/react-query';
import { getAvailableModels } from '../../../chatApi';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { queryKeys } from '../../../../enums/queryKeys';


export function useChatModels(setModel: Dispatch<SetStateAction<string>>) {
    const query = useQuery({
        queryFn: () => getAvailableModels(),
        queryKey: queryKeys.models,
    });

    useEffect(() => {
        if (query.isSuccess && query.data?.length) {
            setModel(query.data[0].id);
        }
    }, [query.isSuccess, query.data, setModel]);

    return query
}
