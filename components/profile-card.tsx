'use client';
import { Member, Profile } from '@prisma/client';
import { Server, UserCircle2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { format } from 'date-fns';
import { Separator } from './ui/separator';
import { Input } from './ui/input';

interface ProfileCardProps {
    member: Member & {
        profile: Profile;
    };
    myProfile?: boolean;
}

const ProfileCard = ({ member, myProfile }: ProfileCardProps) => {
    const signUpDate = format(member.profile.createdAt, 'yyyy년 M월 d일');
    const enterDate = format(member.createdAt, 'yyyy년 M월 d일');

    return (
        <div className="bg-slate-800 relative text-slate-300 rounded-lg">
            <div className="h-14 bg-slate-500 rounded-t-lg" />
            <div className="h-20 w-20 absolute top-3 left-3 ring-4 ring-black rounded-full">
                <Image
                    src={member.profile.imageUrl}
                    fill
                    alt="member"
                    className="rounded-full"
                />
            </div>
            <main className="p-4 pt-10">
                <div className="bg-background p-4  flex flex-col space-y-4 rounded-lg">
                    <header className="flex flex-col  text-slate-200">
                        <h3 className="text-lg">{member.profile.name}</h3>
                        <div className="text-sm">{member.profile.email}</div>
                    </header>
                    <Separator className="bg-slate-400" />
                    <div>가입시기:</div>
                    <div className="flex space-x-2 justify-center items-center text-slate-300 ">
                        <UserCircle2 className="w-4 h-4" />
                        <div className="text-sm">{signUpDate}</div>
                        <Server className="w-4 h-4" />
                        <div className="text-sm">{enterDate}</div>
                    </div>
                    <div>역할:</div>
                    <div className="lowercase pb-4"> {member.role}</div>
                    {!myProfile && (
                        <Input
                            placeholder={`${member.profile.name} 님에게 메시지 보내기`}
                            className="w-full rounded-md"
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfileCard;
