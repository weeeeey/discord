import { ChatInput } from '@/components/chat/chat-input';
import ConversationChat from '@/components/conversation/conversation-chat';
import { ConversationMessages } from '@/components/conversation/conversation-messages';
import { getOrCreateConversation } from '@/lib/conversation';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const MemberIdPage = async ({ params }: { params: { profileId: string } }) => {
    const { profileId } = params;

    const myProfile = await currentProfile();

    if (!myProfile) {
        return redirectToSignIn();
    }
    const otherProfile = await client.profile.findFirst({
        where: {
            id: profileId,
        },
    });
    if (!otherProfile) {
        return redirect('/');
    }
    const conversation = await getOrCreateConversation(
        myProfile.id,
        otherProfile.id
    );
    if (!conversation) {
        return redirect(`/conversations`);
    }
    const { profileOne, profileTwo } = conversation;
    // receive member 명시
    const theOtherProfile =
        profileOne.id === myProfile.id ? profileTwo : profileOne;

    return (
        <div className="flex flex-col h-full w-full">
            <ConversationChat
                apiUrlInput="/api/socket/direct-messages"
                apiUrlMessage="/api/direct-messages"
                chatId={conversation.id}
                myProfile={myProfile}
                name={theOtherProfile.name}
                paramKey="conversationId"
                paramValue={conversation.id}
                query={{ conversationId: conversation.id }}
                type="conversation"
            />
        </div>
    );
};

export default MemberIdPage;
