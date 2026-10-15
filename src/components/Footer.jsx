import { Link } from 'react-router-dom';
import Logo from './Logo';
import { CATEGORIES } from '../data/services';
import { CITIES } from '../data/cities';
import { SITE } from '../lib/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="reverse" height={44} />
            <p>{SITE.tagline}</p>
            <p style={{ marginTop: 12, maxWidth: '34ch' }}>Verified women professionals for everything at home. Flat prices, safe visits.</p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {CATEGORIES.map((c) => (
                <li key={c.id}><Link to={`/services?cat=${c.id}`}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/become-a-pro">Become a pro</Link></li>
              <li><Link to="/how-it-works">How it works</Link></li>
              <li><Link to="/safety">Safety</Link></li>
              <li><Link to="/cities">Cities</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li><Link to="/contact">Contact us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/legal/terms">Terms of service</Link></li>
              <li><Link to="/legal/privacy">Privacy policy</Link></li>
              <li><Link to="/legal/cancellation">Cancellation policy</Link></li>
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__base">
          <span>&copy; {new Date().getFullYear()} Chill Ghar. All rights reserved.</span>
          <span>Cities: {CITIES.slice(0, 4).map((c) => c.name).join(', ')} and more</span>
        </div>
      </div>
    </footer>
  );
}
