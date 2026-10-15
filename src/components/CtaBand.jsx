import { Link } from 'react-router-dom';
import { Smartphone } from 'lucide-react';

export default function CtaBand({ title = 'Chill kar. Kaam hum kar lenge.', text = 'Book your first service in under a minute.' }) {
  return (
    <section className="section band-violet">
      <div className="container cta">
        <div className="stack" style={{ '--stack': '16px' }}>
          <h2 style={{ maxWidth: '16ch' }}>{title}</h2>
          <p className="lede">{text}</p>
        </div>
        <div className="stack" style={{ '--stack': '12px' }}>
          <Link to="/services" className="btn btn--sun btn--lg">Book a service</Link>
          <span className="store-btn" role="note" aria-label="Mobile apps coming soon">
            <Smartphone aria-hidden="true" />
            <span><small>Android and iOS apps</small><strong>Coming soon</strong></span>
          </span>
        </div>
      </div>
    </section>
  );
}
