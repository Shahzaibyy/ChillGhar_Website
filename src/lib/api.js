// Mock API layer. Every function returns a Promise so screens are already
// written the way they will talk to the Go backend. Swap the bodies for fetch()
// calls to the real endpoints (see README for the suggested route map).
import { store } from './storage';

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));
const rand = (n) => Math.floor(Math.random() * 10 ** n).toString().padStart(n, '0');

export async function submitForm(kind, payload) {
  await wait();
  const all = store.get('cg.forms', []);
  all.push({ kind, payload, at: new Date().toISOString() });
  store.set('cg.forms', all);
  return { ok: true, ref: `CG-${rand(5)}` };
}

export async function sendOtp(phone) {
  await wait(500);
  return { ok: true, phone };
}

export async function verifyOtp(phone, code) {
  await wait(500);
  // Demo rule: any 4 digit code works. The real API verifies against the SMS code.
  if (!/^\d{4}$/.test(code)) throw new Error('Enter the 4 digit code we sent you.');
  return { phone, name: '' };
}

export async function createBooking(draft) {
  await wait(900);
  const booking = {
    ...draft,
    id: `CG-${rand(6)}`,
    safetyCode: rand(4),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  const all = store.get('cg.bookings', []);
  store.set('cg.bookings', [booking, ...all]);
  return booking;
}

export const listBookings = () => store.get('cg.bookings', []);
export const getBooking = (id) => listBookings().find((b) => b.id === id) || null;

export function updateBooking(id, patch) {
  const all = listBookings().map((b) => (b.id === id ? { ...b, ...patch } : b));
  store.set('cg.bookings', all);
}
