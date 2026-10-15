import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { CATEGORIES, SERVICES, byCategory } from '../data/services';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ServiceTile from '../components/ServiceTile';
import ServiceIcon from '../components/ServiceIcon';

export default function Services() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') || 'all';
  const q = params.get('q') || '';
  usePageMeta('All services', 'Home cleaning, car and bike wash, laundry, cooking, beauty and care. Flat prices and verified women professionals.');

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SERVICES.filter((s) => {
      if (cat !== 'all' && s.category !== cat) return false;
      if (!term) return true;
      return `${s.name} ${s.blurb} ${s.includes.join(' ')}`.toLowerCase().includes(term);
    });
  }, [cat, q]);

  const grouped = cat === 'all' && !q.trim();

  return (
    <>
      <PageHero title="Everything for your home, in one place." lede={`${SERVICES.length} services across ${CATEGORIES.length} categories. Tap one to see packages and flat prices.`} crumbs={[{ label: 'Services' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container">
          <div className="toolbar">
            <div className="search">
              <Search aria-hidden="true" />
              <input className="input" type="search" aria-label="Search services" placeholder="Search car wash, laundry, mehndi..." value={q} onChange={(e) => setParam('q', e.target.value)} />
            </div>
            <div className="chip-scroll" role="group" aria-label="Filter by category">
              <button className="chip" aria-pressed={cat === 'all'} onClick={() => setParam('cat', 'all')}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setParam('cat', c.id)}>{c.name}</button>
              ))}
            </div>
          </div>

          <p className="sr-only" role="status">{results.length} services shown</p>

          {results.length === 0 ? (
            <div className="empty">
              <h2 style={{ fontSize: 'var(--step-3)' }}>No service matches &ldquo;{q}&rdquo;.</h2>
              <p className="muted">Try a shorter word, or clear the filters to see everything.</p>
              <button className="btn" onClick={() => setParams({}, { replace: true })}>Clear filters</button>
            </div>
          ) : grouped ? (
            CATEGORIES.map((c) => (
              <section className="cat-block" key={c.id} aria-labelledby={`cat-${c.id}`}>
                <header>
                  <ServiceIcon name={c.icon} tone={c.tone} size="sm" />
                  <div>
                    <h2 id={`cat-${c.id}`}>{c.name}</h2>
                    <p className="muted">{c.blurb}</p>
                  </div>
                </header>
                <div className="tile-grid">
                  {byCategory(c.id).map((s) => <ServiceTile key={s.slug} service={s} />)}
                </div>
              </section>
            ))
          ) : (
            <div className="tile-grid">
              {results.map((s) => <ServiceTile key={s.slug} service={s} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
