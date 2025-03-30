import { NextRouter, useRouter } from "next/router";
import i18n from "i18next";
import Link from "next/link";
import routes from "@/data/routes";
import { useTranslation } from "react-i18next";

const LanguageSwitcherPage = () => {
  const router: NextRouter = useRouter();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    router.push(router.asPath, router.asPath, { locale: lang });
  };

  return (
    <div>
      <Link href={routes.index} locale={router.locale}>
        <a>{t("toMainPage")}</a>
      </Link>

      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("ru")}>Русский</button>
    </div>
  );
};

export default LanguageSwitcherPage;