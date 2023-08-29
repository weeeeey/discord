import React from 'react';
import { Button } from '../ui/button';
import { Compass, Plus } from 'lucide-react';

const NavigationAction = () => {
    return (
        <div className="space-y-2">
            <Button className="h-12 w-12 rounded-full p-2 bg-slate-700 ">
                <Plus />
            </Button>
            <Button className="h-12 w-12 rounded-full p-2 bg-slate-700 ">
                <Compass />
            </Button>
        </div>
    );
};

export default NavigationAction;
