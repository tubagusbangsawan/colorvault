import React, { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { CURATED_PALETTES } from '../data/palettes/curated';
import { PaletteCard } from '../components/palette/PaletteCard';
import { AdContainer } from '../components/ads/AdContainer';

const CATEGORIES = [
  { id: 'all', label: 'ALL COLLECTIONS' },
  { id: 'warm', label: 'WARM' },
  { id: 'cool', label: 'COOL' },
  { id: 'pastel', label: 'PASTEL' },
  { id: 'neutral', label: 'NEUTRAL' },
  { id: 'vibrant', label: 'VIBRANT' },
  { id: 'dark', label: 'DARK' },
];

export const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPalettes = useMemo(() => {
    return CURATED_PALETTES.filter(palette => {
      if (selectedCategory !== 'all' && palette.category !== selectedCategory) {
        return false;
      }

      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = palette.name.toLowerCase().includes(query);
        const matchesHex = palette.colors.some(c => c.toLowerCase().includes(query));
        const matchesTags = palette.tags?.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesHex || matchesTags;
      }

      return true;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>ARCHIVE // EXP.02</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            CHROMATIC ARCHIVE
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-2xl leading-relaxed">
            CURATED EXHIBITION OF {CURATED_PALETTES.length} STATIC COLOR REPOSITORIES. HAND-COMPOSED FOR DIGITAL PUBLICATIONS, EXPERIMENTAL POSTERS, BRAND ARCHITECTURES, AND DESIGN CODEBASES.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">INDEX STATUS</div>
          <div className="text-black font-extrabold mt-0.5">
            {filteredPalettes.length} OF {CURATED_PALETTES.length} SETS LOADED
          </div>
        </div>
      </div>

      {/* Terminal Filter Toolbar */}
      <div className="border-2 border-black bg-white p-4 shadow-brutal mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-bold">
              [SEARCH]:
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="QUERY BY NAME, TAG, OR HEX (#FF5E7E)..."
              className="w-full pl-24 pr-16 py-2.5 bg-[#EEEEEE] text-xs font-bold uppercase text-black border border-black focus:outline-none focus:bg-white placeholder:text-neutral-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-neutral-600 hover:text-black underline"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Reset button if filtered */}
          {(searchTerm || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-3 py-2 border border-black bg-[#EEEEEE] hover:bg-black hover:text-white text-xs font-bold uppercase flex items-center justify-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESET</span>
            </button>
          )}
        </div>

        {/* Category Classification Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-black">
          <span className="text-[10px] font-bold uppercase text-neutral-500 mr-1">
            FILTER:
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold uppercase border border-black transition-none ${
                selectedCategory === cat.id
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-[#EEEEEE]'
              }`}
            >
              [{cat.label}]
            </button>
          ))}
        </div>
      </div>

      {/* Grid: First batch of 15 palettes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPalettes.slice(0, 15).map(palette => (
          <PaletteCard key={palette.id} palette={palette} />
        ))}
      </div>

      {/* Mid-Archive AdSense Placement */}
      <AdContainer slotId="explore-between-sections" format="horizontal" />

      {/* Grid: Remaining palettes */}
      {filteredPalettes.length > 15 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPalettes.slice(15).map(palette => (
            <PaletteCard key={palette.id} palette={palette} />
          ))}
        </div>
      )}

      {/* Empty Search State */}
      {filteredPalettes.length === 0 && (
        <div className="border-2 border-black bg-white p-12 text-center shadow-brutal my-8 space-y-4">
          <div className="text-sm font-bold uppercase text-[#FF321C]">
            [ 0 MATCHES FOUND IN CHROMATIC INDEX ]
          </div>
          <p className="text-xs uppercase text-neutral-600 max-w-sm mx-auto">
            No palette in the vault matched &quot;{searchTerm}&quot;. Check spelling or reset classification filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="btn-raw-black text-xs"
          >
            RESTORE FULL ARCHIVE &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
