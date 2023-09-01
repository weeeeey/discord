'use client';
import { useModal } from '@/hooks/use-modal-store';
import { Server } from '@prisma/client';
import { AlignJustify } from 'lucide-react';
import React from 'react';

interface ServerMobileProps {
    server: Server;
}

const ServerMobile = ({ server }: ServerMobileProps) => {
    const { onOpen } = useModal();
    return (
        <button
            onClick={() => {
                onOpen('mobile', { server });
            }}
            className="sm:hidden "
        >
            <AlignJustify className="h-4 w-4 text-slate-400 hover:text-slate-200  sm:hidden" />
        </button>
    );
};

export default ServerMobile;
