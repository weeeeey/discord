import { Server as NetServer } from 'http';
import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';

import { NextApiResponseServerIo } from '@/types';

export const config = {
    api: {
        bodyParser: false,
    },
};
// socket.io 연결
//

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = '/api/socket/io';
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
            // @ts-ignore
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }

    res.end();
};

export default ioHandler;

// Server
// 서버측 구성은 크게 3가지 정도로 나눌 수 있습니다.

// response 타입 설정
// socket.io 연결
// route 연결
