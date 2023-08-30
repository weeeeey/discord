import { UserButton, currentUser } from '@clerk/nextjs';
import React from 'react';
import { Separator } from '../ui/separator';
import NavigationItem from './navigation-items';
import NavigationAction from './navigation-action';
import { ModeToggle } from '../mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import { Server } from '@prisma/client';

const NavigationSidebar = async () => {
    const profile = await currentProfile();
    if (!profile) {
        redirect('/');
    }
    const servers = await client.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
        include: {
            channels: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (!servers) {
        redirect('/');
    }
    return (
        <div className="flex flex-col justify-between items-center p-4 h-full bg-black/70">
            <div className="text-muted-foreground flex flex-col justify-start items-center space-y-2">
                <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.jpg" alt="DM" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Separator />
                {servers.map((server) => (
                    <NavigationItem
                        key={server.id}
                        value={server.id}
                        imageUrl={server.imageUrl}
                        name={server.name}
                        channelId={server.channels[0].id}
                    />
                ))}
                <NavigationAction />
            </div>
            <div className="flex flex-col items-center space-y-2">
                <ModeToggle />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: 'w-12 h-12',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default NavigationSidebar;
