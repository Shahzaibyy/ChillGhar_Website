import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { store } from '../lib/storage';

const BookingContext = createContext(null);

export const EMPTY_DRAFT = {
  slug: '',
  pkgId: '',
  repeat: 'once',
  when: { mode: 'later', day: '', hour: null },
  address: { city: 'islamabad', area: '', house: '', landmark: '' },
  contact: { name: '', phone: '' },
  notes: '',
  pay: 'cash',
};

export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(() => ({ ...EMPTY_DRAFT, ...store.get('cg.draft', {}) }));

  const update = useCallback((patch) => {
    setDraft((prev) => {
      const next = { ...prev, ...patch };
      store.set('cg.draft', next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    store.remove('cg.draft');
  }, []);

  const value = useMemo(() => ({ draft, update, reset }), [draft, update, reset]);
  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export const useBooking = () => useContext(BookingContext);
