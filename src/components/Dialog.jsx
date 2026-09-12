import { useEffect, useRef } from 'react'

/** Native focus trap, inert background, Escape, and focus restoration. */
export function Dialog({ children, onClose, labelledBy, label, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const returnFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    dialog.querySelector('button, a[href], input, select, textarea')?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected) returnFocus.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={ref} className={`dialog-layer ${className}`} aria-labelledby={labelledBy} aria-label={label}
    onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const items = Array.from(ref.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')).filter((node) => node.getClientRects().length)
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === ref.current)) { event.preventDefault(); first?.focus() }
    }}
    onCancel={(event) => { event.preventDefault(); onClose() }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    {children}
  </dialog>
}
