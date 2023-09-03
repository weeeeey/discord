'use client';
import { Button } from '@/components/ui/button';
import { Profile, Server } from '@prisma/client';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

interface InviteButtonsProps {
    server: Server;
    currentUser: Profile;
}

const InviteButton = ({ currentUser, server }: InviteButtonsProps) => {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const res = await axios.patch(
                `/api/servers/${server.id}/invite-code`,
                {
                    profile: currentUser,
                }
            );
            toast.success('초대에 수락하셨습니다');
            router.push(
                `/servers/${res.data.id}/channels/${res.data.channels[0].id}`
            );

            // console.log(res.data.id);
        } catch (error) {
            console.log('something went wrong');
        }
    };

    return (
        <Button
            onClick={() => {
                handleClick();
            }}
            className="w-full hover:bg-slate-400"
        >
            초대 수락하기
        </Button>
    );
};

export default InviteButton;
