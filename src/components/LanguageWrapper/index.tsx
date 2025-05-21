import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tEN from "@/locales/en/translation.json";
import tRU from "@/locales/ru/translation.json";

interface LanguageWrapperProps {
  children: React.ReactNode;
}

export const LanguageWrapper = ({ children }: LanguageWrapperProps) => {
  useEffect(() => {
    // Инициализируем i18n один раз
    if (!i18n.isInitialized) {
      i18n.use(initReactI18next).init({
        resources: {
          en: { translation: tEN },
          ru: { translation: tRU },
        },
        lng: "ru", // дефолтный язык
        fallbackLng: "ru",
        interpolation: {
          escapeValue: false,
        },
      });
    }

    // Проверяем localStorage и меняем язык, если он там указан
    const storedLang = localStorage.getItem("lang");
    if (storedLang && i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }
  }, []);

  return <>{children}</>;
};