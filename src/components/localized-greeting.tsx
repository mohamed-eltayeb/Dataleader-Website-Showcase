'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { generateGreeting, LocalizedGreetingInput } from '@/ai/flows/localized-greeting';
import { Skeleton } from './ui/skeleton';

export default function LocalizedGreeting() {
  const { language } = useLanguage();
  const [greeting, setGreeting] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGreeting() {
      setLoading(true);
      try {
        const input: LocalizedGreetingInput = { language };
        const result = await generateGreeting(input);
        setGreeting(result.greeting);
      } catch (error) {
        console.error("Failed to fetch localized greeting:", error);
        setGreeting(language === 'en' ? 'Welcome!' : 'أهلاً بك!');
      } finally {
        setLoading(false);
      }
    }

    fetchGreeting();
  }, [language]);

  if (loading) {
    return <Skeleton className="h-8 w-64 mx-auto" />;
  }

  return (
    <p className="text-xl md:text-2xl font-semibold text-accent-foreground/80 mb-2 font-headline" lang={language}>
      {greeting}
    </p>
  );
}
