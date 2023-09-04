import { NextApiRequest } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { client } from './prismadb';

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return null;
    }

    const profile = await client.profile.findUnique({
        where: {
            userId,
        },
    });

    return profile;
};
