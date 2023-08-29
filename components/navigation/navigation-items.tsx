import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface NavigationItemProps {
    imageUrl: string;
    name: string;
}
const NavigationItem = ({ imageUrl, name }: NavigationItemProps) => {
    return (
        <>
            <Avatar className="w-12 h-12">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </>
    );
};

export default NavigationItem;
