'use client';
import { Channel } from '@prisma/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Hash, UserPlus2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerChannelProps {
    channel: Channel;
    serverId: string;
}
const ServerChannel = ({ channel, serverId }: ServerChannelProps) => {
    const router = useRouter();
    const params = useParams();
    const handleClick = () => {
        router.push(`/servers/${serverId}/channels/${channel.id}`);
    };
    return (
        <div
            className={cn(
                'flex flex-col space-y-4 mx-2 rounded-md',
                channel.id === params.channelId && 'bg-slate-200'
            )}
            onClick={handleClick}
        >
            <div className="flex items-center justify-between font-semibold px-4 py-3">
                <div className="flex items-center justify-center space-x-2">
                    <Hash className="w-4 h-4 text-slate-400" />
                    <div className="text-lg text-slate-200">{channel.name}</div>
                </div>
                <button>
                    <UserPlus2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default ServerChannel;
