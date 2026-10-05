import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/clothing';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  onApplyPromo,
  discountAmount
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || items.length === 0 ? 0 : 20;
  const estimatedTax = Math.round(subtotal * 0.08); // 8% standard tax
  const total = Math.max(0, subtotal - discountAmount + shippingFee + (subtotal > 0 ? estimatedTax : 0));

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoSuccess(`Voucher ${promoInput.trim().toUpperCase()} applied!`);
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try ATELIER10 or WELCOME');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF9F6] h-full flex flex-col border-l border-stone-300 shadow-2xl relative">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-light text-stone-900 font-editorial uppercase tracking-wider">
              Shopping Bag
            </h3>
            <span className="text-xs font-semibold tabular-nums text-stone-500 bg-stone-100 px-2 py-0.5">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5F4F0] px-6 py-3 border-b border-stone-200 text-xs">
          {amountToFreeShipping > 0 ? (
            <p className="text-stone-600">
              Add <strong className="text-stone-900 tabular-nums">${amountToFreeShipping}</strong> more for complimentary worldwide shipping.
            </p>
          ) : (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <span>✓ Complimentary Carbon-Neutral Shipping unlocked</span>
            </p>
          )}
          <div className="w-full bg-stone-200 h-1 mt-2 overflow-hidden">
            <div
              className="bg-stone-900 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-200">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-sm text-stone-500 font-light">Your shopping bag is currently empty.</p>
              <button
                onClick={onClose}
                className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 text-xs uppercase tracking-widest font-medium cursor-pointer"
              >
                Discover Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-26 bg-stone-100 shrink-0 overflow-hidden border border-stone-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-medium text-stone-900 font-editorial line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Size: <span className="font-semibold text-stone-800 uppercase">{item.selectedSize}</span> · Color: {item.selectedColor.name}
                    </p>
                  </div>

                  {/* Quantity controls & item price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-stone-300 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-stone-600 hover:text-stone-900 cursor-pointer text-xs"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-stone-600 hover:text-stone-900 cursor-pointer text-xs"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-stone-900 tabular-nums">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-4">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromoCode} className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Voucher (e.g. ATELIER10)"
                  className="flex-1 bg-stone-50 border border-stone-300 px-3 py-1.5 text-xs uppercase placeholder:normal-case focus:outline-stone-900"
                />
                <button
                  type="submit"
                  className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-3 py-1.5 text-xs uppercase font-medium tracking-wider cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-[11px] text-rose-600">{promoError}</p>}
              {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-stone-900">${subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Savings ({promoCode || 'Promotion'})</span>
                  <span className="tabular-nums">-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="tabular-nums font-medium text-stone-900">
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="tabular-nums font-medium text-stone-900">${estimatedTax}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="tabular-nums">${total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 px-4 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={14} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-stone-400 uppercase tracking-wider">
              <ShieldCheck size={13} />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
