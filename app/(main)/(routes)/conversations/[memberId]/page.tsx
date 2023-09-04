import { getOrCreateConversation } from '@/lib/conversation';
import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const MemberIdPage = async ({
    params,
}: {
    params: { memberId: string; serverId: string };
}) => {
    const { memberId, serverId } = params;
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }
    const currentMember = await client.member.findFirst({
        where: {
            serverId,
            id: memberId,
        },
        include: {
            profile: true,
        },
    });
    if (!currentMember) {
        return redirect('/');
    }
    const conversation = await getOrCreateConversation(
        profile.id,
        currentMember.id
    );
    if (!conversation) {
        return redirect(`/servers/${serverId}`);
    }
    const { memberOne, memberTwo } = conversation;
    // receive member 명시
    const otherMember = memberOne.id === profile.id ? memberTwo : memberOne;

    return <div>MemberIdPage</div>;
};

export default MemberIdPage;
