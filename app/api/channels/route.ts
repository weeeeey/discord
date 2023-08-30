import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const currentP = await currentProfile();
        const body = await req.json();
        const { type, name, serverId } = body;
        if (!currentP.id) {
            return new NextResponse('unauthorized user', { status: 401 });
        }
        if (serverId.length === 0 || name.length === 0) {
            return new NextResponse('server ID missing', { status: 400 });
        }
        if (name === 'general') {
            return new NextResponse("Name cannot be 'general'", {
                status: 400,
            });
        }
        const server = await client.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: currentP.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    create: {
                        profileId: currentP.id,
                        name,
                        type,
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNELS_POST', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
