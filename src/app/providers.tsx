'use client';

import { LanguageProvider } from '@/context/language-provider';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
