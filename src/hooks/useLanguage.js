import { useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/index.js'

const STORAGE_KEY = 'ramak-language'

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'ar' ? 'ar' : 'en'
  })

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    document.documentElement.dir = direction
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(() => ({
    language,
    direction: language === 'ar' ? 'rtl' : 'ltr',
    t: translations[language],
    setLanguage,
    toggleLanguage: () => setLanguage((current) => (current === 'en' ? 'ar' : 'en')),
  }), [language])

  return value
}
