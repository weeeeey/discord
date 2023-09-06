'use client';

import { FileIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { UserAvatar } from '@/components/user-avatar';
import { cn } from '@/lib/utils';
import { Profile } from '@prisma/client';

interface ConversationItemProps {
    content: string;
    profile: Profile;
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    isUpdated: boolean;
}

export const ConversationItem = ({
    content,
    profile,
    timestamp,
    fileUrl,
    deleted,
    isUpdated,
}: ConversationItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            if (event.key === 'Escape' || event.keyCode === 27) {
                setIsEditing(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keyDown', handleKeyDown);
    }, []);

    const fileType = fileUrl?.split('.').pop();

    const isPDF = fileType === 'pdf' && fileUrl;
    const isImage = !isPDF && fileUrl;

    return (
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <UserAvatar src={profile.imageUrl} />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                                {profile.name}
                            </p>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {timestamp}
                        </span>
                    </div>
                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
                        >
                            <Image
                                src={fileUrl}
                                alt={content}
                                fill
                                className="object-cover"
                            />
                        </a>
                    )}
                    {isPDF && (
                        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                            >
                                PDF File
                            </a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                'text-sm text-zinc-600 dark:text-zinc-300',
                                deleted &&
                                    'italic text-zinc-500 dark:text-zinc-400 text-xs mt-1'
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
