import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { Separator } from '../ui/separator';
import NavigationItems from './navigation-items';
import NavigationAction from './navigation-action';
import { ModeToggle } from '../mode-toggle';

const NavigationSidebar = () => {
    return (
        <div className="flex flex-col justify-between items-center p-4 h-full bg-black/70">
            <div className="text-muted-foreground flex flex-col justify-start items-center space-y-2">
                <NavigationItems title="Dm" />
                <Separator />
                <NavigationItems />
                <NavigationItems />
                <NavigationItems />
                <NavigationItems />
                <NavigationItems />
                <NavigationAction />
            </div>
            <div className="flex flex-col items-center space-y-2">
                <ModeToggle />
                <UserButton
                    appearance={{
                        elements: {
                            avatarBox: 'w-12 h-12',
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default NavigationSidebar;
