'use client';
import React, { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import InviteServerModal from '../modals/invite-server-modal';
import CreateChannel from '../modals/create-channel';
import EditChannelModal from '../modals/edit-channel-modal';
import MessageFileModal from '../modals/message-file-modal';

const ModalProvider = () => {
    const [isMounted, setisMounted] = useState(false);
    useEffect(() => {
        setisMounted(true);
    }, []);
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <MessageFileModal />
            <EditChannelModal />
            <CreateChannel />
            <CreateServerModal />
            <InviteServerModal />
        </div>
    );
};

export default ModalProvider;
