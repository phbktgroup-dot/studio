'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { useLanguage } from '@/context/language-provider';

type Language = 'en' | 'mr' | 'hi';

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    const languageSelected = localStorage.getItem('language_selected');
    if (!languageSelected) {
      setIsOpen(true);
    }
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language_selected', 'true');
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
