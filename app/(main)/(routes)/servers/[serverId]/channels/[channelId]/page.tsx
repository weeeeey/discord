import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

interface ChannelPageProps {
    params: {
        serverId: string;
        channelId: string;
    };
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
    const { channelId, serverId } = params;
    const currProfile = await currentProfile();

    if (!currProfile) {
        return redirectToSignIn();
    }
    const channel = await client.channel.findUnique({
        where: {
            serverId,
            id: channelId,
        },
    });

    const member = await client.member.findFirst({
        where: {
            serverId,
            profileId: currProfile.id,
        },
    });

    if (!channel || !member) {
        return redirect('/');
    }
    return (
        <div className="flex flex-col h-full">
            {/* <ChatMessages
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
            />  */}
            <div className="flex-1 h-full">Messages</div>
            <ChatInput
                apiUrl="/api/socket/messages"
                name={channel.name}
                type="channel"
                query={{
                    channelId: channel.id,
                    serverId: channel.serverId,
                }}
            />
        </div>
    );
};

export default ChannelPage;
