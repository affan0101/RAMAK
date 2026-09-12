import { CheckCircle2, Clock, Home, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react'
import { company } from '../data/company.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'
const icons=[ShieldCheck,MessageCircle,Home,Clock,Sparkles,CheckCircle2]
export function WhyRamak({t}){return <section id="why-ramak" className="section section-navy why-section"><div className="shell"><SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} body={t.why.note} invert/><div className="why-layout"><div className="why-grid">{company.demo.positioning.map((id,i)=>{const Icon=icons[i],x=t.why.items[id];return <article className="why-card" key={id} data-reveal><Icon size={24}/><h3>{x.title}</h3><p>{x.body}</p></article>})}</div><div className="why-image"><ResponsiveImage alt={t.services.items.distributionBoard.title}/></div></div></div></section>}
