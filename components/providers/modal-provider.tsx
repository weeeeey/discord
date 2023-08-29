'use client';
import React, { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';

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
            <CreateServerModal />
        </div>
    );
};

export default ModalProvider;
