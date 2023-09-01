import { client } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const { serverId } = params;
        const body = await req.json();
        const { profile } = body;
        if (!serverId) {
            return new NextResponse('invalid server', { status: 402 });
        }
        if (!profile) {
            return new NextResponse('unauthorized user', { status: 401 });
        }
        const updatedServer = await client.server.update({
            where: {
                id: serverId,
            },
            data: {
                members: {
                    create: {
                        profileId: profile.id,
                    },
                },
            },
        });
        return NextResponse.json(updatedServer);
    } catch (error) {
        console.log('INVITE_ERROR', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
