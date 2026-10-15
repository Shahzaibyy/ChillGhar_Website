import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, KeyRound, Wallet, ShieldCheck, Zap, CalendarClock, Repeat, Banknote } from 'lucide-react';
import { SERVICES, HOME_FEATURED, bySlug, fromPrice } from '../data/services';
import { HOME_FAQS } from '../data/faqs';
import { CITIES } from '../data/cities';
import { pkr } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import ServiceIcon from '../components/ServiceIcon';
import ServiceTile from '../components/ServiceTile';
import Accordion from '../components/Accordion';
import CtaBand from '../components/CtaBand';

const COMPOSER = ['car-wash', 'bike-wash', 'deep-home-cleaning', 'laundry', 'home-cook', 'salon-at-home'];

function Composer() {
  const [slug, setSlug] = useState('car-wash');
  const service = bySlug(slug);
  const [pkgId, setPkgId] = useState(service.packages[0].id);
  const pkg = service.packages.find((p) => p.id === pkgId) || service.packages[0];

  const pick = (s) => {
    setSlug(s);
    setPkgId(bySlug(s).packages[0].id);
  };

  return (
    <div className="composer" aria-labelledby="composer-title">
      <h2 id="composer-title">Aaj kya karwana hai?</h2>
      <p style={{ opacity: 0.85 }}>Pick a service and see the flat price before you book.</p>
      <div className="chips" role="group" aria-label="Choose a service">
        {COMPOSER.map((s) => {
          const sv = bySlug(s);
          return (
            <button key={s} className="chip" aria-pressed={slug === s} onClick={() => pick(s)}>
              {sv.name.replace(' at home', '').replace(' wash & fold', '')}
            </button>
          );
        })}
      </div>
      <div className="composer__pkgs" role="group" aria-label={`${service.name} packages`}>
        {service.packages.map((p) => (
          <button key={p.id} className="pkg-row" aria-pressed={p.id === pkg.id} onClick={() => setPkgId(p.id)}>
            <span>
              {p.name}
              <small>{p.detail}</small>
            </span>
            <strong>{pkr(p.price)}</strong>
          </button>
        ))}
      </div>
      <Link className="btn btn--sun btn--block btn--lg" to={`/book/${service.slug}?pkg=${pkg.id}`}>
        Book {service.name.toLowerCase()} <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </div>
  );
}

export default function Home() {
  usePageMeta('', 'Book verified women professionals for home cleaning, car and bike wash, laundry, cooking, beauty and care. Flat prices, OTP-safe visits.');
  const featured = useMemo(() => HOME_FEATURED.map(bySlug), []);
  const vehicles = SERVICES.filter((s) => s.category === 'vehicles');

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <h1>
              <span>Chill kar.</span>
              <span className="line-2">Kaam hum kar lenge.</span>
            </h1>
            <p className="lede">
              Verified, trained women professionals for everything at home. From deep cleans and car wash to cooking and care. One flat price, shown before you book.
            </p>
            <div className="cluster" style={{ marginTop: 28 }}>
              <Link className="btn btn--lg" to="/services">Browse {SERVICES.length} services</Link>
              <Link className="btn btn--ghost btn--lg" to="/how-it-works">How it works</Link>
            </div>
            <ul className="hero__proof">
              <li><BadgeCheck aria-hidden="true" /> Background-checked pros</li>
              <li><KeyRound aria-hidden="true" /> Safety code at your door</li>
              <li><Wallet aria-hidden="true" /> JazzCash, Easypaisa or cash</li>
            </ul>
          </div>
          <Composer />
        </div>
      </section>

      <section className="section band-mist" aria-labelledby="svc-title">
        <div className="container">
          <div className="section-head section-head--row">
            <div className="stack">
              <h2 id="svc-title">Sab kuch, ek app mein.</h2>
              <p className="lede">Pick what you need. Every service has packages with a flat price and a clear list of what is included.</p>
            </div>
            <Link className="btn btn--ghost" to="/services">All services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="tile-grid">
            {featured.map((s) => <ServiceTile key={s.slug} service={s} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <h2 id="how-title">Booked in three taps.</h2>
            <p className="lede">No calls, no haggling, no waiting at home for a maybe.</p>
          </div>
          <ol className="steps">
            <li className="step"><span className="step__n" aria-hidden="true" /><h3>Pick a package</h3><p>Choose the service and the size of the job. The price is flat and shown up front.</p></li>
            <li className="step"><span className="step__n" aria-hidden="true" /><h3>Choose when</h3><p>Now, later today, any day this week, or on repeat every week or month.</p></li>
            <li className="step"><span className="step__n" aria-hidden="true" /><h3>Share the code at the door</h3><p>Your pro arrives, confirms the 4 digit safety code, and gets to work. Pay when you are happy.</p></li>
          </ol>
        </div>
      </section>

      <section className="section band-ink on-dark" aria-labelledby="veh-title">
        <div className="container spot">
          <div className="stack" style={{ '--stack': '20px' }}>
            <h2 id="veh-title">Car and bike wash, at your gate.</h2>
            <p className="lede">Skip the wash bay queue. A trained pro washes your car or bike at home with low-water methods that are safe on paint. Add interior detailing, chain lube or wax when you want it.</p>
            <div><Link className="btn btn--sun" to="/services?cat=vehicles">See car & bike care</Link></div>
          </div>
          <div className="spot__tiles">
            {vehicles.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="spot-tile">
                <ServiceIcon name={s.icon} tone="sun" size="sm" />
                <div>
                  <strong>{s.name}</strong>
                  <span className="price-line">from {pkr(fromPrice(s))}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="why-title">
        <div className="container two-col" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ '--stack': '20px' }}>
            <h2 id="why-title">Help you can let in without worrying.</h2>
            <p className="lede">Every pro is a woman from your own city, verified and trained. You always know who is coming and what it costs.</p>
            <div><Link className="btn btn--ghost" to="/safety">How we keep visits safe</Link></div>
          </div>
          <div className="feature-list">
            <div className="feature"><ServiceIcon name="Sparkles" size="sm" /><div><h3>Verified and trained</h3><p>CNIC, photo and two references checked before a pro takes her first booking.</p></div></div>
            <div className="feature"><span className="glyph glyph--sun glyph--sm"><KeyRound aria-hidden="true" /></span><div><h3>Safety code per visit</h3><p>A 4 digit code starts every job, so the person at your gate is the person you booked.</p></div></div>
            <div className="feature"><span className="glyph glyph--ink glyph--sm"><Banknote aria-hidden="true" /></span><div><h3>Flat prices, no surprises</h3><p>No visit fee. If a job is bigger than described, you approve the change first.</p></div></div>
            <div className="feature"><span className="glyph glyph--sm"><ShieldCheck aria-hidden="true" /></span><div><h3>Satisfaction promise</h3><p>Not happy? Tell us within 24 hours and we will send someone to fix it.</p></div></div>
          </div>
        </div>
      </section>

      <section className="section band-mist" aria-labelledby="when-title">
        <div className="container">
          <div className="section-head">
            <h2 id="when-title">Your time, your schedule.</h2>
          </div>
          <div className="steps">
            <div className="step"><span className="glyph glyph--sun"><Zap aria-hidden="true" /></span><h3>Now</h3><p>We aim to have a pro at your door within 60 minutes where one is free nearby.</p></div>
            <div className="step"><span className="glyph"><CalendarClock aria-hidden="true" /></span><h3>Scheduled</h3><p>Pick any hour between 9am and 7pm over the next 7 days.</p></div>
            <div className="step"><span className="glyph glyph--ink"><Repeat aria-hidden="true" /></span><h3>On repeat</h3><p>Weekly or monthly bookings with the same pro, at a lower price per visit.</p></div>
          </div>
        </div>
      </section>

      <section className="section band-sun" aria-labelledby="pro-title">
        <div className="container cta">
          <div className="stack" style={{ '--stack': '16px' }}>
            <h2 id="pro-title" style={{ maxWidth: '18ch' }}>Work on your own terms. Earn on your own schedule.</h2>
            <p className="lede" style={{ color: 'var(--ink)' }}>Join Chill Ghar as a professional. Free training, flexible hours, weekly payouts to your JazzCash, Easypaisa or bank account.</p>
          </div>
          <Link className="btn btn--ink btn--lg" to="/become-a-pro">Become a pro</Link>
        </div>
      </section>

      <section className="section" aria-labelledby="city-title">
        <div className="container">
          <div className="section-head">
            <h2 id="city-title">Starting in the twin cities.</h2>
            <p className="lede">We are opening Islamabad and Rawalpindi first, then expanding. Tell us where you live and we will let you know when we arrive.</p>
          </div>
          <div className="city-list">
            {CITIES.map((c) => (
              <Link key={c.id} to={`/cities#${c.id}`} className="city-pill">
                <strong>{c.name}</strong>
                <span>{c.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-mist" aria-labelledby="faq-title">
        <div className="container container--narrow">
          <div className="section-head"><h2 id="faq-title">Questions, answered.</h2></div>
          <Accordion items={HOME_FAQS} />
          <p style={{ marginTop: 28 }}><Link to="/faq">Read all FAQs</Link></p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
