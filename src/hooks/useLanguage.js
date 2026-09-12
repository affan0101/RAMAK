import { useEffect, useMemo, useState } from 'react'
import { translations } from '../i18n/index.js'

const STORAGE_KEY = 'ramak-language'

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    try { return window.localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en' } catch { return 'en' }
  })

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    document.documentElement.dir = direction
    try { window.localStorage.setItem(STORAGE_KEY, language) } catch { /* Keep toggling usable if storage is blocked. */ }
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
