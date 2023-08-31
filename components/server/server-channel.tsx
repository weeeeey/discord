'use client';
import { Channel, Server } from '@prisma/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Hash, Plus, Settings, UserPlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/use-modal-store';
import TooltipProvider from '../providers/tooltip-provider';

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    admin: boolean;
}
const ServerChannel = ({ channel, server, admin }: ServerChannelProps) => {
    const router = useRouter();
    const params = useParams();
    const { onOpen } = useModal();
    const handleClick = () => {
        router.push(`/servers/${server.id}/channels/${channel.id}`);
    };

    return (
        <div className="p-0 mt-1">
            <div
                className={cn(
                    'flex flex-col mx-2 rounded-md transition-all cursor-pointer',
                    channel.id === params.channelId
                        ? 'bg-slate-800'
                        : 'hover:bg-slate-500'
                )}
                onClick={handleClick}
            >
                <div className="flex items-center justify-between font-semibold px-2 py-1">
                    <div className="flex items-center justify-center space-x-2">
                        <Hash className="w-4 h-4 text-slate-400" />
                        <div
                            className={cn(
                                'text-sm text-slate-400',
                                channel.id === params.channelId &&
                                    'text-slate-200'
                            )}
                        >
                            {channel.name}
                        </div>
                    </div>
                    <div className=" flex text-slate-400 space-x-1">
                        <TooltipProvider description="초대 코드 만들기">
                            <button
                                className="hover:text-slate-200"
                                onClick={() => {
                                    onOpen('invite', { server });
                                }}
                            >
                                <UserPlus2 className="w-4 h-4" />
                            </button>
                        </TooltipProvider>
                        <TooltipProvider description="채널 편집">
                            <button
                                className="hover:text-slate-200"
                                onClick={() => {
                                    onOpen('editChannel', { channel });
                                }}
                            >
                                <Settings
                                    className={cn(
                                        'w-4 h-4',
                                        admin ? 'block' : 'hidden'
                                    )}
                                />
                            </button>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerChannel;
