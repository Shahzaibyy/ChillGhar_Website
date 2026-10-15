export const pkr = (n) => `Rs ${Number(n).toLocaleString('en-PK')}`;

export const duration = (mins) => {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};

// Accepts 03XXXXXXXXX, 3XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX
export const normalizePhone = (value) => {
  const digits = String(value).replace(/[^\d]/g, '');
  if (/^03\d{9}$/.test(digits)) return digits;
  if (/^923\d{9}$/.test(digits)) return `0${digits.slice(2)}`;
  if (/^3\d{9}$/.test(digits)) return `0${digits}`;
  return null;
};

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const dayLabel = (date) =>
  date.toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' });

export const slotLabel = (hour) => {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:00 ${hour < 12 ? 'am' : 'pm'}`;
};
