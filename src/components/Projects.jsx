import { MapPin } from 'lucide-react'
import { projects } from '../data/projects.js'
import { imagery } from '../data/images.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'
const alts = { villaRewiring: 'villaAlt', retailFitout: 'retailAlt', acPower: 'acAlt' }
export function Projects({ t }) {
  return <section id="projects" className="section section-soft"><div className="shell"><SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} body={t.projects.intro} />
    <div className="project-grid">{projects.map((project) => <article className="project-card" key={project.id} data-reveal>
      <div className="project-image"><ResponsiveImage {...imagery[project.imageKey]} alt={t.projects[alts[project.id]]} sizes="(max-width: 700px) 92vw, 30vw" /><span className="sample-badge">{t.common.sampleProject}</span></div>
      <div className="project-copy"><span className="project-location"><MapPin size={15} aria-hidden="true" />{t.areas.names[project.areaKey]}</span><h3>{t.projects[project.id].title}</h3><p>{t.projects[project.id].body}</p></div>
    </article>)}</div>
  </div></section>
}
