import ServerHeader from '@/components/server/server-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

interface ChannelIDLayoutProps {
    params: {
        serverId: string;
        channelId: string;
    };
    children: React.ReactNode;
}
const ChannelIDLayout = ({ params, children }: ChannelIDLayoutProps) => {
    const { channelId, serverId } = params;
    return (
        <div>
            <ServerHeader serverId={serverId} channelId={channelId} />
            <ScrollArea>{children}</ScrollArea>
        </div>
    );
};

export default ChannelIDLayout;
