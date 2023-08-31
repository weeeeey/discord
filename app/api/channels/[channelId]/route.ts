import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function PATCH(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const currentUser = await currentProfile();
        const body = await req.json();
        const { name, type, serverId } = body;
        const { channelId } = params;
        if (!currentUser) {
            return new NextResponse('unathorized user', { status: 401 });
        }
        if (serverId.length === 0 || name.length === 0 || type.length === 0) {
            return new NextResponse('invalid data', { status: 402 });
        }
        const server = await client.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: currentUser.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: channelId,
                            NOT: {
                                name: 'general',
                            },
                        },
                        data: {
                            name,
                            type,
                        },
                    },
                },
            },
        });
        return NextResponse.json(server);
    } catch (error) {
        console.log('CHANNEL_ID_PATCH_ERROR', error);
        return new NextResponse('internal error', { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { channelId: string } }
) {
    try {
        const currentUser = await currentProfile();
        const { channelId } = params;

        const body = await req.json();
        const { serverId } = body;
        await client.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: currentUser.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR],
                        },
                    },
                },
            },
            data: {
                channels: {
                    delete: {
                        id: channelId,
                        name: {
                            not: 'general',
                        },
                    },
                },
            },
        });
        return new NextResponse('channel deleted', { status: 200 });
    } catch (error) {
        console.log('CHANNEL_ID_ERROR_DELETE', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
