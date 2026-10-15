import {
  Sparkles, Clock, Bath, CookingPot, Sofa, AppWindow, Refrigerator, Fan, Car, CarFront, Bike, Droplets,
  WashingMachine, Shirt, BedDouble, Archive, ChefHat, Wheat, UtensilsCrossed, PartyPopper, Scissors, Brush,
  Flower2, HandHeart, Baby, HeartHandshake, GraduationCap, PawPrint, Sprout, Package, MoonStar, Ruler, Trash2,
} from 'lucide-react';

const MAP = {
  Sparkles, Clock, Bath, CookingPot, Sofa, AppWindow, Refrigerator, Fan, Car, CarFront, Bike, Droplets,
  WashingMachine, Shirt, BedDouble, Archive, ChefHat, Wheat, UtensilsCrossed, PartyPopper, Scissors, Brush,
  Flower2, HandHeart, Baby, HeartHandshake, GraduationCap, PawPrint, Sprout, Package, MoonStar, Ruler, Trash2,
};

export default function ServiceIcon({ name, tone = 'violet', size, className = '' }) {
  const Icon = MAP[name] || Sparkles;
  const cls = ['glyph', tone !== 'violet' ? `glyph--${tone}` : '', size ? `glyph--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <span className={cls} aria-hidden="true">
      <Icon />
    </span>
  );
}
