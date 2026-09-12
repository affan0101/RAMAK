import { MapPin } from 'lucide-react'
import { company } from '../data/company.js'
import { SectionHeading } from './SectionHeading.jsx'
export function ServiceAreas({ t }) {
  return <section className="section section-white"><div className="shell areas-layout">
    <SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} body={t.areas.body} />
    <ul className="area-list">{company.demo.serviceAreas.map((key) => <li key={key}><MapPin size={15} aria-hidden="true" />{t.areas.names[key]}</li>)}</ul>
  </div></section>
}
