'use client';

import { useLanguage } from '@/context/language-context';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage() {
  const { content } = useLanguage();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const product = content.shop.products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    toast({
      title: content.shop.itemAddedToCart,
      description: `${product.name}`,
    });
  };

  return (
    <div>
       <Button asChild variant="ghost" className="mb-8">
        <Link href="/shop">
          <ArrowLeft className="me-2" />
          {content.shop.backToShop}
        </Link>
      </Button>
      <Card className="shadow-lg border-primary/20 overflow-hidden">
        <div className="grid md:grid-cols-2">
            <div className="relative h-80 md:h-full w-full min-h-[300px]">
            <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint={product.aiHint}
            />
            </div>
            <div className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">{product.name}</CardTitle>
                    <p className="text-2xl font-bold text-primary pt-2">{product.price}</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                    <p className="text-base text-muted-foreground">{product.longDescription}</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button size="lg" className="w-full" onClick={handleAddToCart}>
                        <ShoppingCart className="me-2" /> {content.shop.addToCart}
                    </Button>
                </div>
            </div>
        </div>
      </Card>
    </div>
  );
}
