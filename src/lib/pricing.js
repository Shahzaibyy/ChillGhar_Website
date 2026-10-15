// Illustrative repeat-booking discounts. Replace with values from the pricing service.
export const REPEAT_OPTIONS = [
  { id: 'once', label: 'Just once', discount: 0 },
  { id: 'weekly', label: 'Every week', discount: 0.1 },
  { id: 'monthly', label: 'Every month', discount: 0.05 },
];
export const REPEATABLE = new Set(['cleaning', 'vehicles', 'laundry', 'kitchen', 'care']);

export function computeTotal(pkg, repeat = 'once') {
  const opt = REPEAT_OPTIONS.find((o) => o.id === repeat) || REPEAT_OPTIONS[0];
  const discount = Math.round(pkg.price * opt.discount);
  return { subtotal: pkg.price, discount, total: pkg.price - discount };
}
