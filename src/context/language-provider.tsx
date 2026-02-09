'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageSelected, setIsLanguageSelected] = useState(true);

  useEffect(() => {
    const storedLang = localStorage.getItem('phbkt_lang');
    if (storedLang) {
      setLanguage(storedLang as Language);
      setIsLanguageSelected(true);
    } else {
      setIsLanguageSelected(false);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('phbkt_lang', lang);
    setIsLanguageSelected(true);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, isLanguageSelected }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
