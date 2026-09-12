import { ClipboardCheck, FileText, Send, Wrench } from 'lucide-react'
import { SectionHeading } from './SectionHeading.jsx'
const icons=[Send,ClipboardCheck,FileText,Wrench]
export function ProcessSteps({t}){return <section className="section section-white"><div className="shell"><SectionHeading eyebrow={t.process.eyebrow} title={t.process.title}/><div className="process-grid">{t.process.steps.map((x,i)=>{const Icon=icons[i];return <article className="process-card" key={x.title} data-reveal><div className="process-index">0{i+1}</div><span className="process-icon"><Icon size={21}/></span><h3>{x.title}</h3><p>{x.body}</p></article>})}</div></div></section>}
