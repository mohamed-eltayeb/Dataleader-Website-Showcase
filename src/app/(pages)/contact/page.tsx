'use client';
import { ContactForm } from '@/components/contact-form';
import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { content } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          {content.contact.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {content.contact.description}
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
