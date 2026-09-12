# RAMAK Electro Mechanical — Demonstration Website

Premium bilingual static presentation website for **RAMAK FOR ELECTRO MECHANICAL WORKS – SOLE PROPRIETORSHIP L.L.C.** / **راماك للأعمال الإلكتروميكانيكية - شركة الشخص الواحد ذ.م.م.**, Abu Dhabi, UAE.

## Status

This is a **demonstration website**. It is deliberately configured with `noindex, nofollow` and `public/robots.txt` blocks crawling. Do not remove those safeguards until the client has approved every temporary field, service statement, image, translation, policy, contact destination, and domain. No deployment configuration is included.

## Stack

React 19.3, Vite 8.3, Tailwind CSS 4.3, JavaScript, Lucide React, local Manrope and Noto Sans Arabic variable fonts. The site is a fully static frontend with no backend, CMS, database, authentication, analytics, or third-party runtime scripts.

## Setup and verification

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run verify:content
npm run build
npx playwright install chromium
npm run test:browser
npm run test:lighthouse
```

## Content architecture

Verified licence facts and all temporary business facts are centralized in `src/data/company.js`. Every demo business field carries a `// DEMO CONTENT: Replace after client approval` comment. Services, projects, FAQs, navigation, and image references are held in dedicated data files. English and Arabic are maintained separately under `src/i18n/`.

LocalBusiness JSON-LD in `index.html` contains verified fields only: legal names, Abu Dhabi location, establishment year, licence number, activity code, and licensed activity. Demo phone numbers, hours, project data, service areas, and warranties are intentionally excluded.

## Static contact form

The form validates in the browser only. It does **not** send email, call an API, submit to a server, or imply delivery. After a valid submit it shows: “Demo form completed. Online enquiry submission will be connected after client approval.” Data remains on the page until the confirmation is closed.

## Imagery note

The current demo uses original code-native technical SVG scenes rendered inline, so there are no stock-image URLs, third-party logos, or missing binary assets. The requested photorealistic AI image set could not be generated in the available repository-editing runtime. Replace the SVG demo scenes with client-approved real photography or approved photorealistic generated WebP/AVIF assets before public launch.

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

Temporary content includes customer types, proposed services, service model, service areas, working hours, Friday availability, emergency-support wording, phone, WhatsApp, email, team-experience wording, workmanship-warranty wording, safety wording, sample projects, positioning statements, imagery, desired domain, Arabic copy, privacy policy, and the future contact-form destination. See `CLIENT_CONTENT_CHECKLIST.md`.
