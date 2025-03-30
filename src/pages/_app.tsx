import type { AppProps } from "next/app";
import "@/assets/styles/globals.scss";
import { setupStore } from "@/store/store";
import { Provider } from "react-redux";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tEN from "@/locales/en/translation.json";
import tRU from "@/locales/ru/translation.json";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

const store = setupStore();

const App = ({ Component, pageProps }: AppProps) => {
  const router:NextRouter = useRouter();
  // console.log(router.locale)
  // console.log(localStorage.getItem("lang"))

  // i18n.use(initReactI18next).init({
  //   resources: { en: { translation: tEN }, ru: { translation: tRU } },
  //   lng: router.locale,
  //   // lng: "ru",
  // });

  // useEffect(() => {
  //   if (router.locale) i18n.changeLanguage(router.locale);
  // }, [router.locale]);


  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // После монтирования отмечаем, что компонент отрендерен на клиенте

    i18n.use(initReactI18next).init({
      resources: { en: { translation: tEN }, ru: { translation: tRU } },
      lng: "ru", // Используем дефолтный язык (SSR)
      // lng: router.locale || "en", // Используем дефолтный язык (SSR)
    });

    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("lang");
      console.log(storedLang)
      if (storedLang) {
        i18n.changeLanguage(storedLang);
      }
    }
  }, [router.locale]);

  if (!isClient) {
    return <div>Loading...</div>;
  }


  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
