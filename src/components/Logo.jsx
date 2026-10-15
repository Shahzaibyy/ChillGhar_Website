import { Link } from 'react-router-dom';

const SRC = {
  primary: '/wordmark-horizontal-primary.svg',
  reverse: '/wordmark-horizontal-reverse.svg',
  white: '/wordmark-horizontal-white.svg',
  stackedReverse: '/wordmark-stacked-reverse.svg',
  stacked: '/wordmark-stacked-primary.svg',
};

export default function Logo({ variant = 'primary', height = 34, className = '', link = true }) {
  const img = <img src={SRC[variant]} alt="Chill Ghar" height={height} style={{ height, width: 'auto' }} />;
  return link ? (
    <Link to="/" className={className} aria-label="Chill Ghar home">
      {img}
    </Link>
  ) : (
    img
  );
}
