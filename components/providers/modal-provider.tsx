'use client';
import React, { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import InviteServerModal from '../modals/invite-server-modal';
import CreateChannel from '../modals/create-channel';

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
            <CreateChannel />
            <CreateServerModal />
            <InviteServerModal />
        </div>
    );
};

export default ModalProvider;
