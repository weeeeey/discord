import React from 'react';
import { Separator } from '../ui/separator';
import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import { client } from '@/lib/prismadb';
import ServerChannel from './server-channel';
import { ArrowDown, ChevronDown } from 'lucide-react';

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
            {channels.map((channel) => (
                <ServerChannel
                    key={channel.id}
                    channel={channel}
                    serverId={serverId}
                    server={channel.server}
                />
            ))}
        </div>
    );
};

export default ServerSidebar;
