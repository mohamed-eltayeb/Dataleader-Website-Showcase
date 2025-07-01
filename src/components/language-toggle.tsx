'use client';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/language-context';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex w-full items-center rounded-md border p-1">
      <Button
        variant={language === 'en' ? 'secondary' : 'ghost'}
        className="w-full"
        onClick={() => setLanguage('en')}
      >
        English
      </Button>
      <Button
        variant={language === 'ar' ? 'secondary' : 'ghost'}
        className="w-full"
        onClick={() => setLanguage('ar')}
      >
        العربية
      </Button>
    </div>
  );
}
