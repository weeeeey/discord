import ConversationSidebar from '@/components/conversation/conversation-sidebar';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import React from 'react';

const ConversationLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const myProfile = await currentProfile();
    const otherProfiles = await client.profile.findMany({
        where: {
            NOT: {
                id: myProfile.id,
            },
        },
    });
    return (
        <div className="h-full">
            <div className="hidden sm:block w-60 h-full z-20 bg-slate-600 inset-y-0 fixed">
                <ConversationSidebar otherProfiles={otherProfiles} />
            </div>
            <main className="sm:pl-60 h-full">{children}</main>
        </div>
    );
};

export default ConversationLayout;
