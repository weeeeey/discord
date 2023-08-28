import { ModeToggle } from '@/components/mode-toggle';
import React from 'react';

const MainPage = () => {
    return (
        <div className="relative">
            <div className="absolute inset-x-0 ">
                <ModeToggle />
            </div>
        </div>
    );
};

export default MainPage;
