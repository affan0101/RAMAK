# RAMAK Electro Mechanical — Demonstration Website

Premium bilingual static presentation website for **RAMAK FOR ELECTRO MECHANICAL WORKS – SOLE PROPRIETORSHIP L.L.C.** / **راماك للأعمال الإلكتروميكانيكية - شركة الشخص الواحد ذ.م.م.**, Abu Dhabi, UAE.

## Status

This is a **demonstration website**. It is deliberately configured with `noindex, nofollow` and `public/robots.txt` blocks crawling. Do not remove those safeguards until the client has approved every temporary field, service statement, image, translation, policy, contact destination, and domain. No deployment configuration is included.

## Stack

React 19.3, Vite 8.3, Tailwind CSS 4.3, JavaScript, Lucide React, local Manrope and Noto Sans Arabic variable fonts. The site is a fully static frontend with no backend, CMS, database, authentication, analytics, or third-party runtime scripts.

## Run locally

Requires Node.js 22.12+ (Node 24 also works). If you already have this repository:

```bash
git pull --ff-only origin main
npm ci
npm run dev
```

Open the local URL printed by Vite. All nine AI-generated photographs and their mobile versions are committed under `public/images/`; no image tool, API key, or regeneration is required. Do not overwrite any uncommitted local edits when pulling.

## Design update

- Shared 80% viewport-width content grid at tablet/desktop widths (700px and above); 16–20px mobile gutters. Background sections remain full bleed.
- Refined navy/cyan/amber palette, balanced headline, editorial image frame, photographic service cards, and layered About imagery.
- Finite hero/circuit entrances, staggered scroll reveals, image hover motion, active navigation, and reduced-motion support.
- Native modal dialogs with trapped focus, Escape dismissal, focus restoration, and scroll locking.
- Fully local demo form; phone, email and WhatsApp buttons show a demo warning and never open a placeholder contact.
- Translated service areas, project locations, navigation labels, image disclosures and form messages.

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

The CI workflow enforces Lighthouse targets of Performance >= 90, Accessibility >= 95, and Best Practices >= 95. During the demonstration stage, the deliberate `noindex, nofollow` safeguard reduces Lighthouse's SEO score because indexability is intentionally disabled. CI records that score without failing while `noindex` is present; once indexing is approved and the safeguard is removed, CI enforces SEO >= 90 as well.

## Content architecture

Verified licence facts and all temporary business facts are centralized in `src/data/company.js`. Every demo business field carries a `// DEMO CONTENT: Replace after client approval` comment. Services, projects, FAQs, navigation, and image references are held in dedicated data files. English and Arabic are maintained separately under `src/i18n/`.

LocalBusiness JSON-LD in `index.html` contains verified fields only: legal names, Abu Dhabi location, establishment year, licence number, activity code, and licensed activity. Demo phone numbers, hours, project data, service areas, and warranties are intentionally excluded.

## Static contact form

The form validates in the browser only. It does **not** send email, call an API, submit to a server, or imply delivery. After a valid submit it shows: “Demo form completed. Online enquiry submission will be connected after client approval.” Data remains on the page until the confirmation is closed. It is not saved in local storage. Selecting email as the preferred contact method requires a valid email address. All placeholder contact actions are guarded.

## Imagery note

Nine coordinated photorealistic demo assets were generated using the built-in AI image-generation tool. They are illustrative, not actual RAMAK personnel, completed work, or evidence of certifications. Review and approve their suitability before public use. Image prompts and provenance are documented in `AI_IMAGE_PROMPTS.md`. Each asset has a 1440px and 640px WebP variant. The hero is prioritized; below-fold images are lazy-loaded.

All assets use local paths in `src/data/images.js`; no stock hotlinks, temporary workspace paths, or external image APIs are needed. To process replacement originals later, use `node scripts/prepare-images.mjs /path/to/approved-originals` with PNG filenames matching the nine asset names. This intentionally replaces the optimized copies; review the git diff before committing.

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

## Browser testing

`npm run test:browser` starts its own local production preview, checks both languages at eight widths (320–1920px), image loading, the 80% grid, modal/menu focus, overflow, form validation, zero network requests on submit, and accessibility. It writes screenshots to the ignored `test-results/` folder. To use an existing compatible Chromium installation instead, set `CHROME_PATH` to its executable for the test process.

The `typecheck` command validates the JavaScript project configuration with `tsc`; the project retains JavaScript and its existing `checkJs: false` setting. This is not strict TypeScript type checking.
