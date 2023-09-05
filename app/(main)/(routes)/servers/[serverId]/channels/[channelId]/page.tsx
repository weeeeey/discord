import { ChatInput } from '@/components/chat/chat-input';
import { ChatMessages } from '@/components/chat/chat-messages';
import { MediaRoom } from '@/components/media-room';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
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
        <div className="flex flex-col h-full w-full ">
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages
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
                    />
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                    />
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom chatId={channel.id} video={false} audio={true} />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom chatId={channel.id} video={true} audio={true} />
            )}
        </div>
    );
};

export default ChannelPage;
