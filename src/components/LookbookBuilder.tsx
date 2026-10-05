import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types/clothing';

interface LookbookBuilderProps {
  products: Product[];
  onAddLookToCart: (items: { product: Product; size: string; color: any }[]) => void;
}

export const LookbookBuilder: React.FC<LookbookBuilderProps> = ({
  products,
  onAddLookToCart
}) => {
  const outerwears = products.filter((p) => p.category === 'outerwear' || p.category === 'tailoring');
  const tops = products.filter((p) => p.category === 'knitwear' || p.category === 'shirts');
  const bottoms = products.filter((p) => p.category === 'trousers');

  const [selectedOuter, setSelectedOuter] = useState<Product>(outerwears[0] || products[0]);
  const [selectedTop, setSelectedTop] = useState<Product>(tops[0] || products[1]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(bottoms[0] || products[3]);
  const [added, setAdded] = useState(false);

  const subtotal = selectedOuter.price + selectedTop.price + selectedBottom.price;
  const bundleDiscount = Math.round(subtotal * 0.1); // 10% capsule styling benefit
  const total = subtotal - bundleDiscount;

  const handleAddCapsule = () => {
    onAddLookToCart([
      { product: selectedOuter, size: 'M', color: selectedOuter.colors[0] },
      { product: selectedTop, size: 'M', color: selectedTop.colors[0] },
      { product: selectedBottom, size: 'M', color: selectedBottom.colors[0] },
    ]);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section id="curated-looks" className="py-16 md:py-24 bg-[#F2F0EB] border-t border-b border-stone-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
            Capsule Wardrobe Atelier
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 font-editorial [text-wrap:balance]">
            Assemble Your Modular Look
          </h2>
          <p className="text-sm text-stone-600 mt-3 font-light leading-relaxed">
            Select three foundation pieces designed to harmonise across tones and drape. Receive an automatic 10% Capsule ensemble savings when purchasing the complete trinity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3 Selectable Garment Slots */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Slot 1: Outerwear */}
            <div className="bg-white p-4 border border-stone-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-2">
                  01. Outer Layer
                </span>
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  <img
                    src={selectedOuter.image}
                    alt={selectedOuter.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-medium text-stone-900 font-editorial line-clamp-1">
                  {selectedOuter.name}
                </h4>
                <p className="text-xs text-stone-700 font-semibold tabular-nums mt-0.5">
                  ${selectedOuter.price}
                </p>
              </div>

              {/* Selector Options */}
              <div className="pt-3 border-t border-stone-200 mt-3 space-y-1">
                <span className="text-[10px] uppercase text-stone-400 font-medium">Switch Piece:</span>
                <div className="space-y-1">
                  {outerwears.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedOuter(item)}
                      className={`w-full text-left text-[11px] px-2 py-1.5 transition-colors cursor-pointer truncate ${
                        selectedOuter.id === item.id
                          ? 'bg-stone-900 text-white font-medium'
                          : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 2: Knitwear / Shirt */}
            <div className="bg-white p-4 border border-stone-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-2">
                  02. Base & Mid Layer
                </span>
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  <img
                    src={selectedTop.image}
                    alt={selectedTop.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-medium text-stone-900 font-editorial line-clamp-1">
                  {selectedTop.name}
                </h4>
                <p className="text-xs text-stone-700 font-semibold tabular-nums mt-0.5">
                  ${selectedTop.price}
                </p>
              </div>

              {/* Selector Options */}
              <div className="pt-3 border-t border-stone-200 mt-3 space-y-1">
                <span className="text-[10px] uppercase text-stone-400 font-medium">Switch Piece:</span>
                <div className="space-y-1">
                  {tops.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedTop(item)}
                      className={`w-full text-left text-[11px] px-2 py-1.5 transition-colors cursor-pointer truncate ${
                        selectedTop.id === item.id
                          ? 'bg-stone-900 text-white font-medium'
                          : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 3: Trousers / Denim */}
            <div className="bg-white p-4 border border-stone-300 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-2">
                  03. Lower Silhouette
                </span>
                <div className="aspect-[3/4] bg-stone-100 overflow-hidden mb-3">
                  <img
                    src={selectedBottom.image}
                    alt={selectedBottom.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-sm font-medium text-stone-900 font-editorial line-clamp-1">
                  {selectedBottom.name}
                </h4>
                <p className="text-xs text-stone-700 font-semibold tabular-nums mt-0.5">
                  ${selectedBottom.price}
                </p>
              </div>

              {/* Selector Options */}
              <div className="pt-3 border-t border-stone-200 mt-3 space-y-1">
                <span className="text-[10px] uppercase text-stone-400 font-medium">Switch Piece:</span>
                <div className="space-y-1">
                  {bottoms.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedBottom(item)}
                      className={`w-full text-left text-[11px] px-2 py-1.5 transition-colors cursor-pointer truncate ${
                        selectedBottom.id === item.id
                          ? 'bg-stone-900 text-white font-medium'
                          : 'hover:bg-stone-100 text-stone-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Look Summary Card (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#FAF9F6] border border-stone-300 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-stone-800 text-xs uppercase tracking-wider font-semibold">
                <Sparkles size={14} />
                <span>The Trinity Capsule Bundle</span>
              </div>

              <h3 className="text-2xl font-light text-stone-900 font-editorial mt-2">
                Curated Harmonious Ensemble
              </h3>

              <div className="mt-4 space-y-2 text-xs text-stone-600 divide-y divide-stone-200">
                <div className="pt-2 flex justify-between">
                  <span className="truncate pr-2">{selectedOuter.name}</span>
                  <span className="tabular-nums font-medium text-stone-900">${selectedOuter.price}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="truncate pr-2">{selectedTop.name}</span>
                  <span className="tabular-nums font-medium text-stone-900">${selectedTop.price}</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="truncate pr-2">{selectedBottom.name}</span>
                  <span className="tabular-nums font-medium text-stone-900">${selectedBottom.price}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-300 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Regular Total</span>
                  <span className="tabular-nums line-through">${subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-800 font-medium">
                  <span>Capsule Styling Benefit (-10%)</span>
                  <span className="tabular-nums">-${bundleDiscount}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Bundle Price</span>
                  <span className="tabular-nums text-lg">${total}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddCapsule}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3.5 px-4 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span>3 Items Added to Bag</span>
                </>
              ) : (
                <>
                  <span>Add Entire Capsule to Bag</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
