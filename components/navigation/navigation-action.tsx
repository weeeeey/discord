'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Compass, Plus } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';

const NavigationAction = () => {
    const { onOpen } = useModal();
    return (
        <>
            <div className="space-y-2">
                <Button
                    onClick={() => {
                        onOpen('createServer');
                    }}
                    className="h-12 w-12 rounded-full p-2 bg-slate-700 "
                >
                    <Plus />
                </Button>
            </div>
        </>
    );
};

export default NavigationAction;
