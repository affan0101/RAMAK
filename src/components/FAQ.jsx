import { ChevronDown } from 'lucide-react'
import { faqIds } from '../data/faqs.js'
import { SectionHeading } from './SectionHeading.jsx'
export function FAQ({t}){return <section className="section section-soft"><div className="shell faq-layout"><SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title}/><div className="faq-list">{faqIds.map(id=><details key={id}><summary>{t.faq[id].q}<ChevronDown size={19}/></summary><p>{t.faq[id].a}</p></details>)}</div></div></section>}
