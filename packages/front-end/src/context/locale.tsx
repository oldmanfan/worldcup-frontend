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

export default function LocaleContextWrapper(props: LocaleContextWrapperProps) {
  const fallback = 'en-us';
  const [locale, setLocale] = useState(props.locale || fallback);
  const [messages, setMessages] = useState<Record<string, Record<string, string>>>({});

  const changeLocale = (locale: string) => {
    setLocale(locale);
  };

  const fetchLocaleMessage = async (locale: string) => {
    console.log('fetchLocaleMessage...');
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
    fetchLocaleMessage(fallback);
  }, [fallback]);

  useEffect(() => {
    // console.log('useEffect...');
    // fetchLocaleMessage(locale).then((messages) => addMessage(locale, messages)).catch();
    if (fallback !== locale) {
      fetchLocaleMessage(locale);
    }
  }, [locale, fallback]);
  return (
    <LocaleContext.Provider value={{ locale, fallback, changeLocale, messages }}>
      {props.children}
    </LocaleContext.Provider>
  );
};
