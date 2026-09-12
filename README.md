# RAMAK Electro Mechanical — Demonstration Website

Premium bilingual static presentation website for **RAMAK FOR ELECTRO MECHANICAL WORKS – SOLE PROPRIETORSHIP L.L.C.** / **راماك للأعمال الإلكتروميكانيكية - شركة الشخص الواحد ذ.م.م.**, Abu Dhabi, UAE.

## Status

This repository contains a **demonstration website**. It is deliberately configured with `noindex, nofollow` and `public/robots.txt` blocks crawling. Do not remove those safeguards until the client has approved every temporary field, service statement, image, translation, policy, contact destination, and domain.

No deployment configuration is included and this work should not be published without explicit approval.

## Stack

- React 19.3.0
- Vite 8.3.0
- Tailwind CSS 4.3.3 via `@tailwindcss/vite`
- JavaScript
- Lucide React 1.45.0
- Local variable fonts (`Manrope`, `Noto Sans Arabic`)
- Static frontend only — no backend, CMS, database, authentication, analytics, or third-party scripts

## Local setup

```bash
npm ci
npm run dev
```

Production build and checks:

```bash
npm run lint
npm run typecheck
npm run verify:content
npm run build
npx playwright install chromium
npm run test:browser
```

Optional Lighthouse check (requires local Chrome/Chromium):

```bash
npm run test:lighthouse
```

## Content architecture

Verified licence facts and all temporary business facts are centralized in `src/data/company.js`. Every demo business field carries a `// DEMO CONTENT: Replace after client approval` comment. Services, projects, FAQs, navigation, and images are held in dedicated data files. English and Arabic are maintained separately under `src/i18n/`.

The LocalBusiness JSON-LD in `index.html` contains verified fields only: legal names, Abu Dhabi location, establishment year, licence number, activity code, and licensed activity. Demo phone numbers, hours, project data, service areas, and warranties are intentionally excluded from structured data.

## Static contact form

The contact form validates in the browser only. It does **not** send email, call an API, submit to a server, or imply delivery. After a valid submit it shows: “Demo form completed. Online enquiry submission will be connected after client approval.” Data remains in the form until the confirmation is closed.

## Imagery note

The repository includes an original, coordinated, code-generated technical SVG illustration set with no external stock URLs or third-party logos. The requested photorealistic AI image generation could not be performed from the current coding runtime because no image-generation tool was exposed to it. `scripts/generate-images.cjs` can render approved scene sources to WebP when the final photography/generated art is available. Before a public launch, replace the committed illustration set with client-approved real photography or approved photorealistic generated assets while preserving the component aspect ratios.

## Verified company information

- Trade name: RAMAK FOR ELECTRO MECHANICAL WORKS – SOLE PROPRIETORSHIP L.L.C.
- Arabic legal name: راماك للأعمال الإلكتروميكانيكية - شركة الشخص الواحد ذ.م.م.
- Location: Abu Dhabi, United Arab Emirates
- Establishment year: 2023
- Licence number: CN-4881233
- Licence category: Abu Dhabi Trader
- Legal form: Limited Liability Company – Sole Proprietorship Company
- Licensed activity: Electrical Equipment Installation and Operation
- Activity code: 4321016

## Demo information requiring approval

Temporary content includes customer types, service model and service list, service areas, working hours, Friday availability, 24/7 emergency wording, phone, WhatsApp, email, team-experience wording, workmanship-warranty wording, safety wording, sample projects, positioning statements, desired domain, imagery, Arabic copy, privacy policy, and the future contact-form destination. See `CLIENT_CONTENT_CHECKLIST.md`.
