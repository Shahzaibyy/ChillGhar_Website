// Service catalogue. Prices are illustrative launch prices in PKR (flat, per visit)
// and should be confirmed by operations before go-live.
const p = (id, name, detail, price, mins) => ({ id, name, detail, price, mins });

export const CATEGORIES = [
  { id: 'cleaning', name: 'Home cleaning', icon: 'Sparkles', tone: 'violet', blurb: 'Rooms, kitchens, bathrooms and full deep cleans.' },
  { id: 'vehicles', name: 'Car & bike care', icon: 'Car', tone: 'sun', blurb: 'Washed at your doorstep. No queue at the wash bay.' },
  { id: 'laundry', name: 'Laundry & ironing', icon: 'Shirt', tone: 'ink', blurb: 'Picked up, washed, pressed and folded.' },
  { id: 'kitchen', name: 'Cooking & kitchen', icon: 'ChefHat', tone: 'violet', blurb: 'Home-style meals and kitchen hands.' },
  { id: 'beauty', name: 'Beauty at home', icon: 'Scissors', tone: 'sun', blurb: 'Salon, makeup and mehndi at your place.' },
  { id: 'care', name: 'Care & learning', icon: 'Baby', tone: 'ink', blurb: 'Babysitting, elder care, tutors and pets.' },
  { id: 'home', name: 'Home extras', icon: 'Sprout', tone: 'violet', blurb: 'Plants, packing, tailoring and festive prep.' },
];

export const SERVICES = [
  // Home cleaning
  {
    slug: 'deep-home-cleaning', name: 'Deep home cleaning', category: 'cleaning', icon: 'Sparkles',
    blurb: 'Top to bottom clean with eco-safe supplies. Floors, walls, fixtures, bathrooms and kitchen.',
    includes: ['Dusting of all surfaces and fixtures', 'Floor scrub, sweep and mop', 'Bathroom and kitchen degrease', 'Cobweb and ceiling corner clean'],
    packages: [p('2bed', '1 to 2 bedrooms', 'Up to 1,000 sq ft', 7000, 240), p('3bed', '3 bedrooms', 'Up to 1,800 sq ft', 9500, 330), p('4bed', '4+ bedrooms', 'Up to 3,000 sq ft', 13500, 450)],
  },
  {
    slug: 'hourly-help', name: 'Hourly house help', category: 'cleaning', icon: 'Clock',
    blurb: 'A trained pro for the hours you choose. Dusting, sweeping, mopping, dishes and tidy-up.',
    includes: ['Choose any tasks from the list', 'Minimum 2 hours', 'Supplies carried by the pro on request'],
    packages: [p('2h', '2 hours', 'Quick tidy and dishes', 1100, 120), p('4h', '4 hours', 'Rooms, kitchen and mopping', 2000, 240), p('8h', 'Full day', '8 hours with a lunch break', 3600, 480)],
  },
  {
    slug: 'bathroom-cleaning', name: 'Bathroom cleaning', category: 'cleaning', icon: 'Bath',
    blurb: 'Tiles, taps, toilet, basin and drains scrubbed and descaled.',
    includes: ['Tile and grout scrub', 'Descaling of taps and fittings', 'Toilet and basin disinfect', 'Floor drain flush'],
    packages: [p('1', '1 bathroom', 'About 45 minutes', 900, 45), p('2', '2 bathrooms', 'About 80 minutes', 1700, 80), p('3', '3 bathrooms', 'About 2 hours', 2400, 120)],
  },
  {
    slug: 'kitchen-cleaning', name: 'Kitchen cleaning', category: 'cleaning', icon: 'CookingPot',
    blurb: 'Counters, stove, chimney grease, sink and cabinet faces made spotless.',
    includes: ['Stove and burner degrease', 'Counter, sink and tile wipe', 'Cabinet exterior clean', 'Floor mop'],
    packages: [p('basic', 'Standard clean', 'Surfaces, stove and sink', 1900, 120), p('deep', 'Deep clean', 'Includes inside of cabinets', 3600, 210)],
  },
  {
    slug: 'sofa-carpet-cleaning', name: 'Sofa & carpet cleaning', category: 'cleaning', icon: 'Sofa',
    blurb: 'Shampoo and vacuum extraction that lifts dust, stains and smell from fabric.',
    includes: ['Dry vacuum', 'Shampoo and scrub', 'Wet extraction', 'Stain treatment'],
    packages: [p('sofa3', '3 seater sofa', 'Fabric or velvet', 2600, 75), p('sofa5', '5 seater sofa', 'Fabric or velvet', 3900, 110), p('carpet', 'Carpet, 6 x 9 ft', 'Per carpet', 1800, 60)],
  },
  {
    slug: 'window-balcony-cleaning', name: 'Window & balcony cleaning', category: 'cleaning', icon: 'AppWindow',
    blurb: 'Glass, tracks, grills and balcony floors cleaned inside and out where it is safe to reach.',
    includes: ['Glass and frame wipe', 'Track and grill dust removal', 'Balcony floor wash'],
    packages: [p('small', 'Up to 4 windows', 'Plus one balcony', 1800, 90), p('large', 'Up to 10 windows', 'Plus balcony and lounge door', 3400, 160)],
  },
  {
    slug: 'fridge-cleaning', name: 'Fridge cleaning', category: 'cleaning', icon: 'Refrigerator',
    blurb: 'Shelves emptied, washed and sanitised, gasket and drip tray cleaned.',
    includes: ['Shelf and drawer wash', 'Gasket and drip tray clean', 'Odour removal'],
    packages: [p('single', 'Single door', 'Up to 350 L', 1200, 50), p('double', 'Double door', 'Over 350 L', 1700, 70)],
  },
  {
    slug: 'fan-cleaning', name: 'Fan & light cleaning', category: 'cleaning', icon: 'Fan',
    blurb: 'Ceiling fans, exhaust fans and fixtures cleaned of caked dust.',
    includes: ['Blade wipe', 'Motor housing dust', 'Light shade wipe'],
    packages: [p('3', '3 fans', 'Ceiling or exhaust', 800, 40), p('6', '6 fans', 'Ceiling or exhaust', 1400, 70)],
  },

  // Car & bike
  {
    slug: 'car-wash', name: 'Car wash at home', category: 'vehicles', icon: 'Car',
    blurb: 'Doorstep wash with a waterless or low-water method. Safe on paint, no queue, no drive.',
    includes: ['Exterior foam wash', 'Windows and mirrors', 'Tyre and rim clean', 'Interior vacuum on higher packages'],
    packages: [p('ext', 'Exterior wash', 'Foam wash, dry and tyre shine', 1200, 45), p('both', 'Exterior + interior', 'Adds mats, seats and dash', 2200, 80), p('full', 'Full foam + wax', 'Adds hand wax and glass polish', 3600, 120)],
  },
  {
    slug: 'car-interior-detailing', name: 'Car interior detailing', category: 'vehicles', icon: 'CarFront',
    blurb: 'Deep clean of seats, roof liner, carpets and vents. Removes dust, stains and smell.',
    includes: ['Seat shampoo', 'Carpet extraction', 'Dashboard and vent detail', 'Odour treatment'],
    packages: [p('sedan', 'Sedan or hatchback', 'About 3 hours', 6500, 180), p('suv', 'SUV or van', 'About 4 hours', 8500, 240)],
  },
  {
    slug: 'bike-wash', name: 'Bike wash', category: 'vehicles', icon: 'Bike',
    blurb: 'Motorcycle or scooty washed and dried at your gate. Chain lube and polish available.',
    includes: ['Body and tank wash', 'Chain clean and lube on higher packages', 'Seat and mirror wipe', 'Tyre shine'],
    packages: [p('basic', 'Basic wash', 'Body, wheels and dry', 400, 20), p('chain', 'Wash + chain lube', 'Adds chain degrease and lube', 700, 35), p('polish', 'Wash + polish', 'Adds body polish', 1200, 50)],
  },
  {
    slug: 'vehicle-cover-and-polish', name: 'Wax & ceramic top-up', category: 'vehicles', icon: 'Droplets',
    blurb: 'Hand wax or spray-ceramic top-up that keeps paint glossy and water beading.',
    includes: ['Panel prep wash', 'Hand wax or spray ceramic', 'Trim restore'],
    packages: [p('bike', 'Bike', 'Wax and trim', 1500, 60), p('car', 'Car', 'Wax or spray ceramic', 4500, 150)],
  },

  // Laundry
  {
    slug: 'laundry', name: 'Laundry wash & fold', category: 'laundry', icon: 'WashingMachine',
    blurb: 'Collected from your door, washed by weight, folded and returned.',
    includes: ['Pickup and delivery', 'Sorted by colour and fabric', 'Fold and bag'],
    packages: [p('5kg', 'Up to 5 kg', 'Everyday clothes', 900, 30), p('10kg', 'Up to 10 kg', 'Everyday clothes', 1600, 30), p('bed', 'Bedding set', 'Sheets, covers and pillowcases', 1100, 30)],
  },
  {
    slug: 'ironing', name: 'Ironing & folding', category: 'laundry', icon: 'Shirt',
    blurb: 'Crisp shalwar kameez, shirts and trousers pressed at home or picked up.',
    includes: ['Steam press', 'Hanger or fold', 'Same day return on morning slots'],
    packages: [p('10', '10 pieces', 'Shirts, trousers, kameez', 500, 60), p('25', '25 pieces', 'Shirts, trousers, kameez', 1100, 140), p('formal', 'Formal and heavy wear', 'Suits, sherwani, abaya (5 pieces)', 1200, 90)],
  },
  {
    slug: 'curtain-bedding-wash', name: 'Curtain & quilt wash', category: 'laundry', icon: 'BedDouble',
    blurb: 'Bulky items washed properly and returned dry and fresh.',
    includes: ['Pickup and delivery', 'Gentle wash and tumble dry', 'Pressed and bagged'],
    packages: [p('curt', 'Curtains, per window set', 'Up to 3 panels', 700, 30), p('quilt', 'Quilt or razai', 'Single or double', 1300, 30)],
  },
  {
    slug: 'wardrobe-organising', name: 'Wardrobe organising', category: 'laundry', icon: 'Archive',
    blurb: 'Sorted, folded and arranged by season and use. Includes a donate or discard pile.',
    includes: ['Declutter and sort', 'Fold and shelve', 'Seasonal storage boxes'],
    packages: [p('one', 'One wardrobe', 'About 3 hours', 2800, 180), p('two', 'Two wardrobes', 'About 5 hours', 4800, 300)],
  },

  // Cooking
  {
    slug: 'home-cook', name: 'Home cook', category: 'kitchen', icon: 'ChefHat',
    blurb: 'A home-style cook prepares fresh meals in your kitchen. Tell her the menu or ask for suggestions.',
    includes: ['Up to 3 dishes with roti or rice', 'Kitchen wipe after cooking', 'Groceries provided by you'],
    packages: [p('one', 'One meal', 'Lunch or dinner for up to 5', 1000, 90), p('two', 'Two meals', 'Lunch and dinner for up to 5', 1800, 170), p('big', 'Large family meal', 'Up to 10 people', 2400, 150)],
  },
  {
    slug: 'roti-making', name: 'Fresh roti & paratha', category: 'kitchen', icon: 'Wheat',
    blurb: 'Hot rotis and parathas made at your stove, just before you eat.',
    includes: ['Dough prepared fresh', 'Rotis or parathas as requested', 'Counter wipe'],
    packages: [p('20', '20 pieces', 'Roti or paratha', 600, 45), p('40', '40 pieces', 'Roti or paratha', 1100, 80)],
  },
  {
    slug: 'weekly-meal-prep', name: 'Weekly meal prep', category: 'kitchen', icon: 'UtensilsCrossed',
    blurb: 'One session, a week of food. Cooked, portioned and labelled in your fridge.',
    includes: ['Menu agreed in advance', 'Portioned containers', 'Reheating notes'],
    packages: [p('4', '4 dishes', 'About 8 portions each', 4500, 240), p('6', '6 dishes', 'About 8 portions each', 6500, 330)],
  },
  {
    slug: 'party-kitchen-help', name: 'Party kitchen help', category: 'kitchen', icon: 'PartyPopper',
    blurb: 'Prep, serving hands and washing up for dawats, birthdays and get-togethers.',
    includes: ['Chopping and prep', 'Serving support', 'Dish washing'],
    packages: [p('4h', '4 hours, one helper', 'Gatherings up to 15', 2400, 240), p('6h', '6 hours, two helpers', 'Gatherings up to 40', 6500, 360)],
  },
  {
    slug: 'utensil-washing', name: 'Utensil washing', category: 'kitchen', icon: 'Droplets',
    blurb: 'Pile of dishes after a dawat? Washed, dried and arranged.',
    includes: ['Wash and rinse', 'Dry and stack', 'Sink and counter wipe'],
    packages: [p('1h', 'Up to 1 hour', 'Regular household load', 600, 60), p('2h', 'Up to 2 hours', 'After a gathering', 1100, 120)],
  },

  // Beauty
  {
    slug: 'salon-at-home', name: 'Salon at home', category: 'beauty', icon: 'Scissors',
    blurb: 'Threading, facials, waxing, manicure and hair care by trained beauticians.',
    includes: ['Single-use kits where possible', 'Products shown before use', 'Cleanup after service'],
    packages: [p('basic', 'Threading + facial', 'Eyebrows, upper lip and basic facial', 2400, 75), p('glow', 'Full glow package', 'Facial, mani-pedi and threading', 5200, 160), p('hair', 'Haircut + blow dry', 'Wash, cut and style', 2800, 75)],
  },
  {
    slug: 'party-makeup', name: 'Party & bridal makeup', category: 'beauty', icon: 'Brush',
    blurb: 'Makeup and hair for dawats, mehndi nights and shaadi. Trial sessions available.',
    includes: ['Skin prep', 'Makeup and hair styling', 'Touch-up kit for the event'],
    packages: [p('party', 'Party makeup', 'Makeup and simple hair', 6000, 120), p('bridal', 'Bridal makeup', 'Full bridal with hair and dupatta set', 35000, 240), p('trial', 'Bridal trial', 'Look test before the day', 8000, 120)],
  },
  {
    slug: 'mehndi', name: 'Mehndi artist', category: 'beauty', icon: 'Flower2',
    blurb: 'Fresh cone mehndi, from Eid simple to full bridal designs.',
    includes: ['Natural dark-stain cones', 'Designs shown beforehand', 'Aftercare tips'],
    packages: [p('simple', 'Simple, both hands', 'Palm or back', 1500, 45), p('full', 'Full hands and feet', 'Detailed design', 5500, 150), p('bridal', 'Bridal, hands and feet', 'Full coverage to elbows', 12000, 240)],
  },
  {
    slug: 'massage', name: 'Relaxing massage', category: 'beauty', icon: 'HandHeart',
    blurb: 'Back, shoulder and full-body relaxation massage by certified therapists, women only.',
    includes: ['Fresh linens and oils', 'Private room setup', 'Choice of pressure'],
    packages: [p('60', '60 minutes', 'Back, neck and shoulders', 3500, 60), p('90', '90 minutes', 'Full body', 5000, 90)],
  },

  // Care & learning
  {
    slug: 'baby-sitter', name: 'Baby sitter', category: 'care', icon: 'Baby',
    blurb: 'Experienced sitters for infants and kids. Background checked and reference verified.',
    includes: ['Feeding and play', 'Nap routine as instructed', 'Updates to you during the shift'],
    packages: [p('4h', '4 hours', 'One child', 1600, 240), p('8h', '8 hours', 'One child', 2900, 480), p('night', 'Overnight', 'Up to 10 hours', 4500, 600)],
  },
  {
    slug: 'elder-care', name: 'Elder care companion', category: 'care', icon: 'HeartHandshake',
    blurb: 'Gentle company and daily-living help for elders. Not a nursing service.',
    includes: ['Meals and medicine reminders', 'Walks and company', 'Light housekeeping for the elder'],
    packages: [p('4h', '4 hours', 'Companion visit', 1800, 240), p('8h', '8 hours', 'Day shift', 3200, 480)],
  },
  {
    slug: 'home-tutor', name: 'Home tutor', category: 'care', icon: 'GraduationCap',
    blurb: 'Subject tutors and Quran teachers for school-age kids at your home.',
    includes: ['Free demo class', 'Weekly progress note', 'Subject and syllabus matched'],
    packages: [p('wk', '5 sessions', 'One week, 1 hour each', 2500, 60), p('mo', '20 sessions', 'One month, 1 hour each', 8500, 60)],
  },
  {
    slug: 'pet-grooming', name: 'Pet grooming', category: 'care', icon: 'PawPrint',
    blurb: 'Bath, brush, nail trim and ear clean for cats and dogs at home.',
    includes: ['Pet-safe shampoo', 'Brush and dry', 'Nail trim and ear clean'],
    packages: [p('cat', 'Cat', 'Bath and brush', 2200, 60), p('dog-s', 'Small dog', 'Bath, brush and nails', 2800, 75), p('dog-l', 'Large dog', 'Bath, brush and nails', 4200, 120)],
  },

  // Home extras
  {
    slug: 'plant-care', name: 'Plant care', category: 'home', icon: 'Sprout',
    blurb: 'Pruning, repotting, feeding and pest check for balcony and indoor plants.',
    includes: ['Prune and clean leaves', 'Soil and feed', 'Pest check'],
    packages: [p('s', 'Up to 10 plants', 'One visit', 1500, 90), p('l', 'Up to 25 plants', 'One visit', 3000, 180)],
  },
  {
    slug: 'packing-unpacking', name: 'Packing & unpacking', category: 'home', icon: 'Package',
    blurb: 'Boxes labelled, kitchens wrapped and shelves set up again at the new place.',
    includes: ['Wrapping and boxing', 'Labelling by room', 'Unpack and arrange'],
    packages: [p('1', 'One room', 'Pack or unpack', 2500, 180), p('home', 'Whole home', '2 to 3 bedrooms, 2 helpers', 12000, 480)],
  },
  {
    slug: 'festive-deep-clean', name: 'Eid & Ramzan deep clean', category: 'home', icon: 'MoonStar',
    blurb: 'A pre-festival reset. Guest rooms, kitchen, carpets and lounge ready for visitors.',
    includes: ['Guest room and lounge reset', 'Kitchen degrease', 'Bathroom scrub', 'Curtain and cushion refresh'],
    packages: [p('2bed', '1 to 2 bedrooms', 'Two pros, about 4 hours', 9500, 240), p('3bed', '3 bedrooms', 'Two pros, about 6 hours', 13000, 360)],
  },
  {
    slug: 'tailoring-alteration', name: 'Stitching & alteration', category: 'home', icon: 'Ruler',
    blurb: 'Hems, fittings and repairs. Picked up from home and returned stitched.',
    includes: ['Pickup and delivery', 'Fitting advice', 'Quality check on return'],
    packages: [p('alt', 'Alteration, per piece', 'Hem, take-in or zip', 600, 30), p('suit', 'Suit stitching', 'Kameez shalwar, 3 to 5 days', 2800, 30)],
  },
  {
    slug: 'party-cleanup', name: 'After-party clean up', category: 'home', icon: 'Trash2',
    blurb: 'Plates, decorations, floors and rubbish cleared while you rest.',
    includes: ['Rubbish and decor clear', 'Floor and surface clean', 'Dish washing'],
    packages: [p('s', 'Small gathering', 'Up to 15 guests', 2800, 150), p('l', 'Large gathering', 'Up to 50 guests, 2 helpers', 7000, 240)],
  },
];

export const bySlug = (slug) => SERVICES.find((s) => s.slug === slug);
export const byCategory = (id) => SERVICES.filter((s) => s.category === id);
export const categoryOf = (service) => CATEGORIES.find((c) => c.id === service.category);
export const fromPrice = (service) => Math.min(...service.packages.map((x) => x.price));

export const HOME_FEATURED = [
  'car-wash', 'bike-wash', 'deep-home-cleaning', 'laundry', 'home-cook', 'salon-at-home',
  'bathroom-cleaning', 'baby-sitter', 'sofa-carpet-cleaning', 'mehndi', 'ironing', 'pet-grooming',
];
