import { Check, FileText } from 'lucide-react'
import { company } from '../data/company.js'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { SectionHeading } from './SectionHeading.jsx'
export function About({t}){return <section id="about" className="section section-white"><div className="shell split-layout"><div className="about-visual" data-reveal><div className="image-card"><ResponsiveImage alt={t.about.imageAlt}/></div><div className="licence-card"><FileText size={24}/><div><span>{t.about.licenceLabel}</span><strong>{company.verified.licenceNumber}</strong><small>{t.about.activityLabel}: {company.verified.licensedActivity}</small></div></div></div><div className="about-copy"><SectionHeading eyebrow={t.about.eyebrow} title={t.about.title}/><p>{t.about.body1}</p><p>{t.about.body2}</p><div className="check-grid">{t.about.points.map(x=><span key={x}><Check size={16}/>{x}</span>)}</div></div></div></section>}
