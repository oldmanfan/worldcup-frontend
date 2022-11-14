import React, { useState, useEffect } from 'react';

export interface LocaleContextOptions {
  locale: string;
  fallback: string;
  messages: Record<string, Record<string, string>>,
  changeLocale: (locale: string) => void;
}

export const LocaleContext = React.createContext<LocaleContextOptions>(null!);

export interface LocaleContextWrapperProps {
  locale?: string;
  children?: React.ReactNode;
}

let oldLocale = localStorage.getItem('lang');
if (!oldLocale && navigator.language.indexOf('zh') > -1) {
  oldLocale = 'zh-hk'
}

export default function LocaleContextWrapper(props: LocaleContextWrapperProps) {
  const fallback = 'en-us';
  const [locale, setLocale] = useState(props.locale || oldLocale || fallback);
  const [messages, setMessages] = useState<Record<string, Record<string, string>>>({});

  const changeLocale = (locale: string) => {
    localStorage.setItem('lang', locale);
    setLocale(locale);
  };

  const fetchLocaleMessage = async (locale: string) => {
    console.log('fetchLocaleMessage...', locale);
    if (messages[locale]) {
      return;
    }
    try {
      const res = await import(`../../lang/${locale}.json`);
      // return res.default;
      setMessages({
        ...messages,
        [locale]: res.default,
      });

    } catch (e) {
      console.error('import lang message error:', e);
    }
  };
  useEffect(() => {
    fetchLocaleMessage(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, fallback, changeLocale, messages }}>
      {props.children}
    </LocaleContext.Provider>
  );
};
