
'use client';

import { useLanguage } from '@/context/language-context';
import { useEffect } from 'react';

/**
 * This component is responsible for setting the lang and dir attributes on the html element.
 * It's separated from the provider to avoid hydration errors, as these attributes
 * should only be updated on the client after the initial render.
 */
export function LanguageDirection() {
  const { language, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return null; // This component doesn't render anything
}
