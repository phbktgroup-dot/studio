'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { ReactNode } from 'react';
import Image from 'next/image';

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  industry: z.string().min(1, "Please select an industry"),
  help: z.string().min(10, "Please provide at least 10 characters.").max(1500),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to the processing of your data.",
  }),
  projectName: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function DemoRequestDialog({ children, projectName }: { children: ReactNode, projectName: string }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            industry: "",
            help: "",
            consent: false,
            projectName: projectName,
        },
    });

    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        try {
             const { error } = await supabase.from('inquiries').insert([
                { 
                    name: `${values.firstName} ${values.lastName}`,
                    email: values.email,
                    purpose: 'Demo Request',
                    vision: `Industry: ${values.industry}\nProject: ${values.projectName}\n\n${values.help}`
                }
            ]);

            if (error) throw error;
            
            toast({
                title: "Request Submitted!",
                description: "Thank you for your interest. We will be in touch shortly.",
            });
            form.reset();
            setOpen(false);

        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: "Submission Failed",
                description: error.message || "An unexpected error occurred. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[825px] bg-gray-950 text-white border-gray-800 grid-cols-1 md:grid-cols-2 p-0">
                <div className="p-8 md:p-12 flex flex-col">
                    <DialogHeader className="text-left mb-6">
                        <DialogTitle className="text-sm uppercase tracking-widest text-gray-400">Talk to an expert</DialogTitle>
                        <DialogDescription className="text-xl text-white">
                            To get you in touch with the right person, we just need a few details from you first.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-grow flex flex-col">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400">First name*</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="bg-transparent border-0 border-b border-gray-600 rounded-none focus:ring-0 focus:border-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-400">Last name*</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="bg-transparent border-0 border-b border-gray-600 rounded-none focus:ring-0 focus:border-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-400">Email*</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} className="bg-transparent border-0 border-b border-gray-600 rounded-none focus:ring-0 focus:border-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="industry"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400">Industry</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full bg-transparent border-0 border-b border-gray-600 rounded-none focus:ring-0 focus:border-white">
                                            <SelectValue placeholder="Select an industry" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-gray-900 text-white border-gray-800">
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="finance">Finance</SelectItem>
                                        <SelectItem value="healthcare">Healthcare</SelectItem>
                                        <SelectItem value="retail">Retail</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="help"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-400">How can we help you?*</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} className="bg-transparent border-0 border-b border-gray-600 rounded-none focus:ring-0 focus:border-white min-h-[60px]" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex-grow"></div>
                             <FormField
                                control={form.control}
                                name="consent"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-xs text-gray-400">
                                            I consent to processing of my personal data entered above to get in touch.
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90">
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
                 <div className="hidden md:block relative">
                    <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1770&auto=format&fit=crop" alt="A woman smiling in an office" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            </DialogContent>
        </Dialog>
    );
}