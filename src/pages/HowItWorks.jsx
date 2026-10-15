import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

const STEPS = [
  { t: 'Pick a service and package', d: 'Browse cleaning, car and bike wash, laundry, cooking, beauty and care. Each package shows its flat price, how long it takes and what is included.' },
  { t: 'Choose when and where', d: 'Select Now, a time in the next 7 days, or a weekly or monthly repeat. Enter your address and a phone number for the visit.' },
  { t: 'Get matched with a verified pro', d: 'We match you with a trained woman professional who works near you. You see her name and photo before she arrives.' },
  { t: 'Share the safety code', d: 'At your door, your pro asks for the 4 digit code from your booking. This starts the job and confirms she is the right person.' },
  { t: 'Relax, then pay', d: 'Check the work, rate your pro, and pay with JazzCash, Easypaisa, card or cash. Not happy? Tell us within 24 hours.' },
];

export default function HowItWorks() {
  usePageMeta('How it works', 'Book, share a safety code at your door, and pay after the service. How Chill Ghar works.');
  return (
    <>
      <PageHero title="From tap to done, in five steps." lede="No calls and no waiting for someone to maybe show up. Here is exactly what happens." crumbs={[{ label: 'How it works' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container container--narrow">
          <ol className="timeline" style={{ gap: 6 }}>
            {STEPS.map((s, i) => (
              <li key={s.t} className="done" style={{ gridTemplateColumns: '48px 1fr', paddingBottom: 36 }}>
                <span className="step__n" style={{ width: 48, fontSize: '1.2rem' }} aria-hidden="true">{i + 1}</span>
                <div>
                  <h2 style={{ fontSize: 'var(--step-2)', marginBottom: 6 }}>{s.t}</h2>
                  <p className="muted">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="cluster" style={{ marginTop: 16 }}>
            <Link className="btn btn--lg" to="/services">Book a service</Link>
            <Link className="btn btn--ghost btn--lg" to="/safety">Read about safety</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
