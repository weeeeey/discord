import { client } from '@/lib/prismadb';
import { Compass } from 'lucide-react';
import React from 'react';
import SocketIndicator from '../ui/socket-indicator';
import { Separator } from '../ui/separator';

interface ConversationHeaderProps {
    otherProfileId: string;
}

const ConversationHeader = async ({
    otherProfileId,
}: ConversationHeaderProps) => {
    const otherProfile = await client.profile.findUnique({
        where: {
            id: otherProfileId,
        },
    });
    if (!otherProfile) {
        return null;
    }
    return (
        <div className="absolute w-full flex flex-wrap justify-between items-center p-0 z-50 bg-slate-700 top-0 left-0">
            <div className="font-semibold  py-[14px] pl-3  flex items-center space-x-2 ">
                {/* <ServerMobile serverId={serverId} /> */}
                <Compass className="text-slate-400 h-6 w-6" />
                <div>{otherProfile.name}</div>
            </div>
            <div className="flex items-center space-x-3 pr-4 py-3">
                <SocketIndicator />
            </div>
            <Separator className="bg-black" />
        </div>
    );
};

export default ConversationHeader;
