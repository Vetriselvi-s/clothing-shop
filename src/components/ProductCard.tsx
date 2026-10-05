import React from 'react';
import { Heart, Eye, Plus } from 'lucide-react';
import { Product } from '../types/clothing';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <article className="group flex flex-col bg-white border border-stone-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
      {/* Visual Canvas (65%-75% of card height) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F4F0] cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Subtle Single Text Tag (NO pill badge sandwich) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#FAF9F6]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium text-stone-800 border border-stone-200/60">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from saved items" : "Save to wishlist"}
          className={`absolute top-3 right-3 p-2 transition-colors duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-stone-900 text-rose-400'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900'
          } backdrop-blur-xs`}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} strokeWidth={1.75} />
        </button>

        {/* Bottom Quick-Action Reveal on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-stone-950/70 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 bg-white hover:bg-stone-100 text-stone-900 py-2 px-3 text-[11px] uppercase tracking-wider font-medium text-center transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            aria-label={`Quick add ${product.name} to bag`}
            className="bg-stone-900 hover:bg-stone-800 text-white p-2 transition-colors cursor-pointer"
            title="Quick Add to Bag"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Metadata Container */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2 bg-white">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.fit}</span>
          </div>

          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-medium text-stone-900 font-editorial mt-1 leading-snug cursor-pointer hover:underline line-clamp-1"
          >
            {product.name}
          </h3>
        </div>

        <div className="pt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-stone-900 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1" title={`${product.colors.length} color variants`}>
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.hex}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
