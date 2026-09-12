import { Languages } from 'lucide-react'
export function LanguageSwitcher({ language, onToggle, compact = false }) { return <button className="language-switcher" type="button" onClick={onToggle} aria-label={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}><Languages size={17} aria-hidden="true" />{!compact && <span>{language === 'en' ? 'العربية' : 'English'}</span>}</button> }
