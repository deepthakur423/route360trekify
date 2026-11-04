/* ============================================================
   EDIT THIS FILE to change contact details, prices, rooms,
   gallery photos, map pin and Telegram. No other file needs editing.
   ============================================================ */
window.SITE = {
  brand: 'Route360Trekify',
  homestay: 'Greenhouse Homestay',
  phone: '+91 94188 55811',
  phoneRaw: '+919418855811',
  email: 'greenhousegrahan@gmail.com',
  address: 'Greenhouse Homestay, Grahan Village, Parvati Valley, Himachal Pradesh (7,700 ft)',
  instagram: [
    { label: 'Route360Trekify', user: 'route360trekify' },
    { label: 'Greenhouse Homestay', user: 'greenhouse_grahan' }
  ],
  logo: 'images/logo.png',                       // put your logo here (optional)

  // MAP: paste your exact Google Maps share link into url to pin the precise spot.
  map: { query: 'Grahan Village, Himachal Pradesh', url: '' },

  // INQUIRIES: paste your Cloudflare Worker URL here (see README). The website form then sends
  // each inquiry straight to your Telegram bot/group, whether or not the guest uses Telegram.
  inquiryEndpoint: 'https://route360-inquiries.thakurdeep761.workers.dev/',

  // Images: swap any URL for your own file, e.g. 'images/hero.jpg'
  hero: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop',
  homestayHero: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1920&auto=format&fit=crop',

  // GALLERY: copy photos into images/gallery/ and list them. Empty list = section hidden.
  // gallery: [ {src:'images/gallery/1.jpg', alt:'Greenhouse Homestay at sunrise'}, ... ]
  gallery: [
    { src: 'images/gallery/rt1.jpg', alt: 'Grahan, Himachal Pradesh' },
    { src: 'images/gallery/rt2.jpg', alt: 'Grahan, Himachal Pradesh' },
    { type: 'video', src: 'images/gallery/rtv1.mp4' },
    { src: 'images/gallery/rt3.jpg', alt: 'Grahan, Himachal Pradesh' },
    { src: 'images/gallery/rt4.jpg', alt: 'Grahan, Himachal Pradesh' },
    { type: 'video', src: 'images/gallery/rtv2.mp4' },
    { src: 'images/gallery/rt5.jpg', alt: 'Grahan, Himachal Pradesh' },
    { type: 'video', src: 'images/gallery/rtv3.mp4' },
    { src: 'images/gallery/rt6.jpg', alt: 'Grahan, Himachal Pradesh' },
    { type: 'video', src: 'images/gallery/rtv4.mp4' }
  ],

  // ROOMS: 10 in total. Fill price (any text, e.g. '₹1,800 / night'); empty shows "Price on request".
  rooms: [
    { name: 'Double Bed Rooms', icon: '🛏️', count: 4, sleeps: 'Double bed · 2 guests', price: '',
      desc: 'Cozy rooms in our old Kath Kuni house for couples and solo travellers. Hot water available.' },
    { name: 'Triple Occupancy Rooms', icon: '👨‍👩‍👦', count: 2, sleeps: 'Up to 3 guests', price: '',
      desc: 'Comfortable rooms for small families or three friends travelling together. Hot water available.' },
    { name: 'Multiple Occupancy Rooms', icon: '👥', count: 4, sleeps: 'Group stays', price: '',
      desc: 'Larger shared rooms, ideal for trekking groups. Hot water available. Ask us for exact capacity.' }
  ],

  // TREKS: add price like '₹6,500 / person'. cat: day | multiday | custom
  treks: [
    { key: 'sarpass', name: 'Sar Pass', cat: 'multiday', tag: 'POPULAR', level: 'Moderate - Challenging', dur: '4-5 Days', alt: '13,800 ft', price: '',
      img: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=900&auto=format&fit=crop',
      desc: 'Our signature high-altitude crossover from Grahan: rhododendron forests, golden ridges and snow-clad passes with sweeping Parvati Valley views.' },
    { key: 'minthach', name: 'Min Thach (Meadows)', cat: 'day', tag: 'SCENIC MEADOWS', level: 'Easy - Moderate', dur: '4-5 Hours', alt: '11,150 ft', price: '',
      img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=900&auto=format&fit=crop',
      desc: 'Climb through deodar and pine groves into wide, sunlit alpine pastures. A rewarding day hike, or an overnight star-gazing camp.' },
    { key: 'thunjakutla', name: 'Thunja Kutla', cat: 'day', tag: 'ALPINE RIDGE', level: 'Moderate', dur: '3-4 Hours', alt: '9,840 ft', price: '',
      img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=900&auto=format&fit=crop',
      desc: 'A crisp climb from Grahan to a serene high-altitude clearing with untouched forest trails and panoramic Himalayan views.' },
    { key: 'padri', name: 'Padri', cat: 'day', tag: 'HIDDEN GEM', level: 'Easy - Moderate', dur: '4-5 Hours', alt: '10,500 ft', price: '',
      img: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=900&auto=format&fit=crop',
      desc: 'A secluded trail through old-growth conifers, mossy boulders and clear mountain streams. Ideal for solitude away from busy routes.' },
    { key: 'shambhala', name: 'Shambhala Caves', cat: 'multiday', tag: 'MYSTICAL', level: 'Challenging', dur: '3-5 Days', alt: '12,500 ft', price: '',
      img: 'https://images.unsplash.com/photo-1533157297312-32a2491b29a2?q=80&w=900&auto=format&fit=crop',
      desc: 'A remote multi-day expedition across rugged high-altitude terrain to ancient meditation caves, led by our most experienced Grahan guides.' },
    { key: 'custom', name: 'More Treks & Custom', cat: 'custom', tag: 'EXPLORE MORE', level: 'All skill levels', dur: 'Custom (1-7+ Days)', alt: '9,000-15,000+ ft', price: '',
      img: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=900&auto=format&fit=crop',
      desc: 'Local waterfall walks, secret shepherd routes or a bespoke multi-day itinerary from Grahan, tailored to your group\'s pace.' }
  ]
};
