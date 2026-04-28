"use client";

import { useEffect, type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/client";
import { defaultLanguage } from "@/i18n/resources";

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      void i18n.changeLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const syncLanguage = (language: string) => {
      const normalized = language || defaultLanguage;
      document.documentElement.lang = normalized;
      window.localStorage.setItem("language", normalized);
    };

    syncLanguage(i18n.resolvedLanguage ?? i18n.language);
    i18n.on("languageChanged", syncLanguage);

    return () => {
      i18n.off("languageChanged", syncLanguage);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
