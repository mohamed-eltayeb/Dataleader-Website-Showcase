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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function SupportForm() {
  const { content, language } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: language === 'en' ? 'Name must be at least 2 characters.' : 'يجب أن يتكون الاسم من حرفين على الأقل.',
    }),
    email: z.string().email({
        message: language === 'en' ? 'Please enter a valid email address.' : 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
    }),
    product: z.string({
        required_error: language === 'en' ? 'Please select a product or service.' : 'الرجاء اختيار منتج أو خدمة.',
    }),
    issue: z.string().min(10, {
        message: language === 'en' ? 'Your description must be at least 10 characters.' : 'يجب أن يتكون الوصف من 10 أحرف على الأقل.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      issue: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: content.support.form.success,
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
                  <FormLabel>{content.support.form.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.support.form.name} {...field} />
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
                  <FormLabel>{content.support.form.email}</FormLabel>
                  <FormControl>
                    <Input placeholder={content.support.form.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.support.form.product}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={language === 'en' ? 'Select a service' : 'اختر خدمة'} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {content.services.items.map(item => (
                                <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{content.support.form.issue}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={content.support.form.issue}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {content.support.form.submit}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
