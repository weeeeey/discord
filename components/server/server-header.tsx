import React from 'react';
import { Separator } from '../ui/separator';
import { Bell, Hash, HelpCircle, Pin, Users } from 'lucide-react';
import ServerSearch from './server-search';
import ServerMember from './server-member';
import currentProfile from '@/lib/current-profile';
import { redirect } from 'next/navigation';
import { client } from '@/lib/prismadb';

const ServerHeader = async () => {
    const currentUser = await currentProfile();
    if (!currentUser) {
        redirect('/');
    }
    const res = await client.server.findFirst({
        where: {
            profileId: currentUser.id,
        },
        select: {
            name: true,
            members: {
                include: {
                    profile: true,
                },
            },
        },
    });
    if (!res) {
        redirect('/');
    }
    const members = res?.members.map((member) => member.profile) || [];
    return (
        <div className="flex flex-wrap justify-between items-center p-0">
            <div className="font-semibold px-4 py-3 flex space-x-2 ">
                <Hash className="text-slate-400" />
                <div>{res.name}</div>
            </div>
            <div className="flex space-x-3 pr-4 py-3">
                <Bell className="h-6 w-6 cursor-pointer fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
                <Pin className="h-6 w-6  cursor-pointer fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
                <ServerMember members={members} />
                <ServerSearch />
                <HelpCircle className="h-6 w-6 cursor-pointer text-slate-400 hover:fill-slate-200 hover:text-slate-200" />
            </div>
            <Separator className="bg-black" />
        </div>
    );
};

export default ServerHeader;
