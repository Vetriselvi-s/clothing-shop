import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavClick: (id: string) => void;
  currency: string;
  onCurrencyChange: (c: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavClick,
  currency,
  onCurrencyChange
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          {/* Brand & Editorial Column */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl font-bold tracking-wider text-white font-editorial uppercase">
              L’ATELIER
            </span>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Contemporary ready-to-wear tailored from unblended virgin wools, Grade-A cashmere, and artisanal Japanese selvedge. Crafted for quiet longevity.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-4 space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-stone-300 font-medium block">
                Seasonal Gazette & Private Previews
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                  <Check size={14} />
                  <span>You are subscribed to the Atelier Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-sm">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-stone-800 border border-stone-700 px-3.5 py-2.5 text-xs text-white placeholder:text-stone-500 focus:outline-stone-500"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-stone-200 text-stone-900 px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Join</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-white font-medium uppercase tracking-wider block">Collection</span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => onNavClick('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Outerwear & Coats
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Cashmere Knitwear
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Tailored Suiting
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Selvedge Denim
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('curated-looks')} className="hover:text-white transition-colors cursor-pointer">
                  Capsule Assembler
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-2 space-y-3 text-xs">
            <span className="text-white font-medium uppercase tracking-wider block">Concierge</span>
            <ul className="space-y-2 text-stone-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Complimentary Shipping</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">30-Day Returns</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Lifetime Garment Repairs</span>
              </li>
              <li>
                <button onClick={() => onNavClick('boutiques')} className="hover:text-white transition-colors cursor-pointer">
                  Book Fitting Session
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Bespoke Alterations</span>
              </li>
            </ul>
          </div>

          {/* Currency & Boutiques */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <span className="text-white font-medium uppercase tracking-wider block">Global Salons</span>
            <p className="text-stone-400 leading-relaxed">
              Paris · New York · Tokyo · London · Milan
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                Currency & Region
              </span>
              <div className="flex gap-2">
                {['USD ($)', 'EUR (€)', 'GBP (£)'].map((cur) => (
                  <button
                    key={cur}
                    onClick={() => onCurrencyChange(cur)}
                    className={`px-2.5 py-1 text-[11px] border cursor-pointer transition-colors ${
                      currency === cur
                        ? 'border-white text-white font-semibold bg-stone-800'
                        : 'border-stone-700 text-stone-400 hover:text-white'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© 2026 L’Atelier Studio SARL. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300 transition-colors cursor-pointer">Ethical Sourcing Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
