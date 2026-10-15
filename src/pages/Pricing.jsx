import { Link } from 'react-router-dom';
import { BadgeCheck } from 'lucide-react';
import { CATEGORIES, byCategory, fromPrice } from '../data/services';
import { pkr } from '../lib/format';
import { REPEAT_OPTIONS } from '../lib/pricing';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

export default function Pricing() {
  usePageMeta('Pricing', 'Flat per-visit prices for every Chill Ghar service. No visit fee, no hidden charges.');
  return (
    <>
      <PageHero title="One flat price. Shown before you book." lede="No visit fee, no per-hour surprises, no bargaining at the door. These are our starting prices per visit." crumbs={[{ label: 'Pricing' }]} />
      <section className="section--tight" style={{ paddingBottom: 72 }}>
        <div className="container stack" style={{ '--stack': '40px' }}>
          {CATEGORIES.map((c) => (
            <div key={c.id}>
              <h2 style={{ fontSize: 'var(--step-2)', marginBottom: 14 }}>{c.name}</h2>
              <div className="table-wrap">
                <table>
                  <caption className="sr-only">{c.name} starting prices</caption>
                  <thead><tr><th scope="col">Service</th><th scope="col" className="num">Starts at</th><th scope="col"><span className="sr-only">Details</span></th></tr></thead>
                  <tbody>
                    {byCategory(c.id).map((s) => (
                      <tr key={s.slug}>
                        <th scope="row" style={{ fontWeight: 600 }}>{s.name}</th>
                        <td className="num"><strong>{pkr(fromPrice(s))}</strong></td>
                        <td><Link to={`/services/${s.slug}`}>See packages</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <div className="notice">
            <BadgeCheck aria-hidden="true" />
            <p>
              Book on repeat and pay less per visit:{' '}
              {REPEAT_OPTIONS.filter((o) => o.discount).map((o) => `${o.label.toLowerCase()} saves ${Math.round(o.discount * 100)}%`).join(', ')}.
              Prices may vary by city and are confirmed before you pay.
            </p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
