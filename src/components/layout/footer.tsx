'use client';
import { useLanguage } from '@/context/language-context';

export function Footer() {
  const { content } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
        <p>
          © {currentYear} {content.brand.name} ({content.brand.name_ar}). {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
