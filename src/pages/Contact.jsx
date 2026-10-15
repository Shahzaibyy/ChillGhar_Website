import { useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { SITE } from '../lib/site';
import { submitForm } from '../lib/api';
import { isEmail } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import { SelectField, TextAreaField, TextField } from '../components/Field';

export default function Contact() {
  usePageMeta('Contact us', 'Reach Chill Ghar support by WhatsApp, phone, email or the contact form.');
  const [form, setForm] = useState({ name: '', email: '', topic: 'booking', message: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Enter your name.';
    if (!isEmail(form.email)) er.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) er.message = 'Tell us a little more, at least 10 characters.';
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    const res = await submitForm('contact', form);
    setBusy(false);
    setDone(res.ref);
  };

  return (
    <>
      <PageHero title="Talk to a real person." lede={`${SITE.hours}. WhatsApp is fastest.`} crumbs={[{ label: 'Contact' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container two-col" style={{ alignItems: 'start' }}>
          <div className="contact-cards">
            <a className="contact-card" href={`https://wa.me/${SITE.whatsapp}`}><span className="glyph glyph--sun glyph--sm"><MessageCircle aria-hidden="true" /></span><div><strong>WhatsApp</strong><small>{SITE.phone}</small></div></a>
            <a className="contact-card" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><span className="glyph glyph--sm"><Phone aria-hidden="true" /></span><div><strong>Call</strong><small>{SITE.phone}</small></div></a>
            <a className="contact-card" href={`mailto:${SITE.email}`}><span className="glyph glyph--ink glyph--sm"><Mail aria-hidden="true" /></span><div><strong>Email</strong><small>{SITE.email}</small></div></a>
          </div>
          <div className="panel">
            {done ? (
              <div className="success" role="status">
                <h2 style={{ fontSize: 'var(--step-3)' }}>Message sent.</h2>
                <p className="muted">Reference {done}. We reply within one working day.</p>
              </div>
            ) : (
              <form className="stack" style={{ '--stack': '18px' }} onSubmit={submit} noValidate>
                <h2>Send us a message</h2>
                <TextField label="Name" autoComplete="name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField label="Email" type="email" autoComplete="email" value={form.email} error={errors.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <SelectField label="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} options={[{ value: 'booking', label: 'A booking' }, { value: 'feedback', label: 'Feedback' }, { value: 'partnership', label: 'Partnership or press' }, { value: 'other', label: 'Something else' }]} />
                <TextAreaField label="Message" value={form.message} error={errors.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button className="btn btn--lg" disabled={busy}>{busy ? 'Sending' : 'Send message'}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
