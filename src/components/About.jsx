import { Check, ArrowUpRight } from 'lucide-react'
import { company } from '../data/company.js'
import { imagery } from '../data/images.js'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { SectionHeading } from './SectionHeading.jsx'
export function About({ t }) {
  return <section id="about" className="section section-white"><div className="shell split-layout">
    <div className="about-visual" data-reveal>
      <div className="image-card"><ResponsiveImage {...imagery.residential} alt={t.about.imageAlt} sizes="(max-width: 699px) 130vw, (max-width: 999px) 100vw, 65vw" /></div>
      <div className="about-detail-photo"><ResponsiveImage {...imagery.maintenance} alt={t.services.items.preventiveMaintenance.title} sizes="(max-width: 700px) 35vw, 18vw" /></div>
      <div className="licence-card"><strong>{company.verified.establishmentYear}</strong><span>{t.common.established}</span></div>
    </div>
    <div className="about-copy"><SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} /><p>{t.about.body1}</p><p>{t.about.body2}</p>
      <div className="check-grid">{t.about.points.map((point) => <span key={point}><Check size={16} aria-hidden="true" />{point}</span>)}</div>
      <a className="button button-dark about-cta" href="#services">{t.hero.secondary}<ArrowUpRight size={19} className="directional-icon" aria-hidden="true" /></a>
    </div>
  </div></section>
}
