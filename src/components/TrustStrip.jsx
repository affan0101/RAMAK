import { Building2, Home, ShieldCheck, Wrench } from 'lucide-react'
const icons=[Building2,Home,Wrench,ShieldCheck]
export function TrustStrip({t}){return <section className="trust-strip"><div className="shell trust-grid">{t.trust.map((item,i)=>{const Icon=icons[i];return <div className="trust-item" key={item.title} data-reveal><span className="trust-icon"><Icon size={20}/></span><div><strong>{item.title}</strong><span>{item.body}</span></div></div>})}</div></section>}
