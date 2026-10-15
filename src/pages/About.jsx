import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';

export default function About() {
  usePageMeta('About us', 'Chill Ghar connects Pakistani households with verified women professionals, and creates work for women.');
  return (
    <>
      <PageHero title="Good help at home. Good work for women." lede="Chill Ghar is a Pakistani home-services company with two jobs: give households help they can trust, and give women a steady, respectful way to earn." crumbs={[{ label: 'About' }]} />
      <section className="section--tight">
        <div className="container container--narrow prose">
          <p>Finding reliable help at home is harder than it should be. Prices change at the door, people do not show up, and letting a stranger in is a worry. At the same time, many capable women in our cities want to earn but cannot find flexible, safe work close to home.</p>
          <p>Chill Ghar puts those two problems together and solves both. Women professionals are trained, verified and matched to jobs near them. Households get a flat price, a safety code and someone they can count on.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="about-values">
            <div><h2 style={{ fontSize: 'var(--step-2)' }} className="">Trust first</h2><p className="muted" style={{ marginTop: 8 }}>Verification, training and a safety code on every visit. We do not compromise on this to grow faster.</p></div>
            <div><h2 style={{ fontSize: 'var(--step-2)' }}>Dignity at work</h2><p className="muted" style={{ marginTop: 8 }}>Fair pay, weekly payouts, flexible hours and the right to say no to a job.</p></div>
            <div><h2 style={{ fontSize: 'var(--step-2)' }}>Plain pricing</h2><p className="muted" style={{ marginTop: 8 }}>One price per visit, shown before you book. No haggling, no surprises.</p></div>
            <div><h2 style={{ fontSize: 'var(--step-2)' }}>Made for Pakistan</h2><p className="muted" style={{ marginTop: 8 }}>JazzCash and Easypaisa, cash on service, Urdu and English, services for how we really live.</p></div>
          </div>
          <div className="cluster" style={{ marginTop: 48 }}>
            <Link className="btn" to="/services">Book a service</Link>
            <Link className="btn btn--ghost" to="/become-a-pro">Become a pro</Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
