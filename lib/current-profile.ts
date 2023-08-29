import { auth, redirectToSignIn } from '@clerk/nextjs';
import { client } from './prismadb';
import { Profile } from '@prisma/client';

const currentProfile = async (): Promise<Profile> => {
    const { userId } = auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const currentUser = await client.profile.findUnique({
        where: {
            userId,
        },
    });

    return currentUser!;
};

export default currentProfile;
