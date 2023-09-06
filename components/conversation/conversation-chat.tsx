'use client';
import { Profile } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { ConversationMessages } from './conversation-messages';
import { MediaRoom } from '../media-room';
import { ChatInput } from '../chat/chat-input';

interface ConversationChatProps {
    name: string;
    myProfile: Profile;
    chatId: string;
    apiUrlMessage: string;
    apiUrlInput: string;
    paramKey: 'channelId' | 'conversationId';
    paramValue: string;
    type: 'channel' | 'conversation';
    query: Record<string, any>;
}
const ConversationChat = ({
    apiUrlInput,
    apiUrlMessage,
    chatId,
    myProfile,
    name,
    paramKey,
    paramValue,
    query,
    type,
}: ConversationChatProps) => {
    const searchParams = useSearchParams();
    const isVideo = searchParams?.get('video');
    return (
        <div className="h-full w-full">
            {isVideo ? (
                <MediaRoom video={true} audio={false} chatId={chatId} />
            ) : (
                <div className="flex flex-col h-full w-full">
                    <ConversationMessages
                        apiUrl={apiUrlMessage}
                        chatId={chatId}
                        name={name}
                        paramKey={paramKey}
                        paramValue={paramValue}
                        myProfile={myProfile}
                        type={type}
                    />
                    <ChatInput
                        apiUrl={apiUrlInput}
                        name={name}
                        type={type}
                        query={query}
                    />
                </div>
            )}
        </div>
    );
};

export default ConversationChat;
