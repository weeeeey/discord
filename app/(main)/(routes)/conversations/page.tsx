import currentProfile from '@/lib/current-profile';
import { client } from '@/lib/prismadb';
import { redirectToSignIn } from '@clerk/nextjs';
import React from 'react';

const ConversationPage = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center  ">
            <div className="text-2xl ">
                Welcome! Make new friends right here.
            </div>
            <div className="text-slate-400 text-xl">send a message </div>
        </div>
    );
};

export default ConversationPage;
