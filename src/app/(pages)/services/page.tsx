'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context';
import {
  Building2,
  Network,
  ShieldCheck,
  MonitorPlay,
  Sun,
} from 'lucide-react';

const serviceIcons: { [key: string]: React.ElementType } = {
  smart: Building2,
  it: Network,
  security: ShieldCheck,
  av: MonitorPlay,
  solar: Sun,
};

export default function ServicesPage() {
  const { content } = useLanguage();

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.services.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.services.description}
        </p>
      </section>

      <section className="space-y-8">
        {content.services.items.map((service) => {
          const Icon = serviceIcons[service.id];
          return (
            <Card key={service.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-primary/20">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 rounded-full p-3">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground ms-16">{service.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
