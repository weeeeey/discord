import React from 'react';

const InviteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full flex justify-center items-center bg-background">
            {children}
        </div>
    );
};

export default InviteLayout;
