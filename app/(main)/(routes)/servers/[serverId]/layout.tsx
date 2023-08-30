import ServerHeader from '@/components/server/server-header';
import ServerSidebar from '@/components/server/server-sidebar';
import React from 'react';

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <div className="w-60 h-full z-20 bg-slate-600 inset-y-0 fixed">
                <ServerSidebar />
            </div>
            <div className="md:pl-60">
                <ServerHeader />
                {children}
            </div>
        </div>
    );
};

export default ServerLayout;
