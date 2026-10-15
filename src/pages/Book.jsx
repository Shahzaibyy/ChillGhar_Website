import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Banknote, Smartphone, CreditCard, Zap, KeyRound } from 'lucide-react';
import { bySlug, categoryOf } from '../data/services';
import { CITIES, cityById } from '../data/cities';
import { computeTotal, REPEAT_OPTIONS, REPEATABLE } from '../lib/pricing';
import { SLOT_HOURS, isoDay, nextDays, slotAvailable } from '../lib/slots';
import { dayLabel, duration, normalizePhone, pkr, slotLabel } from '../lib/format';
import { createBooking } from '../lib/api';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { SelectField, TextAreaField, TextField } from '../components/Field';
import ServiceIcon from '../components/ServiceIcon';
import NotFound from './NotFound';

const STEPS = ['Package', 'When and where', 'Review and pay'];
const PAY = [
  { id: 'cash', label: 'Cash on service', note: 'Pay your pro after the job', Icon: Banknote },
  { id: 'jazzcash', label: 'JazzCash', note: 'Pay in the app after the job', Icon: Smartphone },
  { id: 'easypaisa', label: 'Easypaisa', note: 'Pay in the app after the job', Icon: Smartphone },
  { id: 'card', label: 'Debit or credit card', note: 'Pay in the app after the job', Icon: CreditCard },
];

export default function Book() {
  const { slug } = useParams();
  const service = bySlug(slug);
  if (!service) return <NotFound />;
  return <Flow key={slug} service={service} />;
}

function Flow({ service }) {
  const [params] = useSearchParams();
  const { draft, update, reset } = useBooking();
  const { user } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const cat = categoryOf(service);
  usePageMeta(`Book ${service.name}`);

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Initialise the draft for this service once, from the ?pkg= query when present.
  useEffect(() => {
    const wanted = params.get('pkg');
    const valid = service.packages.find((p) => p.id === wanted);
    if (draft.slug !== service.slug) {
      update({
        slug: service.slug,
        pkgId: (valid || service.packages[0]).id,
        repeat: 'once',
        when: { mode: 'later', day: '', hour: null },
        contact: { name: user?.name || draft.contact.name, phone: user?.phone || draft.contact.phone },
      });
    } else if (valid && valid.id !== draft.pkgId) {
      update({ pkgId: valid.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.slug]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: false });
  }, [step]);

  const ready = draft.slug === service.slug;
  const pkg = service.packages.find((p) => p.id === draft.pkgId) || service.packages[0];
  const totals = computeTotal(pkg, draft.repeat);
  const city = cityById(draft.address.city);
  const days = useMemo(() => nextDays(7), []);
  const canRepeat = REPEATABLE.has(service.category);

  const setWhen = (patch) => update({ when: { ...draft.when, ...patch } });
  const setAddress = (patch) => update({ address: { ...draft.address, ...patch } });
  const setContact = (patch) => update({ contact: { ...draft.contact, ...patch } });

  const validateWhen = () => {
    const e = {};
    if (draft.when.mode === 'later') {
      if (!draft.when.day) e.day = 'Pick a day.';
      else if (draft.when.hour == null) e.hour = 'Pick a start time.';
    }
    if (!draft.address.area) e.area = 'Choose your area.';
    if (!draft.address.house.trim()) e.house = 'Enter your house or flat number and street.';
    if (!draft.contact.name.trim()) e.name = 'Enter the name for this booking.';
    if (!normalizePhone(draft.contact.phone)) e.phone = 'Enter a mobile number like 0300 1234567.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateWhen()) return;
    setStep((s) => Math.min(2, s + 1));
  };

  const confirm = async () => {
    setBusy(true);
    setSubmitError('');
    try {
      const day = draft.when.mode === 'now' ? isoDay(new Date()) : draft.when.day;
      const booking = await createBooking({
        slug: service.slug,
        serviceName: service.name,
        icon: service.icon,
        tone: cat.tone,
        pkg: { id: pkg.id, name: pkg.name, mins: pkg.mins, price: pkg.price },
        repeat: draft.repeat,
        when: { mode: draft.when.mode, day, hour: draft.when.mode === 'now' ? null : draft.when.hour },
        address: { ...draft.address, cityName: city.name },
        contact: { name: draft.contact.name.trim(), phone: normalizePhone(draft.contact.phone) },
        notes: draft.notes.trim(),
        pay: draft.pay,
        totals,
      });
      reset();
      notify('Booking confirmed');
      navigate(`/bookings/${booking.id}`, { replace: true });
    } catch {
      setSubmitError('We could not place your booking. Check your connection and try again.');
      setBusy(false);
    }
  };

  if (!ready) return null;

  const whenText =
    draft.when.mode === 'now'
      ? 'Now, within about 60 minutes'
      : draft.when.day && draft.when.hour != null
        ? `${dayLabel(new Date(`${draft.when.day}T00:00:00`))}, ${slotLabel(draft.when.hour)}`
        : 'Not chosen yet';

  return (
    <section className="section--tight" style={{ paddingBottom: 96 }}>
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb" style={{ marginTop: 28 }}>
          <Link to="/services">Services</Link>
          <span>/ <Link to={`/services/${service.slug}`}>{service.name}</Link></span>
          <span aria-current="page">/ Book</span>
        </nav>
        <ol className="stepper" aria-label="Booking steps">
          {STEPS.map((label, i) => (
            <li key={label} aria-current={i === step ? 'step' : undefined} className={i < step ? 'done' : ''}>
              <b>{i < step ? <Check size={14} aria-hidden="true" /> : i + 1}</b>
              {label}
            </li>
          ))}
        </ol>

        <div className="flow">
          <div className="panel">
            {step === 0 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 'var(--step-3)' }}>{service.name}</h1>
                <div className="pkg-list" role="group" aria-label="Packages">
                  {service.packages.map((p) => (
                    <button key={p.id} className="pkg" aria-pressed={p.id === pkg.id} onClick={() => update({ pkgId: p.id })}>
                      <span><strong>{p.name}</strong><small>{p.detail} &middot; about {duration(p.mins)}</small></span>
                      <span className="pkg__price">{pkr(p.price)}</span>
                    </button>
                  ))}
                </div>
                {canRepeat && (
                  <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
                    <legend>How often?</legend>
                    <div className="choice-row" style={{ marginTop: 8 }}>
                      {REPEAT_OPTIONS.map((o) => (
                        <button key={o.id} className="chip" aria-pressed={draft.repeat === o.id} onClick={() => update({ repeat: o.id })}>
                          {o.label}{o.discount ? ` (save ${Math.round(o.discount * 100)}%)` : ''}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </>
            )}

            {step === 1 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 'var(--step-3)' }}>When and where</h1>

                <div className="stack">
                  <h2>When should the pro arrive?</h2>
                  <div className="choice-row">
                    <button className="chip" aria-pressed={draft.when.mode === 'now'} onClick={() => setWhen({ mode: 'now', day: '', hour: null })}>
                      <Zap aria-hidden="true" /> Now
                    </button>
                    <button className="chip" aria-pressed={draft.when.mode === 'later'} onClick={() => setWhen({ mode: 'later' })}>Schedule</button>
                  </div>
                  {draft.when.mode === 'later' && (
                    <>
                      <div className="day-row" role="group" aria-label="Choose a day">
                        {days.map((d) => {
                          const iso = isoDay(d);
                          const label = dayLabel(d).split(' ');
                          return (
                            <button key={iso} className="chip day-btn" aria-pressed={draft.when.day === iso} onClick={() => setWhen({ day: iso, hour: null })}>
                              <small>{label[0]}</small>
                              <span>{label.slice(1).join(' ')}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.day && <p className="error" role="alert">{errors.day}</p>}
                      {draft.when.day && (
                        <div className="slot-grid" role="group" aria-label="Choose a start time">
                          {SLOT_HOURS.map((h) => (
                            <button key={h} className="chip" disabled={!slotAvailable(draft.when.day, h)} aria-pressed={draft.when.hour === h} onClick={() => setWhen({ hour: h })}>
                              {slotLabel(h)}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.hour && <p className="error" role="alert">{errors.hour}</p>}
                    </>
                  )}
                </div>

                <div className="stack">
                  <h2>Where?</h2>
                  <div className="form-grid">
                    <SelectField label="City" value={draft.address.city} onChange={(e) => setAddress({ city: e.target.value, area: '' })} options={CITIES.map((c) => ({ value: c.id, label: c.name }))} />
                    <SelectField label="Area or sector" value={draft.address.area} error={errors.area} onChange={(e) => setAddress({ area: e.target.value })} options={[{ value: '', label: 'Choose area' }, ...city.areas.map((a) => ({ value: a, label: a }))]} />
                    <TextField className="full" label="House or flat, and street" autoComplete="street-address" value={draft.address.house} error={errors.house} onChange={(e) => setAddress({ house: e.target.value })} placeholder="House 12, Street 4" />
                    <TextField className="full" label="Landmark (optional)" value={draft.address.landmark} onChange={(e) => setAddress({ landmark: e.target.value })} hint="A mosque, shop or school nearby helps your pro find you." />
                  </div>
                </div>

                <div className="stack">
                  <h2>Who is this for?</h2>
                  <div className="form-grid">
                    <TextField label="Name" autoComplete="name" value={draft.contact.name} error={errors.name} onChange={(e) => setContact({ name: e.target.value })} />
                    <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={draft.contact.phone} error={errors.phone} onChange={(e) => setContact({ phone: e.target.value })} placeholder="0300 1234567" />
                    <TextAreaField className="full" label="Notes for your pro (optional)" value={draft.notes} onChange={(e) => update({ notes: e.target.value })} hint="Gate code, pets at home, anything she should know." />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 ref={headingRef} tabIndex={-1} style={{ fontSize: 'var(--step-3)' }}>Review and pay</h1>
                <div className="stack">
                  <h2>How will you pay?</h2>
                  <div className="stack" style={{ '--stack': '10px' }} role="group" aria-label="Payment method">
                    {PAY.map(({ id, label, note, Icon }) => (
                      <button key={id} className="pay-opt" aria-pressed={draft.pay === id} onClick={() => update({ pay: id })}>
                        <span className="glyph glyph--mist glyph--sm"><Icon aria-hidden="true" /></span>
                        <span><strong>{label}</strong><small>{note}</small></span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="notice">
                  <KeyRound aria-hidden="true" />
                  <p>After you confirm, you get a 4 digit safety code. Share it with your pro at the door to start the job. You are only charged after the service.</p>
                </div>
                {submitError && <p className="error" role="alert">{submitError}</p>}
              </>
            )}

            <div className="actions">
              {step > 0 ? (
                <button className="btn btn--ghost" onClick={() => setStep(step - 1)}><ArrowLeft size={18} aria-hidden="true" /> Back</button>
              ) : (
                <Link className="btn btn--ghost" to={`/services/${service.slug}`}><ArrowLeft size={18} aria-hidden="true" /> Service details</Link>
              )}
              {step < 2 ? (
                <button className="btn" onClick={next}>Continue <ArrowRight size={18} aria-hidden="true" /></button>
              ) : (
                <button className="btn btn--sun btn--lg" onClick={confirm} disabled={busy} aria-busy={busy}>
                  {busy ? <span className="spinner" aria-hidden="true" /> : null}
                  {busy ? 'Placing booking' : `Confirm booking, ${pkr(totals.total)}`}
                </button>
              )}
            </div>
          </div>

          <aside className="summary" aria-label="Order summary">
            <div className="cluster" style={{ flexWrap: 'nowrap' }}>
              <ServiceIcon name={service.icon} tone={cat.tone} size="sm" />
              <div>
                <strong style={{ fontFamily: 'var(--font-display)' }}>{service.name}</strong>
                <div className="muted" style={{ fontSize: '0.9rem' }}>{pkg.name}</div>
              </div>
            </div>
            <dl>
              <div><dt>When</dt><dd>{whenText}</dd></div>
              <div><dt>Where</dt><dd>{draft.address.area ? `${draft.address.area}, ${city.name}` : city.name}</dd></div>
              <div><dt>Repeat</dt><dd>{REPEAT_OPTIONS.find((o) => o.id === draft.repeat)?.label}</dd></div>
              <div><dt>Package</dt><dd>{pkr(totals.subtotal)}</dd></div>
              {totals.discount > 0 && <div><dt>Repeat saving</dt><dd>- {pkr(totals.discount)}</dd></div>}
              <div><dt>Visit fee</dt><dd>Rs 0</dd></div>
              <div className="grand"><dt>Total</dt><dd>{pkr(totals.total)}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
