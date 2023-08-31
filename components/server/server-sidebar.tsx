import React from 'react';
import { Separator } from '../ui/separator';
import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import { client } from '@/lib/prismadb';
import { ChevronDown } from 'lucide-react';
import ServerSection from './server-section';

interface ServerSidebarProps {
    serverId: string;
}

const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const currentUser = await currentProfile();
    if (!currentUser) {
        return redirect('/');
    }
    if (!serverId) {
        return null;
    }
    const channels = await client.channel.findMany({
        where: {
            serverId,
        },
        include: {
            server: true,
        },
    });
    const server = await client.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });
    if (!server) {
        return redirect('/');
    }
    const textChannels = server?.channels.filter((cha) => cha.type === 'TEXT');
    const videoChannels = server?.channels.filter(
        (cha) => cha.type === 'VIDEO'
    );
    const audioChannels = server?.channels.filter(
        (cha) => cha.type === 'AUDIO'
    );

    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <div className="flex justify-between items-center px-2 pt-4 h-8">
                <div className=" font-semibold text-slate-200 text-xl">
                    {channels[0].server.name}
                </div>
                <button>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
            <Separator className="bg-black" />
            <div className="flex flex-col p-0 space-y-4">
                <ServerSection
                    admin={server?.profileId === currentUser.id}
                    channelType="TEXT"
                    channels={textChannels}
                    server={server}
                />
                <ServerSection
                    admin={server?.profileId === currentUser.id}
                    channelType="AUDIO"
                    channels={audioChannels}
                    server={server}
                />
                <ServerSection
                    admin={server?.profileId === currentUser.id}
                    channelType="VIDEO"
                    channels={videoChannels}
                    server={server}
                />
            </div>
        </div>
    );
};

export default ServerSidebar;
