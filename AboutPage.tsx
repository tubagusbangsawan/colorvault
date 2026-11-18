import React from 'react';
import { Link } from 'react-router-dom';
import { AdContainer } from '../components/ads/AdContainer';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-8 md:py-16 max-w-5xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Editorial Title */}
      <div className="border-b-2 border-black pb-8 mb-12 space-y-3">
        <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF]">
          <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
          <span>MANIFESTO // DOC.05</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-black">
          COLORVAULT MANIFESTO
        </h1>
        <p className="text-sm uppercase text-neutral-600 font-bold max-w-2xl leading-relaxed">
          FIND YOUR PERFECT COLOR. AN INDEPENDENT DIGITAL UTILITY ESTABLISHED TO LIBERATE CHROMATIC EXPLORATION FROM SAAS BLOAT, AI FADS, AND DATA EXTRACTIVISM.
        </p>
      </div>

      {/* Core Doctrine Section */}
      <div className="border-2 border-black bg-white p-6 sm:p-10 shadow-brutal mb-12 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <span className="text-xs font-bold uppercase text-[#FF321C]">
            [ CORE DESIGN SYSTEM DOCTRINE ]
          </span>
          <span className="text-xs font-bold uppercase text-neutral-500">
            ARTICLE 01
          </span>
        </div>

        <div className="space-y-4 text-xs sm:text-sm uppercase font-bold leading-relaxed text-black">
          <p>
            Modern web design utilities have surrendered to bloated subscription fees, mandatory logins, and speculative artificial intelligence features that hallucinate inaccurate color math.
          </p>
          <p>
            COLORVAULT takes the diametric opposite approach. <strong>Every calculation—from geometric HSL radian hue rotations to W3C relative luminance ratios—is computed deterministically in pure JavaScript right in your browser.</strong>
          </p>
          <p>
            Zero accounts. Zero cloud databases. Zero surveillance cookies. Your curated color palettes reside exclusively in your device&apos;s isolated <code className="bg-[#EEEEEE] px-1 border border-black text-[#2020FF]">localStorage</code> space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-black">
          <div className="border border-black p-3 bg-[#EEEEEE]">
            <div className="text-[10px] text-neutral-500 font-bold">PRINCIPLE 01</div>
            <div className="text-xs font-black uppercase mt-1">NO AI GENERATION</div>
            <p className="text-[10px] text-neutral-600 uppercase mt-0.5">DETERMINISTIC OPTICAL SCIENCE</p>
          </div>
          <div className="border border-black p-3 bg-[#EEEEEE]">
            <div className="text-[10px] text-neutral-500 font-bold">PRINCIPLE 02</div>
            <div className="text-xs font-black uppercase mt-1">ZERO LATENCY</div>
            <p className="text-[10px] text-neutral-600 uppercase mt-0.5">INSTANT LOCAL EXECUTION</p>
          </div>
          <div className="border border-black p-3 bg-[#EEEEEE]">
            <div className="text-[10px] text-neutral-500 font-bold">PRINCIPLE 03</div>
            <div className="text-xs font-black uppercase mt-1">OPEN ACCESS</div>
            <p className="text-[10px] text-neutral-600 uppercase mt-0.5">NO REGISTRATION GATEWAY</p>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="about-content-section" format="horizontal" />

      {/* Tool Architecture Dossier */}
      <div className="space-y-6 my-14">
        <div className="border-b-2 border-black pb-2 flex items-center justify-between">
          <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
            INSTRUMENT SUITE BREAKDOWN
          </h2>
          <span className="text-xs font-bold text-neutral-500">[ 5 PROTOCOLS ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold text-[#2020FF] uppercase">
              // PROTOCOL 01
            </div>
            <h3 className="font-bold text-base uppercase">Palette Generator</h3>
            <p className="text-xs uppercase text-neutral-600 font-bold leading-relaxed">
              5-slot chromatic synthesizer with individual slot locking, inline HEX overrides, and instant CSS / PNG exports.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold text-[#FF321C] uppercase">
              // PROTOCOL 02
            </div>
            <h3 className="font-bold text-base uppercase">Color Harmony Explorer</h3>
            <p className="text-xs uppercase text-neutral-600 font-bold leading-relaxed">
              Classical color wheel degree rotations: Complementary (180°), Triadic (120°), Analogous (±30°), Tetradic, and Monochromatic.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold text-[#39FF14] uppercase">
              // PROTOCOL 03
            </div>
            <h3 className="font-bold text-base uppercase">WCAG 2.1 Contrast Checker</h3>
            <p className="text-xs uppercase text-neutral-600 font-bold leading-relaxed">
              Relative luminance ratio calculations verifying compliance for Level AA (4.5:1 / 3:1) and AAA (7:1 / 4.5:1) with live typographical specimens.
            </p>
          </div>

          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold text-[#FFDE00] uppercase">
              // PROTOCOL 04
            </div>
            <h3 className="font-bold text-base uppercase">Color Picker & Converter</h3>
            <p className="text-xs uppercase text-neutral-600 font-bold leading-relaxed">
              HEX validation, dynamic channel sliders across RGB and HSL, and optical complementary color pairing.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-2 border-black bg-black text-white p-8 sm:p-12 shadow-brutal text-center space-y-4">
        <div className="text-xs font-bold uppercase text-[#39FF14]">
          [ DISPATCH COMMUNICATION ]
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl uppercase">
          INQUIRIES, BUG TRANSMISSIONS & FEEDBACK
        </h3>
        <p className="text-xs uppercase text-neutral-400 max-w-md mx-auto font-bold leading-relaxed">
          COLORVAULT IS COMMITTED TO REMAINING A LEAN, BRUTALIST UTILITY. SEND INQUIRIES OR PROPOSE NEW COMPUTATIONAL COLOR MODULES.
        </p>
        <div className="pt-2">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2020FF] text-white hover:bg-white hover:text-black font-bold uppercase text-xs border-2 border-white transition-none"
          >
            <span>TRANSMIT DISPATCH &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
