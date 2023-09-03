'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FileUpload } from '../file-upload';
import { useModal } from '@/hooks/use-modal-store';

const formSchema = z.object({
    imageUrl: z.string().min(2),
    name: z.string().min(2).max(50),
});

function CreateServerModal() {
    const [isMount, setisMount] = useState(false);
    const { isOpen, type, onClose } = useModal();
    const isModalOpen = isOpen && type == 'createServer';

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: '',
            name: '',
        },
    });
    const isLoading = form.formState.isSubmitting;
    const router = useRouter();

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post('/api/servers', {
                name: values.name,
                imageUrl: values.imageUrl,
            });
            console.log(res);
            toast.success('Created Server');
            router.refresh();
            router.push(
                `/servers/${res.data.id}/channels/${res.data.channels[0].id}`
            );
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            form.reset();
            onClose();
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-full p-0  ">
                <div className="py-8 px-6">
                    <DialogHeader className="flex flex-col space-y-4 mb-4">
                        <DialogTitle>서버 만들기</DialogTitle>
                        <DialogDescription>
                            서버는 나와 친구들이 함께 어울리는 공간입니다. 내
                            서버를 만들고 대화를 시작해보세요.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Server image</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center items-center">
                                                <FileUpload
                                                    endpoint="serverImage"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button disabled={isLoading} type="submit">
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CreateServerModal;
