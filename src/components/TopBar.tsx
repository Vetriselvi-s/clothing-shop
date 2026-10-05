import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X } from 'lucide-react';

interface TopBarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchClick: () => void;
  activeNav: string;
  onNavClick: (sectionId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSearchClick,
  activeNav,
  onNavClick
}) => {
  const [showPromo, setShowPromo] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional Bar (slim <= 40px, dismissible) */}
      {showPromo && (
        <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 flex items-center justify-between">
          <div className="mx-auto flex items-center gap-3">
            <span>Complimentary Carbon-Neutral Worldwide Shipping on orders over $150</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-400">Autumn/Winter 26 Capsule Now Live</span>
          </div>
          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white transition-colors p-0.5"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Strict Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-6 nav links) — Zone 3 (Primary actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavClick('hero')}
          className="text-2xl sm:text-3xl font-semibold tracking-wider text-stone-900 font-editorial uppercase cursor-pointer hover:opacity-85 transition-opacity"
        >
          L’ATELIER
        </button>

        {/* Zone 2: 4 Clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-stone-600">
          <button
            onClick={() => onNavClick('collection')}
            className={`hover:text-stone-900 transition-colors cursor-pointer py-1 relative ${
              activeNav === 'collection' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Collection
            {activeNav === 'collection' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
          <button
            onClick={() => onNavClick('curated-looks')}
            className={`hover:text-stone-900 transition-colors cursor-pointer py-1 relative ${
              activeNav === 'curated-looks' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Capsule Looks
            {activeNav === 'curated-looks' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
          <button
            onClick={() => onNavClick('craft')}
            className={`hover:text-stone-900 transition-colors cursor-pointer py-1 relative ${
              activeNav === 'craft' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            The Craft
            {activeNav === 'craft' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
          <button
            onClick={() => onNavClick('boutiques')}
            className={`hover:text-stone-900 transition-colors cursor-pointer py-1 relative ${
              activeNav === 'boutiques' ? 'text-stone-900 font-semibold' : ''
            }`}
          >
            Boutiques
            {activeNav === 'boutiques' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-4 sm:gap-6 text-stone-800">
          <button
            onClick={onSearchClick}
            aria-label="Search garments"
            className="p-1.5 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <Search size={19} strokeWidth={1.75} />
          </button>

          <button
            onClick={onOpenWishlist}
            aria-label="View saved items"
            className="p-1.5 hover:text-stone-900 transition-colors relative cursor-pointer"
          >
            <Heart size={19} strokeWidth={1.75} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Open shopping bag"
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-3.5 py-2 rounded-none transition-colors cursor-pointer group"
          >
            <ShoppingBag size={17} strokeWidth={1.75} />
            <span className="text-xs uppercase tracking-wider hidden sm:inline font-medium">Bag</span>
            <span className="text-xs tabular-nums font-semibold bg-stone-800 group-hover:bg-stone-700 px-1.5 py-0.5 ml-0.5">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
