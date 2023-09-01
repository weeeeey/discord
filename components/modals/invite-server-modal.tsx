'use client';
import { useEffect, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';
import { Input } from '../ui/input';
import { toast } from 'react-hot-toast';

function InviteServerModal() {
    const [isMount, setisMount] = useState(false);
    const { isOpen, type, data, onClose } = useModal();
    const isModalOpen = isOpen && type == 'invite';

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }
    const inviteUrl = `${window.location.origin}/invite/${data.server?.inviteCode}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(inviteUrl);
            toast.success('초대 코드 복사');
        } catch (error) {
            toast.error('something went wrong');
        }
    };
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
                <DialogFooter className="w-full relative p-3">
                    <Input disabled value={inviteUrl} />
                    <button
                        onClick={copyToClipboard}
                        className="absolute bottom-5 right-5 bg-blue-400 hover:bg-blue-500 px-5 rounded-lg"
                    >
                        복사
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default InviteServerModal;
