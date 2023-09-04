import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { Server, Member, Profile } from '@prisma/client';

export type ServerWithMembersWithProfiles = Server & {
    members: (Member & { profile: Profile })[];
};

// response 타입 설정
export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};

// Server
// 서버측 구성은 크게 3가지 정도로 나눌 수 있습니다.

// response 타입 설정
// socket.io 연결
// route 연결
