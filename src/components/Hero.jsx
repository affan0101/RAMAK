import { ArrowDownRight, ArrowUpRight, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { company } from '../data/company.js'
import { imagery } from '../data/images.js'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { DemoContactButton } from './DemoContactButton.jsx'

export function Hero({ t }) {
  return <section id="home" className="hero section-navy">
    <div className="hero-grid-pattern" aria-hidden="true" />
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
          <span><ShieldCheck size={16} aria-hidden="true" />{t.common.established}</span>
          <DemoContactButton t={t}><Phone size={15} aria-hidden="true" />{t.hero.call}</DemoContactButton>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-image-frame">
          <ResponsiveImage {...imagery.hero} alt={t.hero.alt} priority sizes="(max-width: 699px) 140vw, (max-width: 999px) 100vw, 60vw" />
          <div className="hero-image-overlay" aria-hidden="true" />
          <div className="hero-photo-caption"><span className="photo-caption-line" />{t.hero.visualCaption}</div>
          <span className="image-disclosure">{t.common.aiImage}</span>
        </div>
        <svg className="hero-circuit" viewBox="0 0 600 650" fill="none" aria-hidden="true"><path d="M40 12H390L440 62H575V470L550 495V630H310" /><circle cx="40" cy="12" r="4" /><circle cx="310" cy="630" r="4" /></svg>
        <div className="hero-activity-card"><span className="activity-icon"><ShieldCheck size={25} aria-hidden="true" /></span><div><strong>{t.hero.badgeTitle}</strong><span>{t.hero.badgeText}</span></div></div>
        <div className="hero-licence-chip"><span className="status-dot" /><bdi>{company.verified.licenceNumber}</bdi></div>
      </div>
    </div>
    <div className="shell hero-bottom"><span>{t.hero.bottomNote}</span><a href="#about">{t.hero.scrollLabel}<ArrowDownRight size={17} className="directional-icon" aria-hidden="true" /></a></div>
  </section>
}
