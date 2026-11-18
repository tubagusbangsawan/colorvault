import React from 'react';
import { PaletteGenerator } from '../components/palette/PaletteGenerator';
import { AdContainer } from '../components/ads/AdContainer';

export const GeneratorPage: React.FC = () => {
  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Editorial Title Banner */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>PROTOCOL // GEN.01</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            PALETTE GENERATOR
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            5-SLOT DETERMINISTIC CHROMATIC RANDOMIZER. LOCK PREFERRED COLOR SLOTS, OVERRIDE HEX CODES INLINE, AND EXPORT DIRECT TO CSS OR PNG.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">OPERATIONAL KEY</div>
          <div className="text-black font-extrabold mt-0.5">PRESS [SPACEBAR] TO GENERATE</div>
        </div>
      </div>

      {/* Main Generator Deck */}
      <div className="mb-12">
        <PaletteGenerator />
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="generator-below-tool" format="horizontal" />

      {/* Technical Spec Dossier */}
      <div className="mt-14 border-t-2 border-black pt-8">
        <div className="text-xs font-bold uppercase text-neutral-500 mb-4">
          [ USER OPERATING SPECIFICATIONS ]
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold uppercase text-[#2020FF]">
              01 // STATE LOCKING
            </div>
            <h3 className="font-bold text-sm uppercase">Selective Retention</h3>
            <p className="text-xs uppercase text-neutral-600 leading-relaxed">
              Click the [OPEN] stamp on any slot to transition it to [LOCKED]. When spacebar is pressed, only unlocked slots are recomputed.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold uppercase text-[#FF321C]">
              02 // CLIPBOARD BUS
            </div>
            <h3 className="font-bold text-sm uppercase">Direct Copy Protocol</h3>
            <p className="text-xs uppercase text-neutral-600 leading-relaxed">
              Click any large HEX value to copy its code directly. Press [C] or click [COPY] in the top toolbar to dump all 5 HEX values.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold uppercase text-[#39FF14]">
              03 // ASSET EXPORT
            </div>
            <h3 className="font-bold text-sm uppercase">CSS & PNG Render</h3>
            <p className="text-xs uppercase text-neutral-600 leading-relaxed">
              Download clean CSS variables formatted for modern frontend stylesheets or export a 2x pixel ratio PNG graphic card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
