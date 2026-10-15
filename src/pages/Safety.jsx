import { IdCard, KeyRound, Camera, Headset, ShieldCheck, UserCheck } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

const ITEMS = [
  { Icon: IdCard, tone: '', t: 'Identity checked', d: 'Every pro submits her CNIC and a recent photo. We verify both before she is approved.' },
  { Icon: UserCheck, tone: 'sun', t: 'References and background check', d: 'Two personal references are contacted, and a background check is completed before the first booking.' },
  { Icon: ShieldCheck, tone: 'ink', t: 'Trained before she starts', d: 'Skills, safe handling of products, and conduct standards, taught and assessed in onboarding.' },
  { Icon: KeyRound, tone: '', t: 'A safety code for every visit', d: 'Your pro cannot start without the 4 digit code from your booking. Strangers at the gate cannot use it.' },
  { Icon: Camera, tone: 'sun', t: 'Know who is coming', d: 'Name and photo appear in your booking once a pro is assigned, so you can match them at the door.' },
  { Icon: Headset, tone: 'ink', t: 'Support when you need it', d: 'Call or WhatsApp from the booking page. Report any concern and we will review it promptly.' },
];

export default function Safety() {
  usePageMeta('Safety', 'Verified women professionals, background checks, and a safety code on every visit.');
  return (
    <>
      <PageHero title="Safe for your home. Safe for our pros." lede="Letting someone into your home takes trust. Here is how we earn it, and how we protect the women who work with us." crumbs={[{ label: 'Safety' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container container--narrow">
          <div className="feature-list">
            {ITEMS.map(({ Icon, tone, t, d }) => (
              <div className="feature" key={t}>
                <span className={`glyph ${tone ? `glyph--${tone}` : ''}`}><Icon aria-hidden="true" /></span>
                <div><h2 style={{ fontSize: 'var(--step-1)', marginBottom: 4 }}>{t}</h2><p>{d}</p></div>
              </div>
            ))}
          </div>
          <div className="notice" style={{ marginTop: 40 }}>
            <ShieldCheck aria-hidden="true" />
            <p>Pros are protected too. They can end a visit if they feel unsafe, and our team backs their decision. Customers who behave inappropriately are removed from the platform.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
