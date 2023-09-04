import React from 'react';
import { Separator } from '../ui/separator';
import { AlignJustify, Bell, Hash, HelpCircle, Pin, Users } from 'lucide-react';
import ServerSearch from './server-search';
import ServerMember from './server-member';
import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import { client } from '@/lib/prismadb';
import ServerMobile from './server-mobile';
import SocketIndicator from '../ui/socket-indicator';

interface ServerHeaderProps {
    serverId: string;
    channelId: string;
}

const ServerHeader = async ({ serverId, channelId }: ServerHeaderProps) => {
    const currentUser = await currentProfile();
    if (!currentUser) {
        redirect('/');
    }

    const server = await client.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
            },
            channels: {
                where: {
                    id: channelId,
                },
            },
        },
    });
    if (!server) {
        redirect('/');
    }
    return (
        <div className="flex flex-wrap justify-between items-center p-0">
            <div className="font-semibold  py-3 pl-3  flex items-center space-x-2 h-8 ">
                <ServerMobile serverId={serverId} />
                <Hash className="text-slate-400 h-4 w-4" />
                <div>{server?.channels[0].name}</div>
            </div>
            <div className="flex items-center space-x-3 pr-4 py-3">
                <SocketIndicator />
                <ServerMember
                    serverId={serverId}
                    members={server.members}
                    currentProfile={currentUser}
                    isAdmin={server.profileId === currentUser.id}
                />
                <ServerSearch />
            </div>
            <Separator className="bg-black" />
        </div>
    );
};

export default ServerHeader;
