import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, Clock, BadgeCheck, KeyRound, ArrowRight, Repeat } from 'lucide-react';
import { bySlug, categoryOf, byCategory } from '../data/services';
import { pkr, duration } from '../lib/format';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import ServiceIcon from '../components/ServiceIcon';
import ServiceTile from '../components/ServiceTile';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = bySlug(slug);
  if (!service) return <NotFound />;
  return <Detail key={slug} service={service} />;
}

function Detail({ service }) {
  const cat = categoryOf(service);
  const [pkgId, setPkgId] = useState(service.packages[0].id);
  const pkg = service.packages.find((p) => p.id === pkgId);
  const related = byCategory(service.category).filter((s) => s.slug !== service.slug).slice(0, 5);
  usePageMeta(service.name, service.blurb);

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 8 }}>
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/ <Link to="/services">Services</Link></span>
            <span>/ <Link to={`/services?cat=${cat.id}`}>{cat.name}</Link></span>
            <span aria-current="page">/ {service.name}</span>
          </nav>
        </div>
      </section>
      <section className="section--tight detail-pad" style={{ paddingBottom: 80 }}>
        <div className="container detail">
          <div>
            <div className="detail__head">
              <ServiceIcon name={service.icon} tone={cat.tone} size="lg" />
              <h1>{service.name}</h1>
            </div>
            <p className="lede">{service.blurb}</p>

            <h2 style={{ fontSize: 'var(--step-2)', margin: '44px 0 16px' }}>Choose a package</h2>
            <div className="pkg-list" role="group" aria-label="Packages">
              {service.packages.map((p) => (
                <button key={p.id} className="pkg" aria-pressed={p.id === pkgId} onClick={() => setPkgId(p.id)}>
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.detail} &middot; about {duration(p.mins)}</small>
                  </span>
                  <span className="pkg__price">{pkr(p.price)}</span>
                </button>
              ))}
            </div>

            <h2 style={{ fontSize: 'var(--step-2)', margin: '44px 0 8px' }}>What is included</h2>
            <ul className="includes">
              {service.includes.map((i) => (
                <li key={i}><Check aria-hidden="true" />{i}</li>
              ))}
            </ul>
            <div className="notice" style={{ marginTop: 28 }}>
              <BadgeCheck aria-hidden="true" />
              <p>Prices are flat per visit. If the job turns out bigger than described, your pro will tell you and you approve any change before she starts.</p>
            </div>
          </div>

          <aside className="sticky-card" aria-label="Booking summary">
            <h2 className="sticky-title" style={{ fontSize: 'var(--step-1)' }}>{pkg.name}</h2>
            <div className="total">
              <span className="muted">Flat price</span>
              <strong>{pkr(pkg.price)}</strong>
            </div>
            <ul className="mini-list">
              <li><Clock aria-hidden="true" /> About {duration(pkg.mins)}</li>
              <li><KeyRound aria-hidden="true" /> Safety code at your door</li>
              <li><Repeat aria-hidden="true" /> Weekly or monthly repeat available</li>
            </ul>
            <Link className="btn btn--lg btn--block" to={`/book/${service.slug}?pkg=${pkg.id}`}>
              Book now <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section band-mist">
          <div className="container">
            <div className="section-head"><h2>More in {cat.name.toLowerCase()}</h2></div>
            <div className="tile-grid">{related.map((s) => <ServiceTile key={s.slug} service={s} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
