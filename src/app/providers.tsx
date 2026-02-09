'use client';

import { LanguageProvider } from '@/context/language-provider';
import type { ReactNode } from 'react';
import { LanguageSelector } from '@/components/shared/language-selector';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageSelector />
      {children}
    </LanguageProvider>
  );
}
