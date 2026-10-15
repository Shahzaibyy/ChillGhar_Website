export const SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

export function nextDays(count = 7, from = new Date()) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(from);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    return d;
  });
}

export const isoDay = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// A slot is bookable if it starts at least 2 hours from now.
export function slotAvailable(dayIso, hour, now = new Date()) {
  const [y, m, d] = dayIso.split('-').map(Number);
  const start = new Date(y, m - 1, d, hour, 0, 0);
  return start.getTime() - now.getTime() >= 2 * 60 * 60 * 1000;
}
