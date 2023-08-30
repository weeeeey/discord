import ServerHeader from '@/components/server/server-header';
import ServerSidebar from '@/components/server/server-sidebar';
import React from 'react';

const ServerLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { serverId: string };
}) => {
    return (
        <div className="h-full">
            <div className="w-60 h-full z-20 bg-slate-600 inset-y-0 fixed">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <div className="md:pl-60">{children}</div>
        </div>
    );
};

export default ServerLayout;
