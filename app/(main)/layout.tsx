import NavigationSidebar from '@/components/navigation/navigation-sidebar';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full ">
            <div className="hidden sm:flex w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="sm:pl-[72px] h-full bg-slate-700">{children}</main>
        </div>
    );
};

export default MainLayout;
