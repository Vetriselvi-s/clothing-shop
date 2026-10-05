import React, { useState } from 'react';
import { X, Heart, Star, Check, Ruler, ShieldCheck, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import { Product, ProductColor, Review } from '../types/clothing';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onAddReview
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'measurements' | 'reviews'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  // New review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewFit, setReviewFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;
    onAddReview(product.id, {
      author: reviewerName.trim(),
      verified: true,
      rating: reviewRating,
      title: reviewTitle.trim() || 'Exceptional Quality',
      comment: reviewComment.trim(),
      sizePurchased: selectedSize,
      fitFeedback: reviewFit
    });
    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FAF9F6] w-full max-w-5xl max-h-[92vh] overflow-y-auto border border-stone-300 shadow-2xl flex flex-col">
        {/* Top Header Controls */}
        <div className="sticky top-0 z-20 bg-[#FAF9F6]/95 backdrop-blur-md px-6 py-3 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.origin}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body: Two columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Column: Imagery & Visuals (md:col-span-6) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-stone-900 text-white text-[11px] uppercase tracking-wider px-3 py-1 font-medium">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Supplementary detail banner */}
            <div className="bg-stone-100/70 border border-stone-200/80 p-4 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2 font-medium text-stone-900">
                <ShieldCheck size={16} className="text-stone-700" />
                <span>Fabric Sourcing & Composition</span>
              </div>
              <p className="leading-relaxed">{product.fabric}</p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module (md:col-span-6) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Title & Subtitle */}
              <div>
                <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
                  {product.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl font-light text-stone-900 font-editorial">
                  {product.name}
                </h2>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl font-semibold text-stone-900 tabular-nums">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ${product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 ml-auto flex items-center gap-1 font-medium">
                    <Star size={13} className="fill-stone-800 text-stone-800" />
                    <span className="tabular-nums">{product.rating.toFixed(2)}</span>
                    <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-medium text-stone-700">
                    Colorway: <span className="text-stone-900 font-semibold">{selectedColor.name}</span>
                  </span>
                  <span className="text-stone-500 text-[11px]">Natural dyestuffs</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color.name}`}
                        className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 flex items-center justify-center cursor-pointer ${
                          isSelected ? 'border-stone-900 scale-110 shadow-xs' : 'border-transparent hover:border-stone-300'
                        }`}
                      >
                        <span
                          className="w-full h-full rounded-full border border-stone-300 block"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-medium text-stone-700">
                    Size: <span className="text-stone-900 font-semibold">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-stone-600 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler size={13} />
                    <span>Garment Measurements</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1">
                  <span>Silhouette: <strong>{product.fit}</strong></span>
                  <span className="text-emerald-700 font-medium">In Stock · Ready to dispatch</span>
                </div>
              </div>

              {/* Measurements pop-out table */}
              {showSizeGuide && product.measurements && (
                <div className="p-4 bg-stone-100 border border-stone-300 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between font-semibold text-stone-900 uppercase tracking-wider text-[11px]">
                    <span>Exact Finished Measurements (cm)</span>
                    <button onClick={() => setShowSizeGuide(false)} className="text-stone-500 hover:text-stone-900">
                      <X size={14} />
                    </button>
                  </div>
                  <table className="w-full text-left text-stone-700 border-collapse">
                    <thead>
                      <tr className="border-b border-stone-300 text-stone-500 text-[10px] uppercase">
                        <th className="py-1">Size</th>
                        <th className="py-1">Chest</th>
                        <th className="py-1">Length</th>
                        <th className="py-1">Sleeve</th>
                        {product.measurements[selectedSize]?.waist && <th className="py-1">Waist</th>}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 tabular-nums">
                      {Object.entries(product.measurements).map(([sz, m]) => (
                        <tr key={sz} className={sz === selectedSize ? 'bg-stone-200/70 font-semibold text-stone-900' : ''}>
                          <td className="py-1.5">{sz}</td>
                          <td className="py-1.5">{m.chest}</td>
                          <td className="py-1.5">{m.length}</td>
                          <td className="py-1.5">{m.sleeve}</td>
                          {m.waist && <td className="py-1.5">{m.waist}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-[10px] text-stone-500 italic pt-1">
                    Measurements taken flat. For tailoring consultations, visit our Flagship Boutiques.
                  </p>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag Contiguous CTA */}
              <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-3 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-stone-900 hover:bg-stone-800 text-white py-3.5 px-6 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {addedToast ? (
                    <>
                      <Check size={16} className="text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`p-3.5 border transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'border-stone-900 bg-stone-900 text-rose-400'
                      : 'border-stone-300 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Trust markers */}
              <div className="grid grid-cols-2 gap-3 pt-3 text-[11px] text-stone-600 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-stone-800" />
                  <span>Complimentary Shipping &gt; $150</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-stone-800" />
                  <span>30-Day Hassle-Free Returns</span>
                </div>
              </div>
            </div>

            {/* Tabbed Supplementary Drawer (Details vs Reviews) */}
            <div className="mt-8 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-500 border-b border-stone-200 pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`cursor-pointer transition-colors pb-1 ${activeTab === 'details' ? 'text-stone-900 font-semibold border-b-2 border-stone-900' : 'hover:text-stone-900'}`}
                >
                  Care & Provenance
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`cursor-pointer transition-colors pb-1 flex items-center gap-1.5 ${activeTab === 'reviews' ? 'text-stone-900 font-semibold border-b-2 border-stone-900' : 'hover:text-stone-900'}`}
                >
                  <span>Customer Reviews</span>
                  <span className="text-[10px] tabular-nums font-semibold bg-stone-200 px-1.5 py-0.2">
                    {product.reviews.length}
                  </span>
                </button>
              </div>

              {activeTab === 'details' && (
                <div className="pt-3 text-xs text-stone-600 space-y-2 leading-relaxed">
                  <p><strong>Origin:</strong> {product.origin}</p>
                  <p><strong>Care Instructions:</strong> Dry clean only or hand wash in cold water using delicate wool wash. Dry flat on towels away from direct heat. Do not tumble dry.</p>
                  <p><strong>Sustainability Commitment:</strong> Crafted with zero chemical coatings and zero microplastics. Certified Oeko-Tex Standard 100.</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="pt-3 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-stone-900 tabular-nums">
                        {product.rating.toFixed(2)} out of 5
                      </span>
                      <span className="text-xs text-stone-500 ml-2">Based on {product.reviews.length} verified purchases</span>
                    </div>
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="text-xs uppercase tracking-wider font-medium underline text-stone-900 hover:text-stone-700 cursor-pointer"
                    >
                      {showReviewForm ? 'Cancel' : 'Write Review'}
                    </button>
                  </div>

                  {/* Add review form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="p-4 bg-stone-100 border border-stone-300 space-y-3 text-xs">
                      <p className="font-semibold text-stone-900 uppercase tracking-wider text-[11px]">Share your fitting experience</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-600 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            placeholder="e.g. Camille Laurent"
                            className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1">Star Rating</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(Number(e.target.value))}
                            className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-800"
                          >
                            <option value={5}>5 Stars - Immaculate</option>
                            <option value={4}>4 Stars - High Quality</option>
                            <option value={3}>3 Stars - Satisfactory</option>
                            <option value={2}>2 Stars - Below Expectations</option>
                            <option value={1}>1 Star - Flawed</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-stone-600 mb-1">Review Headline</label>
                          <input
                            type="text"
                            value={reviewTitle}
                            onChange={(e) => setReviewTitle(e.target.value)}
                            placeholder="e.g. Stunning craftsmanship"
                            className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-stone-600 mb-1">Fit Feedback</label>
                          <select
                            value={reviewFit}
                            onChange={(e) => setReviewFit(e.target.value as any)}
                            className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-800"
                          >
                            <option value="True to Size">True to Size</option>
                            <option value="Runs Small">Runs Small</option>
                            <option value="Runs Large">Runs Large</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-600 mb-1">Review Details</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="How did the fabric feel? How does it drape on you?"
                          className="w-full bg-white border border-stone-300 p-2 text-stone-900 focus:outline-stone-800"
                        />
                      </div>

                      <button
                        type="submit"
                        className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 uppercase tracking-wider text-[11px] font-medium cursor-pointer"
                      >
                        Publish Verified Review
                      </button>
                    </form>
                  )}

                  {/* Reviews list */}
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white border border-stone-200 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-stone-900">{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[10px] text-stone-500 font-medium">· Verified Buyer</span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < rev.rating ? "fill-stone-800 text-stone-800" : "text-stone-300"}
                            />
                          ))}
                          <span className="text-[10px] text-stone-500 ml-2">Fit: {rev.fitFeedback} (Purchased {rev.sizePurchased})</span>
                        </div>
                        <p className="font-medium text-stone-900">{rev.title}</p>
                        <p className="text-stone-600 leading-relaxed font-light">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
