'use client';

import { useLanguage } from '@/context/language-context';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Bot, Send } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import React, { useState, useEffect, useMemo } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { generateQuote, GenerateQuoteInput } from '@/ai/flows/generate-quote';

type Selections = {
  [key: string]: string | string[];
};

export default function ProductDetailPage() {
  const { content, language } = useLanguage();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const product = content.shop.products.find((p) => p.id === id as string);

  const initialSelections = useMemo(() => {
    if (!product?.options) return {};
    const selections: Selections = {};
    product.options.forEach(option => {
      if (option.type === 'radio') {
        selections[option.id] = option.choices[0].name;
      } else if (option.type === 'checkbox') {
        selections[option.id] = [];
      }
    });
    return selections;
  }, [product]);

  const [selections, setSelections] = useState<Selections>(initialSelections);
  const [totalPrice, setTotalPrice] = useState(product?.price ?? 0);
  const [quote, setQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelections(initialSelections);
  }, [initialSelections]);

  useEffect(() => {
    if (!product) return;
    let newPrice = product.price;
    product.options.forEach(option => {
      const selection = selections[option.id];
      if (option.type === 'radio' && typeof selection === 'string') {
        const choice = option.choices.find(c => c.name === selection);
        if (choice) newPrice += choice.priceModifier;
      } else if (option.type === 'checkbox' && Array.isArray(selection)) {
        selection.forEach(selectedName => {
          const choice = option.choices.find(c => c.name === selectedName);
          if (choice) newPrice += choice.priceModifier;
        });
      }
    });
    setTotalPrice(newPrice);
    setQuote(null); // Reset quote when options change
  }, [selections, product]);

  if (!product) {
    notFound();
  }

  const handleRadioChange = (optionId: string, value: string) => {
    setSelections(prev => ({ ...prev, [optionId]: value }));
  };

  const handleCheckboxChange = (optionId: string, choiceName: string, checked: boolean) => {
    setSelections(prev => {
      const currentSelection = (prev[optionId] as string[]) || [];
      const newSelection = checked
        ? [...currentSelection, choiceName]
        : currentSelection.filter(name => name !== choiceName);
      return { ...prev, [optionId]: newSelection };
    });
  };

  const handleGenerateQuote = async () => {
    setIsLoading(true);
    setQuote(null);
    try {
      const formattedSelections = product.options.map(option => {
        const selection = selections[option.id];
        return {
          label: option.label,
          choice: Array.isArray(selection) ? selection.join(', ') || 'None' : selection as string,
        };
      });

      const input: GenerateQuoteInput = {
        productName: product.name,
        language,
        selections: formattedSelections,
        basePrice: product.price,
        totalPrice,
      };
      
      const result = await generateQuote(input);
      setQuote(result.summary);
      toast({
        title: content.shop.quoteGenerated,
        description: product.name,
      });
    } catch (error) {
      console.error("Failed to generate quote:", error);
      toast({
        title: content.contact.form.error,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendForReview = () => {
    toast({
      title: content.shop.quoteSent,
      description: `Your configuration for ${product.name} is on its way to our team.`,
    });
  };

  const formatPrice = (price: number) => 
    new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', { 
      style: 'currency', 
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/shop">
          <ArrowLeft className="me-2" />
          {content.shop.backToShop}
        </Link>
      </Button>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Configurator Column */}
        <div className="md:col-span-3 space-y-6">
            <Card className="shadow-lg border-primary/20">
                 <CardHeader>
                    <CardTitle className="font-headline text-3xl">{product.name}</CardTitle>
                 </CardHeader>
                 <CardContent>
                    <p className="text-base text-muted-foreground">{product.longDescription}</p>
                 </CardContent>
            </Card>

            <Card className="shadow-lg border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{content.shop.configure} {product.name}</CardTitle>
                    <p className="text-muted-foreground">{content.shop.quotePrompt}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {product.options?.map((option, index) => (
                        <React.Fragment key={option.id}>
                            {index > 0 && <Separator />}
                            <div className="space-y-4">
                                <Label className="text-lg font-semibold">{option.label}</Label>
                                {option.type === 'radio' && (
                                    <RadioGroup value={selections[option.id] as string} onValueChange={(value) => handleRadioChange(option.id, value)}>
                                        {option.choices.map(choice => (
                                            <div key={choice.name} className="flex items-center space-x-2 rtl:space-x-reverse">
                                                <RadioGroupItem value={choice.name} id={`${option.id}-${choice.name}`} />
                                                <Label htmlFor={`${option.id}-${choice.name}`} className="flex-grow cursor-pointer">{choice.name}</Label>
                                                <span className="text-sm text-muted-foreground">(+{formatPrice(choice.priceModifier)})</span>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                                {option.type === 'checkbox' && (
                                    <div className="space-y-2">
                                    {option.choices.map(choice => (
                                        <div key={choice.name} className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <Checkbox 
                                                id={`${option.id}-${choice.name}`} 
                                                checked={(selections[option.id] as string[]).includes(choice.name)}
                                                onCheckedChange={(checked) => handleCheckboxChange(option.id, choice.name, !!checked)}
                                            />
                                            <Label htmlFor={`${option.id}-${choice.name}`} className="flex-grow cursor-pointer">{choice.name}</Label>
                                            <span className="text-sm text-muted-foreground">(+{formatPrice(choice.priceModifier)})</span>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </CardContent>
                <CardFooter>
                     <Button size="lg" className="w-full" onClick={handleGenerateQuote} disabled={isLoading}>
                        <Bot className="me-2" /> {isLoading ? content.shop.generatingQuote : content.shop.generateQuote}
                    </Button>
                </CardFooter>
            </Card>
        </div>

        {/* Quotation Column */}
        <div className="md:col-span-2 sticky top-24 self-start">
          <Card className="shadow-xl border-primary/20">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{content.shop.yourQuote}</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[200px]">
              {isLoading && (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              )}
              {!isLoading && quote && (
                <div className="prose prose-sm dark:prose-invert text-muted-foreground" dangerouslySetInnerHTML={{ __html: quote.replace(/\n/g, '<br />') }} />
              )}
               {!isLoading && !quote && (
                <p className="text-muted-foreground">{content.shop.quotePrompt}</p>
              )}
            </CardContent>
            <Separator/>
            <CardFooter className="flex-col items-start gap-4 pt-6">
                <div className='w-full'>
                    <p className="text-muted-foreground">{content.shop.estimatedPrice}</p>
                    <p className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</p>
                </div>
              <Button size="lg" className="w-full" onClick={handleSendForReview} disabled={!quote || isLoading}>
                <Send className="me-2" /> {content.shop.sendForReview}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
