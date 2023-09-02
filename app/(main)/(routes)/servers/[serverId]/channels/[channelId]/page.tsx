import ChatInput from '@/components/chat/chat-input';
import ChatMessages from '@/components/chat/chat-messages';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
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
        return redirect('/sign-in');
    }
    const channel = await client.channel.findUnique({
        where: {
            serverId,
            id: channelId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });
    if (!channel) {
        return redirect('/');
    }

    const member = await client.member.findFirst({
        where: {
            serverId,
            profileId: currProfile.id,
        },
    });

    return (
        <div className="w-full h-full relative">
            <ChatMessages />
            <ChatInput />
        </div>
    );
};

export default ChannelPage;
