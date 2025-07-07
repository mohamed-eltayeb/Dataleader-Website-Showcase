'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/language-context';
import { cn } from '@/lib/utils';
import { LanguageToggle } from '@/components/language-toggle';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState } from 'react';

export function Header() {
  const { content } = useLanguage();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: content.nav.home },
    { href: '/services', label: content.nav.services },
    { href: '/shop', label: content.nav.shop },
    { href: '/about', label: content.nav.about },
    { href: '/support', label: content.nav.support },
    { href: '/rfq-parser', label: content.nav.rfqParser },
  ];

  const NavItems = ({ isMobile }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile && setMobileMenuOpen(false)}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground',
            isMobile && 'block p-4 text-lg'
          )}
        >
          {link.label}
        </Link>
      ))}
      <Button asChild className={cn(isMobile && 'w-full mt-4')} onClick={() => isMobile && setMobileMenuOpen(false)}>
        <Link href="/contact">{content.nav.contact}</Link>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="me-auto flex items-center">
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Logo />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium rtl:space-x-reverse">
          <NavItems />
        </nav>
        <div className="ms-6 hidden md:block">
          <LanguageToggle />
        </div>
        <div className="md:hidden ms-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col items-start pt-10">
                <NavItems isMobile />
                <div className="mt-6 w-full">
                  <LanguageToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
