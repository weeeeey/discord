import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { profile } from 'console';
import { NextResponse } from 'next/server';

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const curProfile = await currentProfile();
        const body = await req.json();
        const { serverId } = body;
        const { memberId } = params;
        if (serverId.length === 0 || memberId.length === 0) {
            return new NextResponse('invalid serverId', { status: 400 });
        }
        if (!curProfile) {
            return new NextResponse('unauthorized member', { status: 401 });
        }
        await client.server.update({
            where: {
                id: serverId,
                profileId: curProfile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: memberId,
                        profileId: {
                            not: curProfile.id,
                        },
                    },
                },
            },
        });
        return new NextResponse('MEMBER_DELETE_SUCCESS', { status: 200 });
    } catch (error) {
        console.log('MEMBER_DELETE_ERROR', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
