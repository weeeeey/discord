import ServerSidebar from '@/components/server/server-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
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
            <div className="hidden sm:block w-60 h-full z-20 bg-slate-600 inset-y-0 fixed">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="sm:pl-60 h-full">{children}</main>
        </div>
    );
};

export default ServerLayout;
