import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onLookbookClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onLookbookClick
}) => {
  return (
    <section className="relative w-full bg-[#F5F4F0] border-b border-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-semibold text-stone-500">
              <span>Collection No. 14</span>
              <span aria-hidden="true">/</span>
              <span>Autumn Winter 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-stone-900 font-editorial tracking-tight leading-[1.08] [text-wrap:balance]">
              Sculptural Form. <br />
              <span className="italic font-normal">Pure Natural Drape.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-xl">
              Engineered from unadulterated Italian virgin wool, Grade-A cashmere, and Japanese shuttle-loom denim. Tailored in small batches with uncompromising structural integrity.
            </p>

            {/* Adjacent Trust Proofs */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 font-medium">
              <span>Biella & Okayama Sourced</span>
              <span aria-hidden="true">·</span>
              <span>Zero Synthetic Blends</span>
              <span aria-hidden="true">·</span>
              <span>Lifetime Repair Guarantee</span>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-medium py-3.5 px-7 transition-colors cursor-pointer"
              >
                Shop Ready-to-Wear
              </button>
              <button
                onClick={onLookbookClick}
                className="border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-widest font-medium py-3.5 px-6 transition-colors cursor-pointer bg-white/60 hover:bg-white"
              >
                Assemble Capsule Looks
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-stone-200 border border-stone-300/60 shadow-xs">
              <img
                src="/src/assets/images/hero_fashion_editorial_1791180978401.jpg"
                alt="L'Atelier Autumn Winter Editorial Campaign"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.015] transition-transform duration-700 ease-out"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-stone-900/85 backdrop-blur-md text-white p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-wider uppercase text-stone-300 font-light">Featured Ensemble</p>
                  <p className="text-sm font-editorial font-medium">The Calder Wool Trench & Tailored Trousers</p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="text-xs uppercase tracking-wider underline underline-offset-4 text-stone-200 hover:text-white transition-colors cursor-pointer"
                >
                  View Pieces
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
