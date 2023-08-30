import ServerHeader from '@/components/server/server-header';
import React from 'react';

interface ChannelIDLayoutProps {
    params: {
        serverId: string;
        channelId: string;
    };
}
const ChannelIDLayout = ({ params }: ChannelIDLayoutProps) => {
    const { channelId, serverId } = params;
    return (
        <div>
            <ServerHeader serverId={serverId} channelId={channelId} />
        </div>
    );
};

export default ChannelIDLayout;
