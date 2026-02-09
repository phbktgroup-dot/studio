'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from '@/context/language-provider';
import { useEffect, useState } from 'react';

type Language = 'en' | 'mr' | 'hi';

export function LanguageSelector() {
  const { setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('phbkt_lang');
    if (!storedLang) {
      setIsOpen(true);
    }
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent 
        className="sm:max-w-[425px]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        hideCloseButton
      >
        <DialogHeader>
          <div className="flex justify-center mb-4">
              <Logo className="h-[58px]" />
          </div>
          <DialogTitle className="text-center text-2xl font-headline">Choose Your Language</DialogTitle>
          <DialogDescription className="text-center">
            Select your preferred language to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2 pt-4">
          <Button onClick={() => handleSelectLanguage('en')} size="lg">English</Button>
          <Button onClick={() => handleSelectLanguage('mr')} size="lg">मराठी</Button>
          <Button onClick={() => handleSelectLanguage('hi')} size="lg">हिंदी</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
