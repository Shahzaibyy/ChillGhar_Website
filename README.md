# Chill Ghar web (React + Vite)

Marketing and booking site for Chill Ghar. React 19, React Router 7, plain CSS with design tokens, no UI framework.

## Run
    npm install
    npm run dev       # http://localhost:5173
    npm run build     # output in dist/ (deploy as a static SPA, rewrite all routes to index.html)
    npm run lint

## Screens (17 routes)
Home, Services (search + category filter), Service detail, Booking flow (package, when and where, review and pay),
Booking status (safety code, timeline, cancel), How it works, Pricing, Safety, Cities (locality request),
Become a pro (application), About, Contact, FAQ, Login (phone + OTP), Account (bookings, profile),
Legal (terms, privacy, cancellation), 404.

## Structure
    src/data        services.js (34 services, 7 categories), cities.js, faqs.js
    src/lib         api.js (mock API), pricing.js, slots.js, format.js, storage.js, site.js
    src/context     Auth, Booking draft, Toast
    src/components  Header, Footer, Layout, Logo, ServiceIcon, ServiceTile, Accordion, Field, CtaBand
    src/pages       one file per route (lazy loaded)
    src/styles      tokens.css (brand), base, layout, components, pages
    public          logos, favicons, manifest, og images from the brand kit

## Before launch
- Prices in src/data/services.js and repeat discounts in src/lib/pricing.js are illustrative. Confirm with operations.
- src/lib/site.js holds placeholder email, phone and WhatsApp. Replace with real details.
- src/lib/api.js is a mock backed by localStorage. Replace each function with a fetch call to the Go API
  (suggested: POST /auth/otp, POST /auth/verify, GET /services, POST /bookings, GET /bookings/:id, PATCH /bookings/:id, POST /leads).
- The demo OTP accepts any 4 digits. Legal pages are placeholder summaries and need legal review.
- Add real photography and customer reviews when you have them. None are invented here.
