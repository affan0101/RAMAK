import { useMemo, useState } from 'react'
import { AlertTriangle, CheckCircle2, Mail, MapPin, MessageCircle, Phone, X } from 'lucide-react'
import { company, contactLinks } from '../data/company.js'
import { serviceGroups } from '../data/services.js'
import { imagery } from '../data/images.js'
import { SectionHeading } from './SectionHeading.jsx'
import { ResponsiveImage } from './ResponsiveImage.jsx'

const initialForm = {
  fullName: '', phone: '', email: '', service: '', propertyType: '', area: '', preferredContact: '', message: '', consent: false,
}

export function ContactForm({ t }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [whatsappWarning, setWhatsappWarning] = useState(false)
  const serviceOptions = useMemo(() => serviceGroups.map((group) => ({ value: group.id, label: t.services.groups[group.id].title })), [t])
  const setValue = (field, value) => { setForm((current) => ({ ...current, [field]: value })); if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined })) }
  const validate = () => {
    const next = {}
    if (form.fullName.trim().length < 2) next.fullName = t.contact.form.nameError
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) next.phone = t.contact.form.phoneError
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = t.contact.form.emailError
    if (!form.service) next.service = t.contact.form.requiredError
    if (!form.propertyType) next.propertyType = t.contact.form.requiredError
    if (!form.area.trim()) next.area = t.contact.form.requiredError
    if (!form.preferredContact) next.preferredContact = t.contact.form.requiredError
    if (!form.message.trim()) next.message = t.contact.form.requiredError
    if (!form.consent) next.consent = t.contact.form.consentError
    setErrors(next); return Object.keys(next).length === 0
  }
  const onSubmit = (event) => { event.preventDefault(); if (submitted || !validate()) return; setSubmitted(true); setConfirmationOpen(true) }
  const closeConfirmation = () => { setConfirmationOpen(false); setSubmitted(false); setErrors({}); setForm(initialForm) }
  const fieldError = (field) => errors[field] ? `${field}-error` : undefined
  return (
    <section id="contact" className="section section-navy contact-section">
      <div className="shell">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} invert />
        <div className="contact-layout">
          <aside className="contact-info" data-reveal>
            <div className="contact-image"><ResponsiveImage {...imagery.contact} alt="" /><div className="contact-image-overlay" aria-hidden="true" /></div>
            <div className="contact-info-content">
              <h3>{t.contact.detailsTitle}</h3>
              <a href={contactLinks.tel}><Phone size={18} aria-hidden="true" /><span><small>{t.common.demoContact}</small><bdi>{company.demo.telephone}</bdi></span></a>
              <a href={contactLinks.mailto}><Mail size={18} aria-hidden="true" /><span><small>{t.common.demoContact}</small><bdi>{company.demo.email}</bdi></span></a>
              <button type="button" onClick={() => setWhatsappWarning(true)}><MessageCircle size={18} aria-hidden="true" /><span><small>{t.common.demoContact}</small><bdi>{company.demo.whatsapp}</bdi></span></button>
              <div className="contact-address"><MapPin size={18} aria-hidden="true" /><span>{t.common.location}</span></div>
              <div className="hours-card"><strong>{t.contact.hoursTitle}</strong><span>{t.contact.regularHours}</span><span>{t.contact.fridayHours}</span><span>{t.contact.emergency}</span></div>
            </div>
          </aside>
          <form className="contact-form" onSubmit={onSubmit} noValidate data-reveal>
            <div className="form-grid">
              <Field label={t.contact.form.fullName} required error={errors.fullName} id="fullName"><input id="fullName" name="fullName" autoComplete="name" value={form.fullName} onChange={(e) => setValue('fullName', e.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={fieldError('fullName')} /></Field>
              <Field label={t.contact.form.phone} required error={errors.phone} id="phone"><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" value={form.phone} onChange={(e) => setValue('phone', e.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={fieldError('phone')} /></Field>
              <Field label={t.contact.form.email} error={errors.email} id="email"><input id="email" name="email" type="email" inputMode="email" autoComplete="email" dir="ltr" value={form.email} onChange={(e) => setValue('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={fieldError('email')} /></Field>
              <Field label={t.contact.form.service} required error={errors.service} id="service"><select id="service" name="service" value={form.service} onChange={(e) => setValue('service', e.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={fieldError('service')}><option value="">{t.contact.form.chooseService}</option>{serviceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
              <Field label={t.contact.form.propertyType} required error={errors.propertyType} id="propertyType"><select id="propertyType" name="propertyType" value={form.propertyType} onChange={(e) => setValue('propertyType', e.target.value)} aria-invalid={Boolean(errors.propertyType)} aria-describedby={fieldError('propertyType')}><option value="">{t.contact.form.chooseProperty}</option><option value="residential">{t.contact.form.residential}</option><option value="commercial">{t.contact.form.commercial}</option><option value="other">{t.contact.form.other}</option></select></Field>
              <Field label={t.contact.form.area} required error={errors.area} id="area"><input id="area" name="area" autoComplete="address-level2" value={form.area} onChange={(e) => setValue('area', e.target.value)} aria-invalid={Boolean(errors.area)} aria-describedby={fieldError('area')} /></Field>
              <Field label={t.contact.form.preferredContact} required error={errors.preferredContact} id="preferredContact" full><select id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={(e) => setValue('preferredContact', e.target.value)} aria-invalid={Boolean(errors.preferredContact)} aria-describedby={fieldError('preferredContact')}><option value="">{t.contact.form.chooseContact}</option><option value="phone">{t.contact.form.phoneOption}</option><option value="email">{t.contact.form.emailOption}</option><option value="whatsapp">{t.contact.form.whatsappOption}</option></select></Field>
              <Field label={t.contact.form.message} required error={errors.message} id="message" full><textarea id="message" name="message" rows="5" value={form.message} onChange={(e) => setValue('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={fieldError('message')} /></Field>
            </div>
            <label className={`consent ${errors.consent ? 'has-error' : ''}`}><input type="checkbox" checked={form.consent} onChange={(e) => setValue('consent', e.target.checked)} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>{t.contact.form.consent}</span></label>
            {errors.consent && <span className="field-error consent-error" id="consent-error">{errors.consent}</span>}
            <button className="button button-primary button-large form-submit" type="submit" disabled={submitted}>{submitted ? <><CheckCircle2 size={19} aria-hidden="true" />{t.contact.form.submitting}</> : t.contact.form.submit}</button>
          </form>
        </div>
      </div>
      {confirmationOpen && <div className="modal-backdrop" role="presentation"><div className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><span className="confirmation-icon"><CheckCircle2 size={29} aria-hidden="true" /></span><h3 id="confirmation-title">{t.contact.confirmationTitle}</h3><p>{t.contact.confirmationBody}</p><small>{t.contact.confirmationNote}</small><button className="button button-primary" type="button" onClick={closeConfirmation}>{t.contact.closeConfirmation}</button></div></div>}
      {whatsappWarning && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setWhatsappWarning(false)}><div className="confirmation-modal warning-modal" role="dialog" aria-modal="true" aria-labelledby="whatsapp-warning-title"><button className="icon-button modal-close-corner" type="button" onClick={() => setWhatsappWarning(false)} aria-label={t.common.close}><X size={20} aria-hidden="true" /></button><span className="confirmation-icon"><AlertTriangle size={29} aria-hidden="true" /></span><h3 id="whatsapp-warning-title">{t.contact.whatsappWarningTitle}</h3><p>{t.contact.whatsappWarningBody}</p><button className="button button-secondary" type="button" onClick={() => setWhatsappWarning(false)}>{t.common.close}</button></div></div>}
    </section>
  )
}

function Field({ label, required = false, error, id, full = false, children }) {
  return <div className={`form-field ${full ? 'form-field-full' : ''} ${error ? 'has-error' : ''}`}><label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>{children}{error && <span className="field-error" id={`${id}-error`}>{error}</span>}</div>
}
