import ConversationHeader from '@/components/conversation/conversation-header';
import { useParams } from 'next/navigation';
import React from 'react';

const ProfileIdLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: {
        profileId: string;
    };
}) => {
    const { profileId } = params;

    if (!profileId) {
        return null;
    }
    return (
        <div className="h-full w-full relative">
            <ConversationHeader otherProfileId={profileId} />
            <main className="h-full pt-20">{children}</main>
        </div>
    );
};

export default ProfileIdLayout;
