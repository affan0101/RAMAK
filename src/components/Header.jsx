import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo.jsx'
import { LanguageSwitcher } from './LanguageSwitcher.jsx'
import { navigation } from '../data/navigation.js'
import { Dialog } from './Dialog.jsx'

export function Header({ language, t, onToggleLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 })
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const closeMenu = () => setMenuOpen(false)
  return <>
    <a className="skip-link" href="#main-content">{t.nav.skip}</a>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell header-inner">
        <Logo t={t} />
        <nav className="desktop-nav" aria-label={t.nav.primaryLabel}>{navigation.map((item) =>
          <a key={item.id} href={item.href} aria-current={active === item.href.slice(1) ? 'location' : undefined}>{t.nav[item.id]}</a>
        )}</nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onToggle={onToggleLanguage} />
          <a className="button button-small button-primary desktop-quote" href="#contact">{t.nav.quote}</a>
          <button className="menu-trigger" type="button" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen}
            aria-controls={menuOpen ? 'mobile-navigation' : undefined} aria-label={t.nav.menuOpen}><Menu size={23} aria-hidden="true" /></button>
        </div>
      </div>
    </header>
    {menuOpen && <Dialog onClose={closeMenu} label={t.nav.mobileLabel} className="drawer-layer">
      <aside id="mobile-navigation" className="mobile-menu">
        <div className="mobile-menu-top"><div onClick={closeMenu}><Logo t={t} /></div><button className="icon-button" type="button" onClick={closeMenu} aria-label={t.nav.menuClose}><X size={24} aria-hidden="true" /></button></div>
        <nav aria-label={t.nav.mobileLabel}>{navigation.map((item) => <a key={item.id} href={item.href} onClick={closeMenu}>{t.nav[item.id]}</a>)}</nav>
        <div className="mobile-menu-actions"><LanguageSwitcher language={language} onToggle={onToggleLanguage} /><a className="button button-primary" href="#contact" onClick={closeMenu}>{t.nav.quote}</a></div>
      </aside>
    </Dialog>}
  </>
}
