import { useContext, useEffect } from "react";
import type { LocaleContextOptions } from '../context/locale';
import { LocaleContext } from "../context/locale";
// import en_us from "../lang/en-us.json";
// import {  useParams } from "react-router-dom";

export default function useTranslation() {
  const { locale, fallback, changeLocale, messages } = useContext<LocaleContextOptions>(LocaleContext);
  // const { lang } = useParams();

  // useEffect(() => {
  //   if (lang) {
  //     console.log('useEffect lang==', lang);
  //     changeLocale(lang);
  //   }
  // }, [lang]);


  return {
    locale,
    $t: (langKey: string) => {
      const key = langKey.replace(/^{#|#}$/g, '');
      return messages[locale]?.[key] || messages[fallback]?.[key] || key;
    },
    changeLocale: async (locale: string) => {
      changeLocale(locale);
    }
  }
}
