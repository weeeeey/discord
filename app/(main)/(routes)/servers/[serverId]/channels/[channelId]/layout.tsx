import ServerHeader from '@/components/server/server-header';
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
            {children}
        </div>
    );
};

export default ChannelIDLayout;
