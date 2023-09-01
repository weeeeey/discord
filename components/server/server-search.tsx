import React from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

const ServerSearch = () => {
    return (
        <div className="relative">
            <Input
                placeholder="검색하기"
                className="h-7 w-32 md:focus:w-48  duration-200 outline-none "
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-[23%] right-2 " />
        </div>
    );
};

export default ServerSearch;
