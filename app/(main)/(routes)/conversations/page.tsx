import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

const ConversationPage = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const otherProfile = await client.profile.findMany({
        where: {
            NOT: {
                id: profile.id,
            },
        },
    });
    console.log(otherProfile);
    return <div>ConversationPage</div>;
};

export default ConversationPage;
