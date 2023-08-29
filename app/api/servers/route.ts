import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import ObjectID from 'bson-objectid';

export async function POST(req: Request) {
    try {
        const currentUser = await currentProfile();
        if (!currentUser) {
            return new NextResponse('Not authorized user', { status: 401 });
        }
        const body = await req.json();
        const { name, imageUrl } = body;

        const code = nanoid(12);
        const inviteCode = ObjectID(code).toHexString();
        const newServer = await client.server.create({
            data: {
                profileId: currentUser.id,
                name,
                imageUrl,
                inviteCode,
            },
        });
        return NextResponse.json(newServer);
    } catch (error) {
        return new NextResponse('Internal error', { status: 500 });
    }
}
