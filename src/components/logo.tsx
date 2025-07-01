'use client';
import { useLanguage } from '@/context/language-context';

export function Logo() {
  const { content, dir } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <div className="p-1 rounded-md bg-primary text-primary-foreground">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12.5 22h-1a2 2 0 0 1-2-2v-6.32a2.3 2.3 0 0 0-.62-1.6L5.61 8.52A2 2 0 0 1 5 7.15V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.15a2 2 0 0 1-.61 1.38l-3.27 3.56a2.3 2.3 0 0 0-.62 1.6V20a2 2 0 0 1-2 2Z" />
          <path d="M16 8h.01" />
          <path d="M12 8h.01" />
          <path d="M8 8h.01" />
          <path d="M12 12h.01" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold font-headline text-lg leading-tight text-primary">
          {content.brand.name}
        </span>
        <span className="font-normal text-xs text-muted-foreground leading-tight">
          {content.brand.name_ar}
        </span>
      </div>
    </div>
  );
}
