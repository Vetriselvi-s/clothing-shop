import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types/clothing';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col border-l border-stone-300 shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-light text-stone-900 font-editorial uppercase tracking-wider">
              Saved Pieces
            </h3>
            <span className="text-xs font-semibold tabular-nums text-stone-500 bg-stone-100 px-2 py-0.5">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-200">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-sm text-stone-500 font-light">No garments saved to your wishlist yet.</p>
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                <div className="w-20 h-26 bg-stone-100 shrink-0 overflow-hidden border border-stone-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-stone-900 font-editorial line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                        aria-label={`Remove ${product.name} from wishlist`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5 uppercase tracking-wider">
                      {product.category} · {product.fit}
                    </p>
                    <p className="text-xs font-semibold text-stone-900 tabular-nums mt-1">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onMoveToCart(product);
                      onRemoveFromWishlist(product);
                    }}
                    className="mt-2 w-full bg-stone-900 hover:bg-stone-800 text-white py-2 text-[11px] uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
