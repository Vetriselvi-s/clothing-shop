import React, { useState } from 'react';
import { SlidersHorizontal, X, ArrowUpDown, Search } from 'lucide-react';
import { CATEGORIES, SIZES, COLOR_PALETTE } from '../data/products';
import { FilterState } from '../types/clothing';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  totalCount
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    onFilterChange({ ...filters, category: categoryId });
  };

  const handleGenderSelect = (gender: string) => {
    onFilterChange({ ...filters, gender: filters.gender === gender ? 'all' : gender });
  };

  const handleSizeSelect = (size: string) => {
    onFilterChange({ ...filters, size: filters.size === size ? '' : size });
  };

  const handleColorSelect = (hex: string) => {
    onFilterChange({ ...filters, colorHex: filters.colorHex === hex ? '' : hex });
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const handleReset = () => {
    onFilterChange({
      category: 'all',
      gender: 'all',
      size: '',
      colorHex: '',
      maxPrice: 600,
      sortBy: 'featured',
      searchQuery: ''
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.gender !== 'all' ||
    filters.size !== '' ||
    filters.colorHex !== '' ||
    filters.maxPrice < 600 ||
    filters.searchQuery !== '';

  return (
    <div className="w-full bg-[#FAF9F6] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        {/* Search Bar & Total Counter Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
              placeholder="Search garments by name, fabric, or style..."
              className="w-full bg-white border border-stone-300 py-2 pl-9 pr-8 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-stone-900"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white border border-stone-300 px-3 py-1.5">
              <ArrowUpDown size={13} className="text-stone-500" />
              <span className="uppercase tracking-wider font-medium text-[11px] text-stone-500">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="bg-transparent text-stone-900 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider font-medium px-3.5 py-2 border transition-colors cursor-pointer ${
                showAdvanced || hasActiveFilters
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
              }`}
            >
              <SlidersHorizontal size={13} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          </div>
        </div>

        {/* Primary Category Segmented Control (zero-pill, clean tabs) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-stone-200/70 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-stone-900 text-stone-900 font-semibold'
                    : 'border-transparent text-stone-500 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Collapsible Advanced Refinements */}
        {showAdvanced && (
          <div className="pt-4 pb-2 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-xs animate-in fade-in duration-200">
            {/* Gender / Wardrobe Department */}
            <div>
              <span className="block uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Department
              </span>
              <div className="flex gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'women', label: 'Womenswear' },
                  { id: 'men', label: 'Menswear' },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleGenderSelect(g.id)}
                    className={`px-3 py-1.5 border text-xs font-medium cursor-pointer transition-colors ${
                      filters.gender === g.id
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing */}
            <div>
              <span className="block uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Size Filter
              </span>
              <div className="flex gap-1">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleSizeSelect(sz)}
                    className={`w-8 h-8 flex items-center justify-center border text-xs uppercase font-medium cursor-pointer transition-colors ${
                      filters.size === sz
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="block uppercase tracking-wider font-semibold text-stone-700 mb-2">
                Color Family
              </span>
              <div className="flex items-center gap-2">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleColorSelect(c.hex)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border cursor-pointer transition-transform p-0.5 ${
                      filters.colorHex === c.hex
                        ? 'border-stone-900 scale-125'
                        : 'border-stone-300 hover:scale-110'
                    }`}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-stone-300"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex justify-between uppercase tracking-wider font-semibold text-stone-700 mb-2">
                <span>Max Price:</span>
                <span className="tabular-nums font-bold text-stone-900">${filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="150"
                max="600"
                step="25"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 tabular-nums">
                <span>$150</span>
                <span>$600+</span>
              </div>
            </div>
          </div>
        )}

        {/* Status & Clear Row */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-stone-900 tabular-nums">{totalCount}</strong> pieces</span>
            {hasActiveFilters && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-700">Filters active</span>
              </>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-stone-900 hover:underline uppercase tracking-wider font-medium text-[11px] cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
