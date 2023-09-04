'use client';
import { useParams, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Divide } from 'lucide-react';

interface NavigationItemProps {
    imageUrl: string;
    name: string;
    value: string;
    channelId?: string;
}
const NavigationItem = ({
    imageUrl,
    name,
    value,
    channelId,
}: NavigationItemProps) => {
    const router = useRouter();
    const params = useParams();

    const handleClick = () => {
        if (value === 'DM') {
            router.push(`/conversations`);
        } else {
            router.push(`/servers/${value}/channels/${channelId}`);
        }
    };
    return (
        <button
            onClick={handleClick}
            className="relative rounded-lg transition-all duration-500 p-0 group"
        >
            <div
                className={cn(
                    'absolute top-[35%] -left-[35%] bg-white h-1/3 w-2 rounded-lg hidden group-hover:block',
                    params?.serverId === value
                        ? 'block w-2 h-4/5 top-[15%] transition-all'
                        : ''
                )}
            />
            <Avatar className="w-12 h-12">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
        </button>
    );
};

export default NavigationItem;
