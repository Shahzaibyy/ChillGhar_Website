import { useState } from 'react';
import { CITIES } from '../data/cities';
import { submitForm } from '../lib/api';
import { normalizePhone } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import { SelectField, TextField } from '../components/Field';

export default function Cities() {
  usePageMeta('Cities', 'Chill Ghar is launching in Islamabad and Rawalpindi first. Join the waitlist for your city.');
  const [form, setForm] = useState({ city: 'islamabad', area: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.area.trim()) er.area = 'Tell us your area or locality.';
    if (!normalizePhone(form.phone)) er.phone = 'Enter a mobile number like 0300 1234567.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const res = await submitForm('locality-request', { ...form, phone: normalizePhone(form.phone) });
    setBusy(false);
    setDone(res.ref);
  };

  return (
    <>
      <PageHero title="Opening in the twin cities first." lede="We are starting small so every visit is great, then growing city by city. Request Chill Ghar in your locality and we will text you when we arrive." crumbs={[{ label: 'Cities' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container two-col" style={{ alignItems: 'start' }}>
          <ul className="stack" style={{ '--stack': '0' }}>
            {CITIES.map((c) => (
              <li key={c.id} id={c.id} className="feature" style={{ gridTemplateColumns: '1fr auto', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: 'var(--step-2)' }}>{c.name}</h2>
                  <p className="muted" style={{ fontSize: '0.92rem' }}>{c.areas.filter((a) => a !== 'Other').slice(0, 6).join(', ')}{c.areas.length > 7 ? ' and more' : ''}</p>
                </div>
                <span className={`badge ${c.status === 'Launching first' ? 'badge--ok' : c.status === 'Next' ? 'badge--sun' : ''}`}>{c.status}</span>
              </li>
            ))}
          </ul>
          <div className="panel">
            {done ? (
              <div className="success" role="status">
                <h3>You are on the list.</h3>
                <p className="muted">Reference {done}. We will text you as soon as Chill Ghar reaches your area.</p>
              </div>
            ) : (
              <form className="stack" style={{ '--stack': '18px' }} onSubmit={submit} noValidate>
                <h2>Request Chill Ghar in your locality</h2>
                <SelectField label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} options={CITIES.map((c) => ({ value: c.id, label: c.name }))} />
                <TextField label="Area or sector" value={form.area} error={errors.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="F-10, DHA Phase 2..." />
                <TextField label="Mobile number" type="tel" inputMode="tel" value={form.phone} error={errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0300 1234567" />
                <button className="btn btn--lg" disabled={busy}>{busy ? 'Sending' : 'Notify me'}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
