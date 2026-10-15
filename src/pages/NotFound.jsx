import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page not found');
  return (
    <section className="nf">
      <div>
        <span className="glyph glyph--sun glyph--lg"><SearchX aria-hidden="true" /></span>
        <h1>We could not find that page.</h1>
        <p className="lede" style={{ marginInline: 'auto' }}>The link may be old or mistyped. Start from the services list or head back home.</p>
        <div className="cluster" style={{ justifyContent: 'center', marginTop: 28 }}>
          <Link className="btn" to="/services">Browse services</Link>
          <Link className="btn btn--ghost" to="/">Go home</Link>
        </div>
      </div>
    </section>
  );
}
