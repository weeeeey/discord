import React from 'react';
import { Separator } from '../ui/separator';
import { Bell, Hash, HelpCircle, Pin, Users } from 'lucide-react';
import ServerSearch from './server-search';
import ServerMember from './server-member';
import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import { client } from '@/lib/prismadb';

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
                where: {
                    NOT: {
                        profileId: currentUser.id,
                    },
                },
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
    const members = server?.members;
    return (
        <div className="flex flex-wrap justify-between items-center p-0">
            <div className="font-semibold px-4 pt-2 flex items-center space-x-2 h-8 ">
                <Hash className="text-slate-400" />
                <div className="pb-1">{server?.channels[0].name}</div>
            </div>
            <div className="flex space-x-3 pr-4 py-3">
                <Bell className="h-6 w-6 cursor-pointer fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
                <Pin className="h-6 w-6  cursor-pointer fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
                <ServerMember members={members} />
                <ServerSearch />
                <HelpCircle className="h-6 w-6 cursor-pointer text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
            </div>
            <Separator className="bg-black" />
        </div>
    );
};

export default ServerHeader;
