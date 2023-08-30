'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';

function InviteServerModal() {
    const [isMount, setisMount] = useState(false);
    const { isOpen, type, data, onClose } = useModal();
    const isModalOpen = isOpen && type == 'invite';
    const router = useRouter();

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-full p-0  ">
                <div className="py-8 px-6">
                    <DialogHeader className="flex flex-col space-y-4 mb-4">
                        <DialogTitle>
                            친구를 {data.server?.name}으로 초대하기
                        </DialogTitle>
                        <DialogDescription>
                            서버는 나와 친구들이 함께 어울리는 공간입니다. 내
                            서버를 만들고 대화를 시작해보세요.
                        </DialogDescription>
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default InviteServerModal;
