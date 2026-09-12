import { useEffect, useMemo, useRef, useState } from 'react'
import { AirVent, BatteryCharging, Boxes, Cable, CircuitBoard, Lightbulb, ShieldCheck, Wrench, ArrowRight, X } from 'lucide-react'
import { serviceGroups, serviceItems } from '../data/services.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'
import { imagery } from '../data/images.js'
const iconMap = { AirVent, BatteryCharging, Boxes, Cable, CircuitBoard, Lightbulb, ShieldCheck, Wrench }
function ServiceDetails({ group, items, t, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => { closeRef.current?.focus(); const onKey = (event) => { if (event.key === 'Escape') onClose() }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])
  if (!group) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-dialog-title"><div className="modal-topbar"><span className="eyebrow">{t.services.modalTitle}</span><button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label={t.common.close}><X size={22} aria-hidden="true" /></button></div><h3 id="service-dialog-title">{t.services.groups[group.id].title}</h3><p>{t.services.groups[group.id].summary}</p><div className="service-detail-list">{items.map((item) => <article key={item.id}><strong>{t.services.items[item.id].title}</strong><p>{t.services.items[item.id].body}</p></article>)}</div></div></div>
}
export function Services({ t }) {
  const [activeGroup, setActiveGroup] = useState(null)
  const groupedItems = useMemo(() => Object.fromEntries(serviceGroups.map((group) => [group.id, serviceItems.filter((item) => item.group === group.id)])), [])
  return <section id="services" className="section section-soft"><div className="shell"><SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} body={t.services.intro} /><div className="service-grid">{serviceGroups.map((group) => { const Icon = iconMap[group.icon]; return <article className="service-card" key={group.id} data-reveal><span className="service-icon"><Icon size={26} aria-hidden="true" /></span><h3>{t.services.groups[group.id].title}</h3><p>{t.services.groups[group.id].summary}</p><button className="text-button" type="button" onClick={() => setActiveGroup(group)}>{t.common.learnMore}<ArrowRight className="directional-icon" size={17} aria-hidden="true" /></button></article> })}</div><div className="service-image-strip"><figure data-reveal><ResponsiveImage {...imagery.diagnosis} alt={t.services.items.faultDetection.title} /><figcaption>{t.services.groups.troubleshootingRepairs.title}</figcaption></figure><figure data-reveal><ResponsiveImage {...imagery.ups} alt={t.services.items.inverter.title} /><figcaption>{t.services.groups.inverterUps.title}</figcaption></figure><figure data-reveal><ResponsiveImage {...imagery.maintenance} alt={t.services.items.preventiveMaintenance.title} /><figcaption>{t.services.groups.preventiveMaintenance.title}</figcaption></figure></div></div>{activeGroup && <ServiceDetails group={activeGroup} items={groupedItems[activeGroup.id]} t={t} onClose={() => setActiveGroup(null)} />}</section>
}
