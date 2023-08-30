'use client';
import { useModal } from '@/hooks/use-modal-store';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

import { FileUpload } from '../file-upload';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(2).max(50),
    type: z.string({
        required_error: 'Please select an Type for Channel.',
    }),
});

const CreateChannel = () => {
    const { isOpen, onClose, data, type } = useModal();
    const isModalOpen = isOpen && type === 'createChannel';
    const [isMount, setisMount] = useState(false);
    const router = useRouter();
    const params = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: data.channelType,
            name: '',
        },
    });
    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        setisMount(true);
    }, []);
    if (!isMount) {
        return null;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.post('/api/channels', {
                name: values.name,
                type: values.type,
                serverId: params.serverId,
            });
            form.reset();
            toast.success('Created Channel');
            router.refresh();
            window.location.reload();
        } catch (error) {
            toast.error('Something went wrong');
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="flex flex-col w-full p-0  ">
                <div className="py-8 px-6">
                    <DialogHeader className="flex flex-col space-y-8 mb-4">
                        <DialogTitle className="text-2xl">
                            Create Channel
                        </DialogTitle>
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
                                            <FormLabel>channel name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="write a name"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>channel type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue
                                                            placeholder={
                                                                data.channelType
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="TEXT">
                                                        TEXT
                                                    </SelectItem>
                                                    <SelectItem value="AUDIO">
                                                        AUDIO
                                                    </SelectItem>
                                                    <SelectItem value="VIDEO">
                                                        VIDEO
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

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
                    </DialogHeader>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateChannel;
