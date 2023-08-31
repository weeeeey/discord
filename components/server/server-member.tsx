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
import { Users } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ServerMemberProps {
    members:
        | (Member & {
              profile: Profile;
          })[]
        | undefined;
}

const ServerMember = ({ members }: ServerMemberProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Sheet modal={false} open={isOpen}>
            <button>
                <Users
                    onClick={() => {
                        setIsOpen((p) => !p);
                    }}
                    className={cn(
                        'h-6 w-6 fill-slate-400 text-slate-400 hover:fill-slate-200 hover:text-slate-200',
                        isOpen && 'fill-slate-200 text-slate-200'
                    )}
                />
            </button>

            <SheetContent className="w-60 flex flex-col mt-12">
                <SheetHeader className="flex flex-col items-start px-2 ">
                    <SheetTitle className="text-xs text-neutral-300 ">
                        Members
                    </SheetTitle>
                    <SheetDescription>
                        {members?.map((member) => (
                            <div
                                key={member.id}
                                className="flex justify-center items-center space-x-4 w-full"
                            >
                                <div className="w-8 h-8 relative">
                                    <Image
                                        alt="memberImage"
                                        src={member.profile.imageUrl}
                                        fill
                                        className="rounded-full "
                                    />
                                </div>
                                <div className="text-lg text-neutral-300 ">
                                    {member.profile.name}
                                </div>
                            </div>
                        ))}
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default ServerMember;
