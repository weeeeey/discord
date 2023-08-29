import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface NavigationItemsProps {
    title?: string;
}

const NavigationItems = ({ title }: NavigationItemsProps) => {
    return (
        <Avatar className="w-12 h-12">
            <AvatarImage
                src={title ? '/cute.webp' : '/placeholder.jpg'}
                alt="avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
};

export default NavigationItems;
