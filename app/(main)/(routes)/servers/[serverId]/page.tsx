import React from 'react';

interface ServerIdPageProps {
    params: {
        serverId: string;
    };
}
const ServerIdPage = ({ params }: ServerIdPageProps) => {
    const { serverId } = params;
    return <div>{serverId}</div>;
};

export default ServerIdPage;
