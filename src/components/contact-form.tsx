'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from './ui/card';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const { content, language } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: language === 'en' ? 'Name must be at least 2 characters.' : 'يجب أن يتكون الاسم من حرفين على الأقل.',
    }),
    email: z.string().email({
        message: language === 'en' ? 'Please enter a valid email address.' : 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
    }),
    subject: z.string().min(5, {
        message: language === 'en' ? 'Subject must be at least 5 characters.' : 'يجب أن يتكون الموضوع من 5 أحرف على الأقل.',
    }),
    message: z.string().min(10, {
        message: language === 'en' ? 'Message must be at least 10 characters.' : 'يجب أن تتكون الرسالة من 10 أحرف على الأقل.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: content.contact.form.success,
        variant: "default",
    })
    form.reset();
  }

  return (
    <Card className="shadow-lg border-primary/20">
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.contact.form.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.contact.form.name} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.contact.form.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.contact.form.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.contact.form.subject}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.contact.form.subject} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.contact.form.message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={content.contact.form.message}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {content.contact.form.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
