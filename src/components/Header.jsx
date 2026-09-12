import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo.jsx'
import { LanguageSwitcher } from './LanguageSwitcher.jsx'
import { navigation } from '../data/navigation.js'

export function Header({ language, t, onToggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main-content">{t.nav.skip}</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="shell header-inner">
          <Logo compact={scrolled} />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <a key={item.id} href={item.href}>{t.nav[item.id]}</a>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageSwitcher language={language} onToggle={onToggleLanguage} />
            <a className="button button-small button-primary desktop-quote" href="#contact">{t.nav.quote}</a>
            <button
              className="menu-trigger"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={t.nav.menuOpen}
            >
              <Menu size={23} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <>
          <div className="mobile-menu-backdrop is-open" onClick={closeMenu} aria-hidden="true" />
          <aside id="mobile-navigation" className="mobile-menu is-open">
            <div className="mobile-menu-top">
              <Logo />
              <button className="icon-button" type="button" onClick={closeMenu} aria-label={t.nav.menuClose}>
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {navigation.map((item) => (
                <a key={item.id} href={item.href} onClick={closeMenu}>{t.nav[item.id]}</a>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <LanguageSwitcher language={language} onToggle={onToggleLanguage} />
              <a className="button button-primary" href="#contact" onClick={closeMenu}>{t.nav.quote}</a>
            </div>
          </aside>
        </>
      )}
    </>
  )
}
