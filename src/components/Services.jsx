import { useState } from 'react'
import { AirVent, BatteryCharging, Boxes, Cable, CircuitBoard, Lightbulb, ShieldCheck, Wrench, ArrowUpRight, X } from 'lucide-react'
import { serviceGroups, serviceItems } from '../data/services.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { serviceImagery } from '../data/images.js'
import { Dialog } from './Dialog.jsx'

const iconMap = { AirVent, BatteryCharging, Boxes, Cable, CircuitBoard, Lightbulb, ShieldCheck, Wrench }
export function Services({ t }) {
  const [activeGroup, setActiveGroup] = useState(null)
  return <section id="services" className="section section-soft"><div className="shell">
    <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.intro} />
    <div className="service-grid">{serviceGroups.map((group, index) => {
      const Icon = iconMap[group.icon]
      const content = t.services.groups[group.id]
      return <article className="service-card" key={group.id} data-reveal>
        <div className="service-photo"><ResponsiveImage {...serviceImagery[group.id]} alt={content.title} sizes="(max-width: 620px) 92vw, (max-width: 1199px) 40vw, 20vw" /><span className="service-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
        <div className="service-card-body"><span className="service-icon"><Icon size={23} aria-hidden="true" /></span><h3>{content.title}</h3><p>{content.summary}</p>
          <button className="text-button" type="button" onClick={() => setActiveGroup(group)} aria-label={`${t.common.learnMore}: ${content.title}`}>{t.common.learnMore}<ArrowUpRight className="directional-icon" size={19} aria-hidden="true" /></button>
        </div>
      </article>
    })}</div>
    <p className="section-footnote">{t.common.aiNote}</p>
    </div>
    {activeGroup && <Dialog onClose={() => setActiveGroup(null)} labelledBy="service-dialog-title"><div className="service-modal">
      <div className="modal-topbar"><span className="eyebrow">{t.services.modalTitle}</span><button className="icon-button" type="button" onClick={() => setActiveGroup(null)} aria-label={t.common.close}><X size={22} aria-hidden="true" /></button></div>
      <ResponsiveImage {...serviceImagery[activeGroup.id]} alt="" className="modal-photo" />
      <h3 id="service-dialog-title">{t.services.groups[activeGroup.id].title}</h3><p>{t.services.groups[activeGroup.id].summary}</p>
      <div className="service-detail-list">{serviceItems.filter((item) => item.group === activeGroup.id).map((item) => <article key={item.id}><strong>{t.services.items[item.id].title}</strong><p>{t.services.items[item.id].body}</p></article>)}</div>
    </div></Dialog>}
  </section>
}
