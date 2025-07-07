'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Bot, FileText, Lightbulb, PackageCheck } from 'lucide-react';
import { content as staticContent } from '@/lib/content';
import { parseRfq, ParseRfqOutput } from '@/ai/flows/parse-rfq-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function RfqParserPage() {
  const { content, language } = useLanguage();
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<ParseRfqOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    rfqText: z.string().min(50, {
      message: language === 'en' ? 'RFQ text must be at least 50 characters.' : 'يجب أن يتكون نص طلب عرض السعر من 50 حرفًا على الأقل.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rfqText: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysis(null);
    try {
      const result = await parseRfq({
        rfqText: values.rfqText,
        availableProducts: JSON.stringify(staticContent.en.shop.products.map(p => ({ name: p.name, description: p.longDescription }))),
      });
      setAnalysis(result);
      toast({
        title: content.rfqParser.form.success,
      });
    } catch (error) {
      console.error("Failed to parse RFQ:", error);
      toast({
        title: content.contact.form.error,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.rfqParser.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.rfqParser.description}
        </p>
      </section>

      <section>
        <Card className="shadow-lg border-primary/20">
          <CardContent className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="rfqText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content.rfqParser.form.label}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={content.rfqParser.form.placeholder}
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  <Bot className="me-2" />
                  {isLoading ? content.rfqParser.form.loading : content.rfqParser.form.submit}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      {(isLoading || analysis) && (
        <section className="space-y-8">
            <Separator />
            <h2 className="text-3xl font-bold font-headline text-center">{content.rfqParser.results.title}</h2>
          {isLoading && <AnalysisSkeleton />}
          {analysis && (
            <div className="grid md:grid-cols-2 gap-8">
                {/* Column 1: Product Matches & Requirements */}
                <div className="space-y-8">
                    <Card className="shadow-lg">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <PackageCheck className="w-8 h-8 text-primary"/>
                            <CardTitle className="font-headline text-2xl">{content.rfqParser.results.matches}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analysis.productMatches.length > 0 ? (
                                analysis.productMatches.map((match, index) => (
                                <div key={index} className="p-4 rounded-md border bg-secondary/50">
                                    <h3 className="font-semibold text-primary">{match.productName}</h3>
                                    <p className="text-sm text-muted-foreground">{match.relevance}</p>
                                </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">{content.rfqParser.results.noMatches}</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <Lightbulb className="w-8 h-8 text-primary"/>
                            <CardTitle className="font-headline text-2xl">{content.rfqParser.results.requirements}</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                             {analysis.extractedRequirements.map((req, index) => (
                                <li key={index}><strong>{req.requirement}:</strong> {req.detail}</li>
                             ))}
                           </ul>
                        </CardContent>
                    </Card>
                </div>
                 {/* Column 2: Cleaned RFQ */}
                <div className="sticky top-24 self-start">
                    <Card className="shadow-xl">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <FileText className="w-8 h-8 text-primary"/>
                            <CardTitle className="font-headline text-2xl">{content.rfqParser.results.summary}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div 
                                className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap"
                            >
                                {analysis.cleanedRfq}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

const AnalysisSkeleton = () => (
    <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
            <Card>
                <CardHeader><Skeleton className="h-8 w-48" /></CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-8 w-56" /></CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </CardContent>
            </Card>
        </div>
        <div className="sticky top-24 self-start">
             <Card>
                <CardHeader><Skeleton className="h-8 w-40" /></CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </CardContent>
            </Card>
        </div>
    </div>
)
