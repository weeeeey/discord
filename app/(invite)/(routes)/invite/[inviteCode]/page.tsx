import { Button } from '@/components/ui/button';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import axios from 'axios';
import { Circle } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';
import { toast } from 'react-hot-toast';

const InviteCodePage = async ({
    params,
}: {
    params: { inviteCode: string };
}) => {
    const { inviteCode } = params;
    const currentUser = await currentProfile();

    if (!currentUser) {
        return redirect('/');
    }
    if (!inviteCode) {
        return null;
    }

    const server = await client.server.findUnique({
        where: {
            inviteCode,
        },
        include: {
            profile: true,
            channels: true,
            members: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (!server) {
        return <div>유효하지 않은 서버 코드입니다.</div>;
    }

    const handleClick = async () => {
        try {
            const res = await axios.post(
                `/api/servers/${server.id}/invite-code`,
                {
                    serverId: server.id,
                    profile: currentUser,
                }
            );
        } catch (error) {
            toast.error('something went wrong');
        }
    };

    return (
        <div className="p-4 flex flex-col space-y-4 justify-center items-center bg-slate-800">
            <div className="w-20 h-20 relative">
                <Image
                    alt="invitor"
                    src={server.profile.imageUrl}
                    fill
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col justify-center items-center space-y-2">
                <div>
                    {server.profile.name}({server.profile.email}) 님이 초대함:
                </div>
                <div>{server.channels[0].name}</div>
                <div className="flex items-center space-x-2 ">
                    <Circle className="w-3 h-3 fill-slate-400 text-slate-400" />
                    <div>멤버 {server.members.length}명</div>
                </div>
            </div>
            <Button className="w-full hover:bg-slate-400">초대 수락하기</Button>
        </div>
    );
};

export default InviteCodePage;
