import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { store } from '../lib/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => store.get('cg.user', null));

  const login = useCallback((u) => {
    setUser(u);
    store.set('cg.user', u);
  }, []);

  const updateUser = useCallback((patch) => {
    setUser((prev) => {
      const next = { ...prev, ...patch };
      store.set('cg.user', next);
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    store.remove('cg.user');
  }, []);

  const value = useMemo(() => ({ user, login, logout, updateUser }), [user, login, logout, updateUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
