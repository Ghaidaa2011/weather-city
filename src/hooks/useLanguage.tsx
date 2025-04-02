import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment/min/moment-with-locales";

const useLanguage = () => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");
  const changeLanguageHandler = () => {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar-ly");
    }
  };
  useEffect(() => {
    i18n.changeLanguage("ar");
    moment.locale("ar-ly");
  }, [i18n]);
  return { changeLanguageHandler, locale };
};
export default useLanguage;
