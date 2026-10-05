/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LookbookBuilder } from './components/LookbookBuilder';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CraftStorySection } from './components/CraftStorySection';
import { BoutiqueConciergeSection } from './components/BoutiqueConciergeSection';
import { Footer } from './components/Footer';

import { INITIAL_PRODUCTS } from './data/products';
import { Product, CartItem, FilterState, Review, OrderDetails, ProductColor } from './types/clothing';

export default function App() {
  // Products state (allows reviews to be appended)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('latelier_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('latelier_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('latelier_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Past orders state
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('latelier_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active UI overlays
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');
  const [activeNav, setActiveNav] = useState('collection');

  // Promo code & discounts
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Quick feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    gender: 'all',
    size: '',
    colorHex: '',
    maxPrice: 600,
    sortBy: 'featured',
    searchQuery: ''
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('latelier_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('latelier_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('latelier_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('latelier_orders_v1', JSON.stringify(orders));
  }, [orders]);

  // Recalculate promo discount on subtotal change
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  useEffect(() => {
    if (promoCode === 'ATELIER10') {
      setDiscountAmount(Math.round(cartSubtotal * 0.1));
    } else if (promoCode === 'WELCOME') {
      setDiscountAmount(Math.min(cartSubtotal, 25));
    } else {
      setDiscountAmount(0);
    }
  }, [promoCode, cartSubtotal]);

  // Keyboard shortcut to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProduct(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }
      // Gender department
      if (filters.gender !== 'all' && p.gender !== 'all' && p.gender !== filters.gender) {
        return false;
      }
      // Size filter
      if (filters.size && !p.sizes.includes(filters.size)) {
        return false;
      }
      // Color filter
      if (filters.colorHex && !p.colors.some((c) => c.hex.toLowerCase() === filters.colorHex.toLowerCase())) {
        return false;
      }
      // Max price
      if (p.price > filters.maxPrice) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchFabric = p.fabric.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchFabric && !matchCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured maintains original order
    });
  }, [products, filters]);

  // Wishlist toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from saved list`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Add to cart from PDP
  const handleAddToCart = (product: Product, size: string, color: ProductColor, quantity: number) => {
    const itemKey = `${product.id}-${size}-${color.name}`;
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity
          }
        ];
      }
    });
    showToast(`Added ${quantity}x "${product.name}" (${size}) to bag`);
  };

  // Quick add from card (defaults to first size and color)
  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[1] || product.sizes[0];
    const defaultColor = product.colors[0];
    handleAddToCart(product, defaultSize, defaultColor, 1);
  };

  // Add complete capsule look from builder
  const handleAddLookToCart = (items: { product: Product; size: string; color: ProductColor }[]) => {
    items.forEach((item) => {
      handleAddToCart(item.product, item.size, item.color, 1);
    });
    showToast(`Added 3-piece Capsule Look to Bag`);
    setIsCartOpen(true);
  };

  // Cart operations
  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Apply promo
  const handleApplyPromo = (code: string) => {
    if (code === 'ATELIER10' || code === 'WELCOME') {
      setPromoCode(code);
      return true;
    }
    return false;
  };

  // Complete Order
  const handleCompleteOrder = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Clear cart upon confirmed order
  };

  // Add review to product
  const handleAddReview = (productId: string, newRev: Omit<Review, 'id' | 'date'>) => {
    const reviewWithId: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [reviewWithId, ...p.reviews];
          const newAvg =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: updatedReviews.length,
            rating: Number(newAvg.toFixed(2))
          };
        }
        return p;
      })
    );

    // Also update activeProduct if open
    if (activeProduct && activeProduct.id === productId) {
      setActiveProduct((prev) => {
        if (!prev) return null;
        const updatedReviews = [reviewWithId, ...prev.reviews];
        const newAvg =
          updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
        return {
          ...prev,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: Number(newAvg.toFixed(2))
        };
      });
    }

    showToast('Thank you for publishing your fitting review.');
  };

  // Smooth scroll
  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-stone-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 shadow-lg border border-stone-700 animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <TopBar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchClick={() => {
          const el = document.getElementById('collection');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        activeNav={activeNav}
        onNavClick={handleNavClick}
      />

      <main className="flex-1">
        {/* Campaign Hero Banner */}
        <HeroBanner
          onExploreClick={() => handleNavClick('collection')}
          onLookbookClick={() => handleNavClick('curated-looks')}
        />

        {/* Featured Ready-to-Wear Catalog */}
        <section id="collection" className="scroll-mt-20">
          {/* Filter and Search Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            totalCount={filteredProducts.length}
          />

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 space-y-4 bg-white border border-stone-200">
                <p className="text-stone-500 font-light text-sm">
                  No garments match your selected criteria.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: 'all',
                      gender: 'all',
                      size: '',
                      colorHex: '',
                      maxPrice: 600,
                      sortBy: 'featured',
                      searchQuery: ''
                    })
                  }
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setActiveProduct(p)}
                    onQuickAdd={handleQuickAdd}
                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Interactive Modular Capsule Assembler */}
        <LookbookBuilder
          products={products}
          onAddLookToCart={handleAddLookToCart}
        />

        {/* Provenance & Craftsmanship Section */}
        <CraftStorySection />

        {/* Flagship Salons & Private Fittings */}
        <BoutiqueConciergeSection />
      </main>

      {/* Global Clean Editorial Footer */}
      <Footer
        onNavClick={handleNavClick}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Product Detail Modal (PDP) */}
      {activeProduct && (
        <ProductDetailModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((w) => w.id === activeProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddReview={handleAddReview}
        />
      )}

      {/* Shopping Bag Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
        discountAmount={discountAmount}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(product) => {
          handleQuickAdd(product);
          setIsCartOpen(true);
        }}
      />

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={discountAmount}
        onCompleteOrder={handleCompleteOrder}
      />
    </div>
  );
}
