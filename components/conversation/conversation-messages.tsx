'use client';

import { Fragment, useRef, ElementRef } from 'react';
import { format } from 'date-fns';
import { DirectMessage, Profile } from '@prisma/client';
import { Loader2, ServerCrash } from 'lucide-react';

import { useChatQuery } from '@/hooks/use-chat-query';
import { useChatSocket } from '@/hooks/use-chat-socket';
import { useChatScroll } from '@/hooks/use-chat-scroll';

import { ConversationItem } from './conversation-item';

const DATE_FORMAT = 'd MMM yyyy, HH:mm';

type DirectMessageWithProfile = DirectMessage & {
    profile: Profile;
};

interface ConversationMessagesProps {
    name: string;
    myProfile: Profile;
    chatId: string;
    apiUrl: string;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
    type: 'channel' | 'conversation';
}

export const ConversationMessages = ({
    name,
    myProfile,
    chatId,
    apiUrl,
    paramKey,
    paramValue,
    type,
}: ConversationMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:directMessage`;
    const updateKey = `chat:${chatId}:directMessage:update`;

    const chatRef = useRef<ElementRef<'div'>>(null);
    const bottomRef = useRef<ElementRef<'div'>>(null);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useChatQuery({
            queryKey,
            apiUrl,
            paramKey,
            paramValue,
        });
    useChatSocket({ queryKey, addKey, updateKey });
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    });

    if (status === 'loading') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        );
    }
    return (
        <div
            ref={chatRef}
            className="flex-1 flex flex-col py-4 overflow-y-auto"
        >
            {!hasNextPage && <div className="flex-1" />}
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                    ) : (
                        <button
                            onClick={() => fetchNextPage()}
                            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 text-xs my-4 dark:hover:text-zinc-300 transition"
                        >
                            Load previous messages
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col-reverse mt-auto">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map(
                            (directMessage: DirectMessageWithProfile) => (
                                <ConversationItem
                                    key={directMessage.id}
                                    myProfile={myProfile}
                                    profile={directMessage.profile}
                                    content={directMessage.content}
                                    fileUrl={directMessage.fileUrl}
                                    deleted={directMessage.deleted}
                                    timestamp={format(
                                        new Date(directMessage.createdAt),
                                        DATE_FORMAT
                                    )}
                                    isUpdated={
                                        directMessage.updatedAt !==
                                        directMessage.createdAt
                                    }
                                />
                            )
                        )}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef} />
        </div>
    );
};
