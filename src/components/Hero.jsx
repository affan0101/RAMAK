import { ArrowDownRight, ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { company } from '../data/company.js'
import { imagery } from '../data/images.js'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { DemoContactButton } from './DemoContactButton.jsx'

export function Hero({ t }) {
  return <section id="home" className="hero section-navy">
    <div className="hero-background">
      <ResponsiveImage {...imagery.hero} alt={t.hero.alt} priority sizes="(max-width: 999px) 1320px, 100vw" />
    </div>
    <div className="hero-background-overlay" aria-hidden="true" />
    <div className="shell hero-layout">
      <div className="hero-copy">
        <span className="eyebrow eyebrow-light hero-enter">{t.hero.eyebrow}</span>
        <h1 className="hero-enter">{t.hero.titleMain}<span>{t.hero.titleAccent}</span></h1>
        <p className="hero-lead hero-enter">{t.hero.body}</p>
        <div className="hero-actions hero-enter">
          <a className="button button-primary button-large" href="#contact">{t.hero.primary}<ArrowUpRight className="directional-icon" size={20} aria-hidden="true" /></a>
          <a className="button button-ghost button-large" href="#services">{t.hero.secondary}<ArrowDownRight className="directional-icon" size={18} aria-hidden="true" /></a>
        </div>
        <div className="hero-meta hero-enter">
          <span><MapPin size={16} aria-hidden="true" />{t.common.location}</span>
          <span className="hero-established">{t.common.established}</span>
          <DemoContactButton t={t}><Phone size={15} aria-hidden="true" />{t.hero.call}</DemoContactButton>
        </div>
      </div>
    </div>
    <div className="shell hero-bottom"><span>{t.about.licenceLabel} <bdi>{company.verified.licenceNumber}</bdi><span className="hero-bottom-separator" aria-hidden="true">/</span>{t.hero.badgeTitle}</span><div className="hero-bottom-actions"><span className="image-disclosure">{t.common.aiImage}</span><a href="#about">{t.hero.scrollLabel}<ArrowDownRight size={15} className="directional-icon" aria-hidden="true" /></a></div></div>
  </section>
}
