import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { DirectMessage } from '@prisma/client';
import { NextResponse } from 'next/server';

// https://www.prisma.io/docs/concepts/components/prisma-client/pagination
const MESSAGES_BATCH = 10;

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const searchParams = url.searchParams;

        const conversationId = searchParams.get('conversationId');
        const cursor = searchParams.get('cursor');

        const myProfile = await currentProfile();
        if (!myProfile) {
            return new NextResponse('Unauthorized user', { status: 401 });
        }
        if (!conversationId) {
            return new NextResponse('invalid ID', { status: 400 });
        }
        let directMessages: DirectMessage[] = [];

        if (cursor) {
            directMessages = await client.directMessage.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    conversationId,
                },
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            directMessages = await client.directMessage.findMany({
                take: MESSAGES_BATCH,
                where: {
                    conversationId,
                },
                include: {
                    profile: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        let nextCursor = null;
        if (directMessages.length === MESSAGES_BATCH) {
            nextCursor = directMessages[MESSAGES_BATCH - 1].id;
        }
        return NextResponse.json({
            items: directMessages,
            nextCursor,
        });
    } catch (error) {
        console.log('DM_ERROR_GET', error);
        return new NextResponse('internal error', { status: 500 });
    }
}
