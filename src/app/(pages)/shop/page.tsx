'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ShopPage() {
  const { content, language } = useLanguage();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);


  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.shop.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.shop.description}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.shop.products.map((product) => (
          <Card key={product.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={product.aiHint}
                />
              </div>
              <div className="p-6">
                <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-end">
               <div className="text-left rtl:text-right">
                <p className="text-sm text-muted-foreground">{content.shop.startingFrom}</p>
                <p className="text-xl font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
              <Button asChild>
                <Link href={`/shop/${product.id}`}>
                  {content.shop.viewDetails} <ArrowRight className="ms-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
