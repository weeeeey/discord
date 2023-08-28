import { currentUser, redirectToSignIn } from '@clerk/nextjs';
import { client } from './prismadb';

const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();
    }

    const profile = await client.profile.findUnique({
        where: {
            userId: user.id,
        },
    });
    if (profile) {
        return profile;
    }
    const newProfile = await client.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });
    return newProfile;
};

export default initialProfile;
