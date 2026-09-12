import { useEffect } from 'react'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { TrustStrip } from './components/TrustStrip.jsx'
import { About } from './components/About.jsx'
import { Services } from './components/Services.jsx'
import { WhyRamak } from './components/WhyRamak.jsx'
import { ProcessSteps } from './components/ProcessSteps.jsx'
import { Projects } from './components/Projects.jsx'
import { ServiceAreas } from './components/ServiceAreas.jsx'
import { FAQ } from './components/FAQ.jsx'
import { ContactForm } from './components/ContactForm.jsx'
import { Footer } from './components/Footer.jsx'
import { useLanguage } from './hooks/useLanguage.js'

export default function App() {
  const { language, t, toggleLanguage } = useLanguage()

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'))
    nodes.forEach((node) => {
      node.classList.add('will-reveal')
      const siblings = Array.from(node.parentElement.children).filter((child) => child.hasAttribute('data-reveal'))
      node.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(node) % 4, 3) * 65}ms`)
    })
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -18px' })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [language])

  useEffect(() => {
    document.title = language === 'ar'
      ? 'راماك للأعمال الإلكتروميكانيكية | أبوظبي'
      : 'RAMAK Electro Mechanical | Abu Dhabi'
  }, [language])

  return (
    <>
      <Header language={language} t={t} onToggleLanguage={toggleLanguage} />
      <main id="main-content">
        <Hero t={t} />
        <TrustStrip t={t} />
        <About t={t} />
        <Services t={t} />
        <WhyRamak t={t} />
        <ProcessSteps t={t} />
        <Projects t={t} />
        <ServiceAreas t={t} />
        <FAQ t={t} />
        <ContactForm t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
