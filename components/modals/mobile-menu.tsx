'use client';
import { useModal } from '@/hooks/use-modal-store';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import NavigationSidebar from '../navigation/navigation-sidebar';

// 모달로 좌 서버 목록/ 우 채널 목록
const MobileMenu = () => {
    // data 는 서버
    const { isOpen, data, type, onClose } = useModal();
    const isModalOpen = isOpen && type === 'mobile';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="h-full w-full">
                <DialogHeader>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default MobileMenu;
