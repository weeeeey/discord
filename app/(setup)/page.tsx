import InitialModal from '@/components/modals/Initial-modal';
import initialProfile from '@/lib/initial-profile';
import { client } from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import React from 'react';

const SetupPage = async () => {
    const profile = await initialProfile();
    const server = await client.server.findFirst({
        where: {
            profileId: profile.id,
        },
        include: {
            channels: {
                select: {
                    id: true,
                },
            },
        },
    });
    if (server) {
        return redirect(
            `/servers/${server.id}/channels/${server.channels[0].id}`
        );
    }
    return <InitialModal />;
};

export default SetupPage;
