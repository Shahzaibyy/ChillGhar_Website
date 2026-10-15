import { Link } from 'react-router-dom';
import ServiceIcon from './ServiceIcon';
import { categoryOf, fromPrice } from '../data/services';
import { pkr } from '../lib/format';

export default function ServiceTile({ service, showPrice = true }) {
  const cat = categoryOf(service);
  return (
    <Link to={`/services/${service.slug}`} className="tile">
      <ServiceIcon name={service.icon} tone={cat.tone} />
      <span className="tile__name">{service.name}</span>
      {showPrice && <span className="tile__price">from {pkr(fromPrice(service))}</span>}
    </Link>
  );
}
