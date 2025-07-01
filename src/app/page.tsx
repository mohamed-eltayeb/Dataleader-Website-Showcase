'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import {
  Building2,
  Network,
  ShieldCheck,
  MonitorPlay,
  Sun,
  ArrowRight,
  Quote,
} from 'lucide-react';
import Link from 'next/link';
import LocalizedGreeting from '@/components/localized-greeting';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const serviceIcons: { [key: string]: React.ElementType } = {
  smart: Building2,
  it: Network,
  security: ShieldCheck,
  av: MonitorPlay,
  solar: Sun,
};

export default function Home() {
  const { content } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <LocalizedGreeting />
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mt-4">
            {content.hero.headline}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            {content.hero.subheadline}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">
              {content.hero.cta} <ArrowRight className="ms-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="services" className="py-12 md:py-20 bg-secondary/50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">
            {content.services.title}
          </h2>
          <p className="mt-4 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
            {content.services.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {content.services.items.map((service) => {
              const Icon = serviceIcons[service.id];
              return (
                <Card key={service.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20 bg-background">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="font-headline pt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 md:py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-headline">
          {content.testimonials.title}
        </h2>
        <p className="mt-4 text-lg text-center text-muted-foreground max-w-2xl mx-auto">
         {content.testimonials.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {content.testimonials.items.map((testimonial, index) => (
            <Card key={index} className="flex flex-col justify-between shadow-lg border-primary/20">
              <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex items-start">
                  <Quote className="h-8 w-8 text-primary/30 me-2 flex-shrink-0" />
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
