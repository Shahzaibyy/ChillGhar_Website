import { Link } from 'react-router-dom';
import { FAQS } from '../data/faqs';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import Accordion from '../components/Accordion';

export default function Faq() {
  usePageMeta('FAQs', 'Answers about booking, prices, payment, safety and working with Chill Ghar.');
  return (
    <>
      <PageHero title="Questions, answered." lede="Cannot find yours? Message us and we will reply within a working day." crumbs={[{ label: 'FAQs' }]} />
      <section className="section--tight" style={{ paddingBottom: 96 }}>
        <div className="container container--narrow stack" style={{ '--stack': '56px' }}>
          {FAQS.map((g) => (
            <div key={g.group}>
              <h2 style={{ fontSize: 'var(--step-3)', marginBottom: 16 }}>{g.group}</h2>
              <Accordion items={g.items} />
            </div>
          ))}
          <p>Still need help? <Link to="/contact">Contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}
