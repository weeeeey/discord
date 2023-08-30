'use client';
import { Channel, Server } from '@prisma/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, Hash, Plus, UserPlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModal } from '@/hooks/use-modal-store';
import TooltipProvider from '../providers/tooltip-provider';

interface ServerChannelProps {
    channel: Channel;
    serverId: string;
    server: Server;
}
const ServerChannel = ({ channel, serverId, server }: ServerChannelProps) => {
    const router = useRouter();
    const params = useParams();
    const { onOpen } = useModal();
    const handleClick = () => {
        router.push(`/servers/${serverId}/channels/${channel.id}`);
    };
    let channelType;
    if (channel.type == 'TEXT') {
        channelType = '채팅 채널';
    } else if (channel.type == 'AUDIO') {
        channelType = '음성 채널';
    } else {
        channelType = '비디오 채널';
    }
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-1 text-slate-400 group">
                <div className=" flex justify-center items-center group-hover:text-slate-200 ">
                    <ChevronRight className="w-4 h-4" />
                    <div className="text-sm ">{channelType}</div>
                </div>
                <TooltipProvider description="채널 추가">
                    <button
                        onClick={() => {
                            onOpen('createChannel', {
                                channelType: channel.type,
                            });
                        }}
                    >
                        <Plus className="w-4 h-4 mr-4 hover:text-slate-200" />{' '}
                    </button>
                </TooltipProvider>
            </div>
            <div
                className={cn(
                    'flex flex-col mx-2 rounded-md transition-all',
                    channel.id === params.channelId && 'bg-slate-800'
                )}
                onClick={handleClick}
            >
                <div className="flex items-center justify-between font-semibold px-4 py-1">
                    <div className="flex items-center justify-center space-x-2">
                        <Hash className="w-4 h-4 text-slate-400" />
                        <div className="text-lg text-slate-200">
                            {channel.name}
                        </div>
                    </div>
                    <TooltipProvider description="초대 코드 만들기">
                        <button
                            onClick={() => {
                                onOpen('invite', { server });
                            }}
                        >
                            <UserPlus2 className="w-4 h-4" />
                        </button>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    );
};

export default ServerChannel;
