import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, KeyRound, MessageCircle, Phone, CalendarClock, MapPin, Wallet } from 'lucide-react';
import { getBooking, updateBooking } from '../lib/api';
import { dayLabel, pkr, slotLabel } from '../lib/format';
import { SITE } from '../lib/site';
import { usePageMeta } from '../hooks/usePageMeta';
import { useToast } from '../context/ToastContext';
import ServiceIcon from '../components/ServiceIcon';
import NotFound from './NotFound';

const PAY_LABEL = { cash: 'Cash on service', jazzcash: 'JazzCash', easypaisa: 'Easypaisa', card: 'Card' };

export default function BookingStatus() {
  const { id } = useParams();
  const [booking, setBooking] = useState(() => getBooking(id));
  const { notify } = useToast();
  usePageMeta(booking ? `Booking ${booking.id}` : 'Booking not found');

  if (!booking) return <NotFound />;

  const cancelled = booking.status === 'cancelled';
  const whenText =
    booking.when.mode === 'now'
      ? 'Now, within about 60 minutes'
      : `${dayLabel(new Date(`${booking.when.day}T00:00:00`))}, ${slotLabel(booking.when.hour)}`;

  const cancel = () => {
    if (!window.confirm('Cancel this booking? Free up to 2 hours before the visit.')) return;
    updateBooking(booking.id, { status: 'cancelled' });
    setBooking({ ...booking, status: 'cancelled' });
    notify('Booking cancelled');
  };

  const steps = [
    { t: 'Booking confirmed', d: 'We have your request and are matching a pro.', done: true },
    { t: 'Pro assigned', d: 'You will see her name and photo here and by SMS.', done: false },
    { t: 'On the way', d: 'Live arrival time appears when she leaves.', done: false },
    { t: 'Service complete', d: 'Review the work and pay.', done: false },
  ];

  return (
    <section className="section--tight" style={{ paddingBottom: 96 }}>
      <div className="container container--narrow">
        <div className="stack" style={{ '--stack': '14px', marginTop: 40, marginBottom: 32 }}>
          <span className={`badge ${cancelled ? '' : 'badge--ok'}`} style={{ justifySelf: 'start' }}>
            {cancelled ? 'Cancelled' : <><Check aria-hidden="true" /> Confirmed</>}
          </span>
          <h1 style={{ fontSize: 'var(--step-4)' }}>{cancelled ? 'Booking cancelled.' : 'You are booked.'}</h1>
          <p className="lede">Booking {booking.id} for {booking.serviceName}.</p>
        </div>

        {!cancelled && (
          <div className="code-box" style={{ marginBottom: 32 }}>
            <span className="badge badge--sun"><KeyRound aria-hidden="true" /> Your safety code</span>
            <output aria-label={`Safety code ${booking.safetyCode.split('').join(' ')}`}>{booking.safetyCode}</output>
            <p className="muted" style={{ color: 'rgba(255,255,255,0.8)' }}>Give this code to your pro at the door. Do not share it before she arrives.</p>
          </div>
        )}

        <div className="panel" style={{ marginBottom: 32 }}>
          <div className="cluster" style={{ flexWrap: 'nowrap' }}>
            <ServiceIcon name={booking.icon} tone={booking.tone} />
            <div>
              <h2 style={{ fontSize: 'var(--step-2)' }}>{booking.serviceName}</h2>
              <p className="muted">{booking.pkg.name}</p>
            </div>
          </div>
          <dl className="summary" style={{ background: 'var(--violet-50)', position: 'static' }}>
            <div className="cluster" style={{ flexWrap: 'nowrap' }}><CalendarClock size={18} aria-hidden="true" /><span>{whenText}</span></div>
            <div className="cluster" style={{ flexWrap: 'nowrap' }}><MapPin size={18} aria-hidden="true" /><span>{[booking.address.house, booking.address.area, booking.address.cityName].filter(Boolean).join(', ')}</span></div>
            <div className="cluster" style={{ flexWrap: 'nowrap' }}><Wallet size={18} aria-hidden="true" /><span>{PAY_LABEL[booking.pay]}, {pkr(booking.totals.total)} after the service</span></div>
          </dl>
        </div>

        {!cancelled && (
          <>
            <h2 style={{ fontSize: 'var(--step-2)', marginBottom: 24 }}>What happens next</h2>
            <ol className="timeline">
              {steps.map((s) => (
                <li key={s.t} className={s.done ? 'done' : ''}>
                  <span className="dot">{s.done && <Check aria-hidden="true" />}</span>
                  <div><strong>{s.t}</strong><span>{s.d}</span></div>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="cluster" style={{ marginTop: 40 }}>
          <a className="btn btn--ghost" href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi Chill Ghar, about booking ${booking.id}`)}`}><MessageCircle size={18} aria-hidden="true" /> WhatsApp support</a>
          <a className="btn btn--ghost" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><Phone size={18} aria-hidden="true" /> Call us</a>
          {!cancelled && <button className="btn btn--ghost" onClick={cancel}>Cancel booking</button>}
          <Link className="btn" to="/services">Book another service</Link>
        </div>
      </div>
    </section>
  );
}
