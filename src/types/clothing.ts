export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface ProductMeasurement {
  chest: string;
  length: string;
  sleeve: string;
  waist?: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  title: string;
  comment: string;
  sizePurchased: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: 'outerwear' | 'knitwear' | 'tailoring' | 'trousers' | 'dresses' | 'shirts';
  gender: 'all' | 'women' | 'men';
  image: string;
  additionalImages?: string[];
  description: string;
  fabric: string;
  origin: string;
  fit: 'True to Size' | 'Relaxed Fit' | 'Oversized' | 'Tailored Slim';
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  inStock: boolean;
  measurements?: Record<string, ProductMeasurement>;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface FilterState {
  category: string;
  gender: string;
  size: string;
  colorHex: string;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery: string;
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  date: string;
  deliveryMethod: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  status: 'Confirmed' | 'Tailoring in Progress' | 'Dispatched' | 'Delivered';
  estimatedDelivery: string;
}
