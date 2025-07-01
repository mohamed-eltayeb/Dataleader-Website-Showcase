'use client';

import { useLanguage } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  const { content } = useLanguage();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.about.title}
        </h1>
        <div className="mt-6 space-y-4 text-lg text-muted-foreground">
          <p>{content.about.p1}</p>
          <p>{content.about.p2}</p>
        </div>
      </section>

      <section>
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{content.about.licensesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {content.about.licenses.map((license, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent-foreground me-3" />
                  <span className="text-muted-foreground">{license}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
