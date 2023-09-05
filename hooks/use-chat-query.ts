import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useSocket } from '@/components/providers/socket-provider';

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
}

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    cursor: pageParam,
                    [paramKey]: paramValue,
                },
            },
            { skipNull: true }
        );
        // fetch시 Id들 body에 담아 보내기 vs   query에 담아 params으로 보내기 차이
        const res = await fetch(url);
        return res.json();
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery({
            queryKey: [queryKey],
            queryFn: fetchMessages,
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
            refetchInterval: isConnected ? false : 1000,
        });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
};
