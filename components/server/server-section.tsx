'use client';

import { Channel, Server } from '@prisma/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Hash, Plus, UserPlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/use-modal-store';
import TooltipProvider from '../providers/tooltip-provider';

import React from 'react';
import ServerChannel from './server-channel';

interface ServerSectionProps {
    channels?: Channel[];
    server: Server;
    admin: boolean;
    channelType: 'TEXT' | 'VIDEO' | 'AUDIO';
}

const ServerSection = ({
    channelType,
    channels,
    server,
    admin,
}: ServerSectionProps) => {
    const { onOpen } = useModal();
    return (
        <div>
            <div className="flex justify-between items-center  text-slate-400 group">
                <div className=" flex justify-center items-center group-hover:text-slate-200 ">
                    <ChevronRight className="w-3 h-3" />
                    <div className="text-xs ">{channelType}</div>
                </div>
                <TooltipProvider description="채널 추가">
                    <button
                        onClick={() => {
                            onOpen('createChannel', {
                                channelType,
                            });
                        }}
                    >
                        <Plus
                            className={cn(
                                'w-3 h-3 mr-5 hover:text-slate-200',
                                admin ? 'block' : 'hidden'
                            )}
                        />
                    </button>
                </TooltipProvider>
            </div>
            {channels?.map((channel) => (
                <ServerChannel
                    key={channel.id}
                    channelType={channelType}
                    channel={channel}
                    server={server}
                    admin={admin}
                />
            ))}
        </div>
    );
};

export default ServerSection;
