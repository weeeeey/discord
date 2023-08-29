'use client';
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

import axios from 'axios';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    imageUrl: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
});

function InitialModal() {
    const [isMount, setisMount] = useState(false);
    const [isopen, setIsopen] = useState(true);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: '',
            name: '',
        },
    });
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
            toast.success('Created Server');
            setIsopen(false);
            router.push(`/servers/${res.data.id}`);
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsopen(false);
        }
    }

    return (
        <Dialog open={false}>
            <DialogContent className=" flex w-full p-0">
                <div className="w-1/2 h-auto relative">
                    <Image src="/placeholder.jpg" fill alt="bg" />
                </div>
                <div className="p-6">
                    <DialogHeader className="flex flex-col space-y-4 mb-8">
                        <DialogTitle>내 첫 Discord 서버 만들기</DialogTitle>
                        <DialogDescription>
                            서버는 나와 친구들이 함께 어울리는 공간입니다. 내
                            서버를 만들고 대화를 시작해보세요.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
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
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default InitialModal;
