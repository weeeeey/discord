import { auth, redirectToSignIn } from '@clerk/nextjs';
import { client } from './prismadb';

const currentProfile = async () => {
    const { userId } = auth();
    if (!userId) {
        return redirectToSignIn();
    }
    const currentUser = await client.profile.findUnique({
        where: {
            userId,
        },
    });

    return currentUser;
};

export default currentProfile;
