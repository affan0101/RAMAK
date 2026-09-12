import { MapPin } from 'lucide-react'
import { projects } from '../data/projects.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'
const alts={villaRewiring:'villaAlt',retailFitout:'retailAlt',acPower:'acAlt'}
export function Projects({t}){return <section id="projects" className="section section-soft"><div className="shell"><SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} body={t.projects.intro}/><div className="project-grid">{projects.map(p=><article className="project-card" key={p.id} data-reveal><div className="project-image"><ResponsiveImage alt={t.projects[alts[p.id]]}/><span className="sample-badge">{t.common.sampleProject}</span></div><div className="project-copy"><span className="project-location"><MapPin size={15}/>{p.area}</span><h3>{t.projects[p.id].title}</h3><p>{t.projects[p.id].body}</p></div></article>)}</div></div></section>}
