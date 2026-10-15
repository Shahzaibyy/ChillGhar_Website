import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import Logo from './Logo';
import { CATEGORIES } from '../data/services';
import { useAuth } from '../context/AuthContext';

const LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/safety', label: 'Safety' },
  { to: '/cities', label: 'Cities' },
  { to: '/become-a-pro', label: 'Become a pro' },
];

export default function Header() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const megaRef = useRef(null);

  // Menu state is tied to the path it was opened on, so navigating closes it without an effect.
  const [menu, setMenu] = useState({ path: pathname, mega: false, drawer: false });
  const fresh = menu.path === pathname;
  const mega = fresh && menu.mega;
  const drawer = fresh && menu.drawer;
  const setMega = (v) => setMenu({ path: pathname, mega: typeof v === 'function' ? v(mega) : v, drawer: false });
  const setDrawer = (v) => setMenu({ path: pathname, mega: false, drawer: typeof v === 'function' ? v(drawer) : v });

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMega(false);
        setDrawer(false);
      }
    };
    const onClick = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMega(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawer]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo className="header__logo" />
        <nav className="nav" aria-label="Main">
          <div className="nav__item" ref={megaRef}>
            <button className="nav__btn" aria-expanded={mega} aria-controls="mega" onClick={() => setMega((v) => !v)}>
              Services <ChevronDown size={16} aria-hidden="true" />
            </button>
            {mega && (
              <div className="mega" id="mega">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} className="mega__cat" to={`/services?cat=${c.id}`}>
                    <span className={`glyph glyph--sm ${c.tone !== 'violet' ? `glyph--${c.tone}` : ''}`} aria-hidden="true" />
                    <div>
                      <strong>{c.name}</strong>
                      <span>{c.blurb}</span>
                    </div>
                  </Link>
                ))}
                <Link className="mega__all" to="/services">
                  See all services
                </Link>
              </div>
            )}
          </div>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="nav__link">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Link className="btn btn--ghost btn--sm" to={user ? '/account' : '/login'}>
            <User size={16} aria-hidden="true" />
            {user ? 'My account' : 'Log in'}
          </Link>
          <Link className="btn btn--sm" to="/services">
            Book now
          </Link>
          <button
            className="menu-toggle"
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            aria-expanded={drawer}
            aria-controls="drawer"
            onClick={() => setDrawer((v) => !v)}
          >
            {drawer ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav className="drawer" id="drawer" hidden={!drawer} aria-label="Mobile">
        <Link to="/services">All services</Link>
        {LINKS.map((l) => (
          <Link key={l.to} to={l.to}>
            {l.label}
          </Link>
        ))}
        <Link to="/faq">FAQs</Link>
        <Link className="btn btn--ink" to={user ? '/account' : '/login'}>
          {user ? 'My account' : 'Log in'}
        </Link>
      </nav>
    </header>
  );
}
