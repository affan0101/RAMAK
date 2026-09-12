import { useState } from 'react'
import { Dialog } from './Dialog.jsx'
export function DemoContactButton({ children, t }) {
  const [open, setOpen] = useState(false)
  return <><button type="button" onClick={() => setOpen(true)}>{children}</button>
    {open && <Dialog onClose={() => setOpen(false)} labelledBy="demo-contact-title">
      <div className="confirmation-modal"><h3 id="demo-contact-title">{t.contact.demoWarningTitle}</h3><p>{t.contact.demoWarningBody}</p><button type="button" className="button button-primary" onClick={() => setOpen(false)}>{t.common.close}</button></div>
    </Dialog>}
  </>
}
