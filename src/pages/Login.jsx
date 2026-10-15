import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from '../lib/api';
import { normalizePhone } from '../lib/format';
import { useAuth } from '../context/AuthContext';
import { usePageMeta } from '../hooks/usePageMeta';
import Logo from '../components/Logo';
import { TextField } from '../components/Field';

export default function Login() {
  usePageMeta('Log in');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from || '/account';

  const [phase, setPhase] = useState('phone');
  const [phoneInput, setPhoneInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={dest} replace />;

  const submitPhone = async (e) => {
    e.preventDefault();
    const phone = normalizePhone(phoneInput);
    if (!phone) return setError('Enter a mobile number like 0300 1234567.');
    setError('');
    setBusy(true);
    await sendOtp(phone);
    setBusy(false);
    setPhase('code');
  };

  const submitCode = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const u = await verifyOtp(normalizePhone(phoneInput), code);
      login(u);
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <section className="auth">
      <div className="auth__card">
        <Logo height={40} />
        {phase === 'phone' ? (
          <form className="stack" style={{ '--stack': '20px' }} onSubmit={submitPhone} noValidate>
            <div className="stack" style={{ '--stack': '8px' }}>
              <h1 style={{ fontSize: 'var(--step-3)' }}>Log in or sign up</h1>
              <p className="muted">We will text you a 4 digit code. No password needed.</p>
            </div>
            <TextField label="Mobile number" type="tel" inputMode="tel" autoComplete="tel" placeholder="0300 1234567" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} error={error} />
            <button className="btn btn--lg btn--block" disabled={busy}>{busy ? 'Sending code' : 'Send code'}</button>
          </form>
        ) : (
          <form className="stack" style={{ '--stack': '20px' }} onSubmit={submitCode} noValidate>
            <div className="stack" style={{ '--stack': '8px' }}>
              <h1 style={{ fontSize: 'var(--step-3)' }}>Enter your code</h1>
              <p className="muted">Sent to {normalizePhone(phoneInput)}. <button type="button" className="btn btn--ghost btn--sm" style={{ minHeight: 0, padding: '2px 10px' }} onClick={() => { setPhase('phone'); setCode(''); setError(''); }}>Change number</button></p>
            </div>
            <TextField label="4 digit code" inputMode="numeric" autoComplete="one-time-code" maxLength={4} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} error={error} hint="Demo build: any 4 digits will work." />
            <button className="btn btn--lg btn--block" disabled={busy || code.length < 4}>{busy ? 'Checking' : 'Log in'}</button>
          </form>
        )}
      </div>
    </section>
  );
}
