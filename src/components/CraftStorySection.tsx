import React from 'react';
import { Compass, Feather, RefreshCw, Scissors } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  return (
    <section id="craft" className="py-20 md:py-28 bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
            Provenance & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-stone-900 font-editorial [text-wrap:balance]">
            Constructed to Outlive Trends.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-4 font-light leading-relaxed">
            We partner exclusively with legacy family-run weaving mills in Northern Italy, Lyon, and Kojima. Every seam is finished with reinforced chain stitching or French interior seams.
          </p>
        </div>

        {/* 3 Editorial Craft Pillars (Natural human numbering 01, 02, 03) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Pillar 1 */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-stone-400">01.</span>
            <h3 className="text-xl font-light text-stone-900 font-editorial">
              Piedmont Virgin Wool Mills
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Sourced from heritage mills operating at the foothills of the Italian Alps since 1886. Water from alpine glacial streams lends our wool yarn unmatched softness and natural resilience.
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              Biella, Northern Italy
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-stone-400">02.</span>
            <h3 className="text-xl font-light text-stone-900 font-editorial">
              Vintage Toyoda Shuttle Looms
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Our denim is woven in Okayama at five times lower speeds than modern projectile looms. This slow, low-tension tensioning generates organic slub texture and authentic selvedge self-edges.
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              Kojima, Okayama Prefecture
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-4">
            <span className="text-xs font-mono text-stone-400">03.</span>
            <h3 className="text-xl font-light text-stone-900 font-editorial">
              The Lifetime Repair Charter
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              True luxury is repairable. We offer complimentary lifetime button replacement, seam re-stitching, and re-waxing across our global flagship boutiques or via prepaid courier bags.
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-wider text-stone-500 font-medium">
              Zero Waste Commitment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
