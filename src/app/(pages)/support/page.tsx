'use client';
import { SupportForm } from '@/components/support-form';
import { useLanguage } from '@/context/language-context';

export default function SupportPage() {
  const { content } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.support.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {content.support.description}
        </p>
      </div>
      <SupportForm />
    </div>
  );
}
