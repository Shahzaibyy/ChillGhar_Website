import { useState } from 'react';
import { Banknote, CalendarClock, GraduationCap, HeartHandshake } from 'lucide-react';
import { CATEGORIES } from '../data/services';
import { CITIES } from '../data/cities';
import { submitForm } from '../lib/api';
import { normalizePhone } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import { SelectField, TextField } from '../components/Field';

const PERKS = [
  { Icon: Banknote, t: 'Earn weekly', d: 'Keep the larger share of every booking. Payouts go to JazzCash, Easypaisa or your bank account every week.' },
  { Icon: CalendarClock, t: 'Your hours', d: 'Set your own availability, switch it off any time, and accept only the jobs that suit you.' },
  { Icon: GraduationCap, t: 'Free training', d: 'Skills, customer care and safety training at no cost. No formal experience needed for many services.' },
  { Icon: HeartHandshake, t: 'Protected at work', d: 'You can end any visit if you feel unsafe. Our team backs you and handles customer issues.' },
];

export default function BecomePro() {
  usePageMeta('Become a pro', 'Earn on your own schedule. Apply to join Chill Ghar as a professional.');
  const [form, setForm] = useState({ name: '', phone: '', city: 'islamabad', skills: [], experience: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);

  const toggle = (id) => setForm((f) => ({ ...f, skills: f.skills.includes(id) ? f.skills.filter((s) => s !== id) : [...f.skills, id] }));

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Enter your full name.';
    if (!normalizePhone(form.phone)) er.phone = 'Enter a mobile number like 0300 1234567.';
    if (form.skills.length === 0) er.skills = 'Pick at least one kind of work.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const res = await submitForm('pro-application', { ...form, phone: normalizePhone(form.phone) });
    setBusy(false);
    setDone(res.ref);
  };

  return (
    <>
      <section className="band-violet">
        <div className="container section two-col" style={{ alignItems: 'start' }}>
          <div className="stack" style={{ '--stack': '22px' }}>
            <h1 style={{ fontSize: 'var(--step-4)' }}>Work on your own terms.</h1>
            <p className="lede">Join Chill Ghar as a professional. Do work you are good at, in your own city, and get paid every week.</p>
          </div>
          <div className="earn-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {PERKS.map(({ Icon, t, d }) => (
              <div className="earn" key={t}>
                <span className="glyph glyph--sun glyph--sm"><Icon aria-hidden="true" /></span>
                <h2 style={{ fontSize: 'var(--step-1)', color: '#fff' }}>{t}</h2>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container container--narrow">
          {done ? (
            <div className="success" role="status">
              <h2 style={{ fontSize: 'var(--step-3)' }}>Application received.</h2>
              <p className="muted">Reference {done}. Our onboarding team will call you within 3 working days to talk about the next step.</p>
            </div>
          ) : (
            <form className="stack" style={{ '--stack': '24px' }} onSubmit={submit} noValidate>
              <div className="stack" style={{ '--stack': '8px' }}>
                <h2 style={{ fontSize: 'var(--step-3)' }}>Apply in two minutes</h2>
                <p className="muted">You will need your CNIC, a smartphone and two references later in onboarding. Not today.</p>
              </div>
              <div className="form-grid">
                <TextField label="Full name" autoComplete="name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} error={errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0300 1234567" />
                <SelectField className="full" label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} options={CITIES.map((c) => ({ value: c.id, label: c.name }))} />
              </div>
              <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend>What work would you like to do?</legend>
                <div className="choice-row" style={{ marginTop: 10 }}>
                  {CATEGORIES.map((c) => (
                    <button type="button" key={c.id} className="chip" aria-pressed={form.skills.includes(c.id)} onClick={() => toggle(c.id)}>{c.name}</button>
                  ))}
                </div>
                {errors.skills && <span className="error" role="alert">{errors.skills}</span>}
              </fieldset>
              <button className="btn btn--lg" style={{ justifySelf: 'start' }} disabled={busy}>{busy ? 'Sending' : 'Submit application'}</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
