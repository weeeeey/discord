import { AlignJustify } from 'lucide-react';
import React from 'react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet';
import MobileSidebar from '../mobile/mobile-server';
import ServerSidebar from './server-sidebar';

interface ServerMobileProps {
    serverId: string;
}
const ServerMobile = async ({ serverId }: ServerMobileProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="sm:hidden ">
                    <AlignJustify className="h-4 w-4 text-slate-400 hover:text-slate-200  sm:hidden" />
                </button>
            </SheetTrigger>
            <SheetContent className="w-[320px] p-0 h-full" side="left">
                <SheetHeader className="h-full">
                    <SheetDescription className="relative h-full">
                        <div className="flex w-[72px] z-30 flex-col inset-y-0 h-full">
                            <MobileSidebar />
                        </div>
                        <div className="absolute top-0 left-[80px] w-[240px]">
                            <ServerSidebar serverId={serverId} />
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default ServerMobile;
