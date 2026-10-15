import { Link } from 'react-router-dom';

export default function PageHero({ title, lede, crumbs }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c, i) =>
              c.to ? (
                <span key={c.label}>/ <Link to={c.to}>{c.label}</Link></span>
              ) : (
                <span key={c.label} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>/ {c.label}</span>
              ),
            )}
          </nav>
        )}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </section>
  );
}
