import { Product } from '../types/clothing';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'coat-calder-wool',
    name: 'The Calder Wool Double-Breasted Trench',
    subtitle: 'Signature Virgin Wool Outerwear',
    price: 495,
    originalPrice: 550,
    category: 'outerwear',
    gender: 'all',
    image: '/src/assets/images/product_wool_trench_coat_1791180991146.jpg',
    additionalImages: [
      '/src/assets/images/product_wool_trench_coat_1791180991146.jpg',
      '/src/assets/images/hero_fashion_editorial_1791180978401.jpg'
    ],
    description: 'An architectural double-breasted trench crafted from heavyweight virgin wool sourced from historic Piedmont mills. Engineered with exaggerated storm flaps, a detachable self-fabric belt with horn hardware, and a fluid back vent for effortless movement in cold climes.',
    fabric: '100% Italian Virgin Wool (520gsm); Cupro Bemberg lining',
    origin: 'Hand-cut & tailored in Biella, Italy',
    fit: 'Relaxed Fit',
    badge: 'Artisanal Essential',
    inStock: true,
    colors: [
      { name: 'Camel Tan', hex: '#C19A6B', bgClass: 'bg-[#C19A6B]' },
      { name: 'Noir Black', hex: '#1C1917', bgClass: 'bg-[#1C1917]' },
      { name: 'Slate Olive', hex: '#4A5340', bgClass: 'bg-[#4A5340]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 38,
    measurements: {
      XS: { chest: '104 cm', length: '118 cm', sleeve: '82 cm' },
      S: { chest: '110 cm', length: '120 cm', sleeve: '84 cm' },
      M: { chest: '116 cm', length: '122 cm', sleeve: '86 cm' },
      L: { chest: '122 cm', length: '124 cm', sleeve: '88 cm' },
      XL: { chest: '128 cm', length: '126 cm', sleeve: '90 cm' }
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena R.',
        verified: true,
        rating: 5,
        date: 'October 2, 2026',
        title: 'Unbelievable drape and weight',
        comment: 'The wool has substantial heft without feeling restrictive. The shoulders have that subtle relaxed drop that looks both effortless and incredibly sharp over tailoring.',
        sizePurchased: 'S',
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-2',
        author: 'Marcus K.',
        verified: true,
        rating: 5,
        date: 'September 24, 2026',
        title: 'Heirloom coat quality',
        comment: 'Worth every single penny. The stitching around the collar and horn buckles are immaculate. Receives compliments every time I walk into the studio.',
        sizePurchased: 'L',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'knit-biella-cashmere',
    name: 'The Biella Heavy Ribbed Cashmere Sweater',
    subtitle: 'Grade-A 4-Ply Mongolian Cashmere',
    price: 340,
    category: 'knitwear',
    gender: 'all',
    image: '/src/assets/images/product_merino_knitwear_1791181002272.jpg',
    additionalImages: [
      '/src/assets/images/product_merino_knitwear_1791181002272.jpg'
    ],
    description: 'Spun from long-staple Grade-A cashmere fibres that resist pilling and soften with age. Features a chunky 5-gauge fisherman rib knit, tubular mock neck collar, and reinforced saddle shoulders for enduring longevity.',
    fabric: '100% Mongolian Cashmere (Grade-A, 4-ply 5-gauge)',
    origin: 'Knit in Umbria, Italy',
    fit: 'True to Size',
    badge: 'Pure Cashmere',
    inStock: true,
    colors: [
      { name: 'Oatmeal Ivory', hex: '#EAE5DB', bgClass: 'bg-[#EAE5DB]' },
      { name: 'Charcoal Melange', hex: '#3E3D40', bgClass: 'bg-[#3E3D40]' },
      { name: 'French Navy', hex: '#1E2530', bgClass: 'bg-[#1E2530]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.95,
    reviewsCount: 52,
    measurements: {
      XS: { chest: '98 cm', length: '64 cm', sleeve: '79 cm' },
      S: { chest: '104 cm', length: '66 cm', sleeve: '81 cm' },
      M: { chest: '110 cm', length: '68 cm', sleeve: '83 cm' },
      L: { chest: '116 cm', length: '70 cm', sleeve: '85 cm' },
      XL: { chest: '122 cm', length: '72 cm', sleeve: '87 cm' }
    },
    reviews: [
      {
        id: 'rev-3',
        author: 'Soren V.',
        verified: true,
        rating: 5,
        date: 'September 28, 2026',
        title: 'Pure tactile bliss',
        comment: 'Incredibly plush yet breathes well indoors. You can immediately feel the difference of 4-ply cashmere compared to commercial fast fashion sweaters.',
        sizePurchased: 'M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'blazer-marais-charcoal',
    name: 'The Marais Relaxed Charcoal Linen Blazer',
    subtitle: 'Unstructured Tailored Suiting',
    price: 385,
    originalPrice: 420,
    category: 'tailoring',
    gender: 'all',
    image: '/src/assets/images/product_tailored_linen_blazer_1791181013920.jpg',
    additionalImages: [
      '/src/assets/images/product_tailored_linen_blazer_1791181013920.jpg'
    ],
    description: 'An unlined, single-breasted blazer with natural shoulders and notched lapels. Cut from high-density washed Belgian linen that softens into an organic, rumpled elegance. Ideal for transitioning between gallery openings and summer travel.',
    fabric: '100% Belgian Washed Master-Linen (310gsm); Corozo nut buttons',
    origin: 'Tailored in Porto, Portugal',
    fit: 'Relaxed Fit',
    badge: 'Bestseller',
    inStock: true,
    colors: [
      { name: 'Charcoal Washed', hex: '#3B3B3B', bgClass: 'bg-[#3B3B3B]' },
      { name: 'Flax Natural', hex: '#D8CFBC', bgClass: 'bg-[#D8CFBC]' },
      { name: 'Deep Espresso', hex: '#2F2622', bgClass: 'bg-[#2F2622]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.85,
    reviewsCount: 29,
    measurements: {
      XS: { chest: '100 cm', length: '72 cm', sleeve: '83 cm' },
      S: { chest: '106 cm', length: '74 cm', sleeve: '85 cm' },
      M: { chest: '112 cm', length: '76 cm', sleeve: '87 cm' },
      L: { chest: '118 cm', length: '78 cm', sleeve: '89 cm' },
      XL: { chest: '124 cm', length: '80 cm', sleeve: '91 cm' }
    },
    reviews: [
      {
        id: 'rev-4',
        author: 'Claire D.',
        verified: true,
        rating: 5,
        date: 'August 14, 2026',
        title: 'Effortless Parisian silhouette',
        comment: 'The relaxed shoulder gives it that understated nonchalance. Wear it with wide trousers or raw denim; it instantly elevates everything.',
        sizePurchased: 'S',
        fitFeedback: 'Runs Large'
      }
    ]
  },
  {
    id: 'trouser-atelier-pleated',
    name: 'The Atelier Single-Pleat Wide Leg Trousers',
    subtitle: 'High-Waisted Drape Trousers',
    price: 245,
    category: 'trousers',
    gender: 'all',
    image: '/src/assets/images/hero_fashion_editorial_1791180978401.jpg',
    additionalImages: [
      '/src/assets/images/hero_fashion_editorial_1791180978401.jpg'
    ],
    description: 'Cut with a high rise and forward single pleat, yielding an elongated fluid leg line that breaks gently over loafers or minimalist boots. Features internal curtain waistband construction inspired by Savile Row craftsmanship.',
    fabric: '70% Fine Merino Wool, 30% Mulberry Silk gabardine',
    origin: 'Crafted in Biella, Italy',
    fit: 'True to Size',
    inStock: true,
    colors: [
      { name: 'Bone Taupe', hex: '#CCC4B8', bgClass: 'bg-[#CCC4B8]' },
      { name: 'Soot Black', hex: '#1F1E1D', bgClass: 'bg-[#1F1E1D]' },
      { name: 'Olive Drab', hex: '#3E4237', bgClass: 'bg-[#3E4237]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.88,
    reviewsCount: 44,
    measurements: {
      XS: { chest: '—', length: '106 cm', sleeve: '—', waist: '68 cm' },
      S: { chest: '—', length: '107 cm', sleeve: '—', waist: '74 cm' },
      M: { chest: '—', length: '108 cm', sleeve: '—', waist: '80 cm' },
      L: { chest: '—', length: '109 cm', sleeve: '—', waist: '86 cm' },
      XL: { chest: '—', length: '110 cm', sleeve: '—', waist: '92 cm' }
    },
    reviews: [
      {
        id: 'rev-5',
        author: 'Julian T.',
        verified: true,
        rating: 5,
        date: 'September 12, 2026',
        title: 'Best trousers I have ever owned',
        comment: 'The curtain waistband sits flat with zero pinching. The fabric flows when walking like liquid wool. Will be buying a second pair in Soot Black.',
        sizePurchased: 'M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'shirt-arles-poplin',
    name: 'The Arles Structured Organic Cotton Shirt',
    subtitle: 'Classic Tailored Point Collar Shirt',
    price: 185,
    category: 'shirts',
    gender: 'all',
    image: '/src/assets/images/product_merino_knitwear_1791181002272.jpg',
    additionalImages: [
      '/src/assets/images/product_merino_knitwear_1791181002272.jpg'
    ],
    description: 'Woven on vintage shuttle looms from GOTS-certified long-staple Egyptian cotton. Crisp 120/2 two-ply poplin weave with natural mother-of-pearl buttons, curved hem, and clean back box pleat.',
    fabric: '100% GOTS Organic Two-Ply Egyptian Cotton (120/2 yarn)',
    origin: 'Bergamo, Italy',
    fit: 'Relaxed Fit',
    inStock: true,
    colors: [
      { name: 'Chalk White', hex: '#F7F6F2', bgClass: 'bg-[#F7F6F2]' },
      { name: 'Sky Stripe', hex: '#A8BED1', bgClass: 'bg-[#A8BED1]' },
      { name: 'Midnight', hex: '#171E26', bgClass: 'bg-[#171E26]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.78,
    reviewsCount: 31,
    measurements: {
      XS: { chest: '102 cm', length: '73 cm', sleeve: '82 cm' },
      S: { chest: '108 cm', length: '75 cm', sleeve: '84 cm' },
      M: { chest: '114 cm', length: '77 cm', sleeve: '86 cm' },
      L: { chest: '120 cm', length: '79 cm', sleeve: '88 cm' },
      XL: { chest: '126 cm', length: '81 cm', sleeve: '90 cm' }
    },
    reviews: [
      {
        id: 'rev-6',
        author: 'Nadia M.',
        verified: true,
        rating: 5,
        date: 'July 29, 2026',
        title: 'Crisp yet breathable',
        comment: 'The collar stays crisp without being stiff. Looks pristine under the Marais blazer.',
        sizePurchased: 'S',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'dress-column-silk',
    name: 'The Column Bias-Cut Silk Crepe Dress',
    subtitle: 'Floor-Length Architectural Silhouette',
    price: 360,
    originalPrice: 410,
    category: 'dresses',
    gender: 'women',
    image: '/src/assets/images/hero_fashion_editorial_1791180978401.jpg',
    additionalImages: [
      '/src/assets/images/hero_fashion_editorial_1791180978401.jpg'
    ],
    description: 'Precision-cut on the true bias from heavy 22-momme Mulberry silk crepe de chine. Features a high bateaux neckline, gentle hourglass contouring that skims the body without clinging, and discreet invisible side zipper.',
    fabric: '100% Mulberry Silk Crepe de Chine (22 momme)',
    origin: 'Lyon, France',
    fit: 'True to Size',
    badge: 'Limited Run',
    inStock: true,
    colors: [
      { name: 'Raw Oyster', hex: '#DED8CE', bgClass: 'bg-[#DED8CE]' },
      { name: 'Noir Onyx', hex: '#161616', bgClass: 'bg-[#161616]' },
      { name: 'Burnt Ochre', hex: '#8B4826', bgClass: 'bg-[#8B4826]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.92,
    reviewsCount: 23,
    measurements: {
      XS: { chest: '86 cm', length: '136 cm', sleeve: '—', waist: '66 cm' },
      S: { chest: '92 cm', length: '138 cm', sleeve: '—', waist: '72 cm' },
      M: { chest: '98 cm', length: '140 cm', sleeve: '—', waist: '78 cm' },
      L: { chest: '104 cm', length: '142 cm', sleeve: '—', waist: '84 cm' }
    },
    reviews: [
      {
        id: 'rev-7',
        author: 'Vivienne S.',
        verified: true,
        rating: 5,
        date: 'August 18, 2026',
        title: 'An absolute masterpiece',
        comment: 'The weight of 22 momme silk means it hangs straight without clinging to underwear lines. Wore it to an evening gala and felt completely statuesque.',
        sizePurchased: 'S',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'denim-selvedge-kuroki',
    name: 'The Kuroki 13.5oz Raw Selvedge Denim',
    subtitle: 'Classic Straight-Leg Japanese Selvedge',
    price: 230,
    category: 'trousers',
    gender: 'all',
    image: '/src/assets/images/product_tailored_linen_blazer_1791181013920.jpg',
    additionalImages: [
      '/src/assets/images/product_tailored_linen_blazer_1791181013920.jpg'
    ],
    description: 'Woven on vintage Toyoda shuttle looms at the famed Kuroki mill in Okayama, Japan. Features traditional red selvedge ID, custom brass doughnut buttons, and continuous chain-stitched hem designed to age with unique honeycomb patina.',
    fabric: '100% Zimbabwe Long-Staple Cotton, 13.5oz Right-Hand Twill Selvedge',
    origin: 'Kojima, Okayama, Japan',
    fit: 'True to Size',
    inStock: true,
    colors: [
      { name: 'Raw Indigo', hex: '#1B2A4A', bgClass: 'bg-[#1B2A4A]' },
      { name: 'Washed Ecru', hex: '#EBE6DC', bgClass: 'bg-[#EBE6DC]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    rating: 4.87,
    reviewsCount: 36,
    measurements: {
      XS: { chest: '—', length: '104 cm', sleeve: '—', waist: '71 cm' },
      S: { chest: '—', length: '105 cm', sleeve: '—', waist: '76 cm' },
      M: { chest: '—', length: '106 cm', sleeve: '—', waist: '82 cm' },
      L: { chest: '—', length: '107 cm', sleeve: '—', waist: '88 cm' },
      XL: { chest: '—', length: '108 cm', sleeve: '—', waist: '94 cm' }
    },
    reviews: [
      {
        id: 'rev-8',
        author: 'Tatsuki N.',
        verified: true,
        rating: 5,
        date: 'September 5, 2026',
        title: 'Authentic Okayama selvedge',
        comment: 'Stiff at first, breaking in beautifully after two weeks of wear. The red selvedge cuff looks great rolled once with boots.',
        sizePurchased: 'M',
        fitFeedback: 'True to Size'
      }
    ]
  },
  {
    id: 'knit-vest-sculpted',
    name: 'The Sculpted Merino Mockneck Sleeveless Vest',
    subtitle: 'Fine Gauge Layering Knit',
    price: 195,
    category: 'knitwear',
    gender: 'women',
    image: '/src/assets/images/product_wool_trench_coat_1791180991146.jpg',
    additionalImages: [
      '/src/assets/images/product_wool_trench_coat_1791180991146.jpg'
    ],
    description: 'Knitted seamlessly from 19.5-micron extrafine Australian Merino wool. Engineered with subtle rib variation that accentuates the waistline, side micro-slits, and a structured standing collar that holds its form.',
    fabric: '100% Extrafine Australian Merino Wool (19.5 micron, 14-gauge)',
    origin: 'Vicenza, Italy',
    fit: 'Tailored Slim',
    badge: 'Seasonal Pick',
    inStock: true,
    colors: [
      { name: 'Bitter Chocolate', hex: '#372B25', bgClass: 'bg-[#372B25]' },
      { name: 'Oatmeal', hex: '#DDD6C6', bgClass: 'bg-[#DDD6C6]' },
      { name: 'Pure Black', hex: '#121212', bgClass: 'bg-[#121212]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.81,
    reviewsCount: 19,
    measurements: {
      XS: { chest: '88 cm', length: '58 cm', sleeve: '—' },
      S: { chest: '94 cm', length: '60 cm', sleeve: '—' },
      M: { chest: '100 cm', length: '62 cm', sleeve: '—' },
      L: { chest: '106 cm', length: '64 cm', sleeve: '—' }
    },
    reviews: [
      {
        id: 'rev-9',
        author: 'Astrid B.',
        verified: true,
        rating: 5,
        date: 'August 30, 2026',
        title: 'Perfect transitional piece',
        comment: 'Wears wonderfully over an oversized shirt or on bare arms during late summer evenings. Non-itchy and very flattering cut.',
        sizePurchased: 'S',
        fitFeedback: 'True to Size'
      }
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Garments' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'knitwear', label: 'Knitwear' },
  { id: 'tailoring', label: 'Tailoring' },
  { id: 'trousers', label: 'Trousers & Denim' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'dresses', label: 'Dresses' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export const COLOR_PALETTE = [
  { name: 'Ivory & Bone', hex: '#EAE5DB' },
  { name: 'Camel & Tan', hex: '#C19A6B' },
  { name: 'Charcoal & Grey', hex: '#3E3D40' },
  { name: 'Noir Black', hex: '#1C1917' },
  { name: 'Olive Green', hex: '#4A5340' },
  { name: 'Indigo Navy', hex: '#1B2A4A' },
];
