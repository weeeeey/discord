'use client';
import { Member, Profile } from '@prisma/client';
import React, { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Crown, Trash, Users } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import TooltipProvider from '../providers/tooltip-provider';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import ProfileCard from '../profile-card';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface ServerMemberProps {
    isAdmin: boolean;
    serverId: string;
    currentProfile: Profile;
    members:
        | (Member & {
              profile: Profile;
          })[]
        | undefined;
}

const ServerMember = ({
    members,
    currentProfile,
    isAdmin,
    serverId,
}: ServerMemberProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const deleteMember = async (id: string) => {
        try {
            await axios.delete(`/api/members/${id}`, {
                data: {
                    serverId,
                },
            });
            toast.success('The member is deleted');
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            router.refresh();
        }
    };
    return (
        <div>
            <Sheet modal={false} open={isOpen}>
                <button>
                    <Users
                        onClick={() => {
                            setIsOpen((p) => !p);
                        }}
                        className={cn(
                            'h-4 w-4 fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200',
                            isOpen && 'fill-slate-200 text-slate-200'
                        )}
                    />
                </button>

                <SheetContent className="w-[260px] flex flex-col mt-[53px] p-4">
                    <SheetHeader className="flex flex-col items-start  ">
                        <SheetTitle className="text-xs text-slate-400 ">
                            Members - {members?.length}
                        </SheetTitle>
                        <SheetDescription className="w-full relative  ">
                            {members?.map((member) => (
                                <Popover key={member.id}>
                                    <div className="flex justify-between items-center hover:bg-slate-800 rounded-lg">
                                        <PopoverTrigger asChild>
                                            <div className="flex justify-start items-center space-x-2 rounded-lg px-2 py-1 w-full group  cursor-pointer">
                                                <div className="w-8 h-8 relative">
                                                    <Image
                                                        alt="memberImage"
                                                        src={
                                                            member.profile
                                                                .imageUrl
                                                        }
                                                        fill
                                                        className="rounded-full "
                                                    />
                                                </div>
                                                <div className="text-sm text-slate-400 group-hover:text-slate-200 ">
                                                    {member.profile.name}
                                                </div>
                                                {member.role === 'ADMIN' && (
                                                    <TooltipProvider description="서버 주인">
                                                        <Crown className=" w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                    </TooltipProvider>
                                                )}
                                            </div>
                                        </PopoverTrigger>

                                        {isAdmin && (
                                            <button
                                                onClick={() => {
                                                    deleteMember(member.id);
                                                }}
                                            >
                                                <Trash
                                                    className={cn(
                                                        'w-4 h-4 fill-slate-400 mr-2 hover:fill-slate-200',
                                                        member.role !== 'ADMIN'
                                                            ? 'block'
                                                            : 'hidden'
                                                    )}
                                                />
                                            </button>
                                        )}
                                    </div>
                                    <PopoverContent
                                        className="w-80 absolute sm:-top-10 sm:right-32  p-0 border-none 
                                                    -top-0 -right-0  rounded-lg shadow-lg
                                    "
                                    >
                                        <ProfileCard
                                            member={member}
                                            myProfile={
                                                member.profileId ===
                                                currentProfile.id
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default ServerMember;
