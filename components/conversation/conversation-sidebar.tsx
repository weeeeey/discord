'use client';

import { Profile } from '@prisma/client';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { redirect, useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ConversationSidebarProps {
    otherProfiles: Profile[];
}

const ConversationSidebar = ({ otherProfiles }: ConversationSidebarProps) => {
    const router = useRouter();
    const params = useParams();
    const paramsProfileId = params?.profileId;
    return (
        <div className="flex flex-col space-y-4 w-full h-full">
            <div className="flex justify-between items-center px-2 pt-4 h-9">
                <div className=" font-semibold text-slate-200 text-xl">
                    Profile
                </div>
            </div>
            <Separator className="bg-black" />

            <div className="flex flex-col p-2 pt-0 space-y-2">
                {otherProfiles.map((profile: Profile) => (
                    <button
                        key={profile.id}
                        className={cn(
                            'flex space-x-2 text-slate-400 hover:text-slate-200 px-2 py-2 rounded-lg hover:bg-slate-800',
                            paramsProfileId === profile.id && 'bg-slate-800'
                        )}
                        onClick={() => {
                            router.push(`/conversations/${profile.id}`);
                        }}
                    >
                        <div className="relative h-10 w-10">
                            <Image
                                alt="profile"
                                src={profile.imageUrl}
                                fill
                                className="rounded-full"
                            />
                        </div>
                        <div>{profile.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ConversationSidebar;
