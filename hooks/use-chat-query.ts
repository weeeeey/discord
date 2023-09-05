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

// useQuery
// 데이터를 get 하기 위한 api입니다. post, update는 useMutation을 사용합니다.

// 첫번째 파라미터로 unique Key가 들어가고, 두번째 파라미터로 비동기 함수(api호출 함수)가 들어갑니다. (당연한 말이지만 두번째 파라미터는 promise가 들어가야합니다.)
// 첫번째 파라미터로 설정한 unique Key는 다른 컴포넌트에서도 해당 키를 사용하면 호출 가능합니다. unique Key는 string과 배열을 받습니다. 배열로 넘기면 0번 값은 string값으로 다른 컴포넌트에서 부를 값이 들어가고 두번째 값을 넣으면 query 함수 내부에 파라미터로 해당 값이 전달됩니다.
// return 값은 api의 성공, 실패여부, api return 값을 포함한 객체입니다.

// useQuery는 비동기로 작동합니다. 즉, 한 컴포넌트에 여러개의 useQuery가 있다면 하나가 끝나고 다음 useQuery가 실행되는 것이 아닌 두개의 useQuery가 동시에 실행됩니다. 여러개의 비동기 query가 있다면 useQuery보다는 밑에 설명해 드릴 useQueries를 권유드립니다.
// enabled를 사용하면 useQuery를 동기적으로 사용 가능합니다. 아래 예시로 추가 설명하겠습니다.
