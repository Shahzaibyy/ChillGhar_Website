import { Link, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import NotFound from './NotFound';

// PLACEHOLDER COPY. Have a lawyer review and replace before launch.
const DOCS = {
  terms: {
    title: 'Terms of service',
    sections: [
      ['Using Chill Ghar', 'You may book services for yourself or on behalf of someone else with their permission. You agree to provide accurate address and contact details, and to treat our professionals with respect.'],
      ['Bookings and prices', 'Each package has a flat price shown before you confirm. If the job is larger than you described, the professional will propose a change and work only continues if you approve it.'],
      ['Safety code', 'Every booking has a 4 digit safety code. Share it only with the professional who arrives for your booking.'],
      ['Payment', 'You pay after the service by cash, JazzCash, Easypaisa or card, as chosen at checkout.'],
      ['Conduct', 'Harassment, abuse or unsafe behaviour towards a professional can result in removal from the platform.'],
    ],
  },
  privacy: {
    title: 'Privacy policy',
    sections: [
      ['What we collect', 'Your name, mobile number, address and booking details, so we can send a professional to the right place. For professionals, we also collect identity and reference details for verification.'],
      ['How we use it', 'To deliver bookings, keep visits safe, send service messages and improve the product. We do not sell your personal data.'],
      ['Who sees it', 'Your assigned professional sees your name, address and notes for your booking only. Payment partners process payments under their own policies.'],
      ['Your choices', 'You can ask us to correct or delete your account data by contacting support.'],
    ],
  },
  cancellation: {
    title: 'Cancellation policy',
    sections: [
      ['Free cancellation', 'Cancel or reschedule free of charge up to 2 hours before the booked start time.'],
      ['Late cancellation', 'Within 2 hours of the start time, a small call-out fee may apply to cover the professional\'s travel.'],
      ['If we cancel', 'If we cannot send a professional, you are never charged and we will help you rebook.'],
      ['Not satisfied?', 'Tell us within 24 hours of the visit. We will review the work and make it right.'],
    ],
  },
};

export default function Legal() {
  const { doc } = useParams();
  const content = DOCS[doc];
  usePageMeta(content?.title || 'Not found');
  if (!content) return <NotFound />;
  return (
    <>
      <PageHero title={content.title} crumbs={[{ label: content.title }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container container--narrow prose">
          <p className="muted">Last updated October 2026. This is a summary draft for the launch build.</p>
          {content.sections.map(([h, p]) => (
            <div key={h}><h2>{h}</h2><p>{p}</p></div>
          ))}
          <p>Questions? <Link to="/contact">Contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}
