import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { listBookings } from '../lib/api';
import { dayLabel, pkr, slotLabel } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ServiceIcon from '../components/ServiceIcon';
import { TextField } from '../components/Field';

export default function Account() {
  usePageMeta('My account');
  const { user, logout, updateUser } = useAuth();
  const { notify } = useToast();
  const [tab, setTab] = useState('bookings');
  const [name, setName] = useState(user?.name || '');
  const bookings = listBookings();

  return (
    <>
      <PageHero title={user?.name ? `Salaam, ${user.name.split(' ')[0]}.` : 'My account'} crumbs={[{ label: 'Account' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container acct-grid">
          <nav className="acct-nav" aria-label="Account sections">
            <button aria-current={tab === 'bookings'} onClick={() => setTab('bookings')}><CalendarClock aria-hidden="true" /> My bookings</button>
            <button aria-current={tab === 'profile'} onClick={() => setTab('profile')}><User aria-hidden="true" /> Profile</button>
            <button onClick={logout}><LogOut aria-hidden="true" /> Log out</button>
          </nav>

          {tab === 'bookings' ? (
            <div className="stack">
              <h2 style={{ fontSize: 'var(--step-3)' }}>My bookings</h2>
              {bookings.length === 0 ? (
                <div className="empty">
                  <p className="muted">No bookings yet. Your first one takes under a minute.</p>
                  <Link className="btn" to="/services">Browse services</Link>
                </div>
              ) : (
                bookings.map((b) => (
                  <Link key={b.id} className="booking-row" to={`/bookings/${b.id}`}>
                    <ServiceIcon name={b.icon} tone={b.tone} size="sm" />
                    <div>
                      <strong>{b.serviceName}</strong>
                      <small>
                        {b.when.mode === 'now' ? 'Now' : `${dayLabel(new Date(`${b.when.day}T00:00:00`))}, ${slotLabel(b.when.hour)}`} &middot; {b.id}
                      </small>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong>{pkr(b.totals.total)}</strong>
                      <span className={`badge ${b.status === 'cancelled' ? '' : 'badge--ok'}`}>{b.status === 'cancelled' ? 'Cancelled' : 'Confirmed'}</span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          ) : (
            <form
              className="stack"
              style={{ maxWidth: 460 }}
              onSubmit={(e) => {
                e.preventDefault();
                updateUser({ name: name.trim() });
                notify('Profile saved');
              }}
            >
              <h2 style={{ fontSize: 'var(--step-3)' }}>Profile</h2>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              <TextField label="Mobile number" value={user?.phone || ''} readOnly hint="Your number is your login." />
              <button className="btn" style={{ justifySelf: 'start' }}>Save changes</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
