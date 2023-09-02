import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { serverId, channelId, content, fileUrl, memberId } = body;
        const currProfile = await currentProfile();
        if (!currProfile) {
            return new NextResponse('unauthorized User', { status: 401 });
        }
        if (
            serverId.length === 0 ||
            channelId.length === 0 ||
            content.length === 0
        ) {
            return new NextResponse('invalid data', { status: 400 });
        }
        const message = await client.message.create({
            data: {
                content,
                fileUrl,
                channelId,
                memberId,
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return NextResponse.json(message);
    } catch (error) {
        console.log('MESSAGE_POST_ERROR', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
