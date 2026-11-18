import React from 'react';
import { Link } from 'react-router-dom';
import {
  PaletteGenerator,
} from '../components/palette/PaletteGenerator';
import { PaletteCard } from '../components/palette/PaletteCard';
import { CURATED_PALETTES } from '../data/palettes/curated';
import { AdContainer } from '../components/ads/AdContainer';
import { ArrowUpRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  const featuredPalettes = CURATED_PALETTES.slice(0, 6);

  const toolsIndex = [
    {
      index: '01',
      code: 'GEN.01',
      title: 'PALETTE GENERATOR',
      spec: '5-SLOT CHROMATIC RANDOMIZER',
      description: 'Generates cohesive 5-tone palettes with individual slot locks, inline HEX overrides, and instant CSS / PNG exports.',
      path: '/generator',
      accent: 'bg-[#2020FF] text-white',
    },
    {
      index: '02',
      code: 'PCK.02',
      title: 'COLOR PICKER & CONVERTER',
      spec: 'COORDINATE PROBE (HEX / RGB / HSL)',
      description: 'Live color input with channel sliders across RGB and HSL color models, instant format copy, and complementary pairing.',
      path: '/picker',
      accent: 'bg-black text-white',
    },
    {
      index: '03',
      code: 'HRM.03',
      title: 'COLOR HARMONY EXPLORER',
      spec: 'HSL HUE ROTATION (180° / 120° / 90°)',
      description: 'True geometric color wheel rotations: Complementary, Triadic, Analogous, Split-Complementary, Tetradic, and Monochromatic.',
      path: '/harmony',
      accent: 'bg-[#39FF14] text-black',
    },
    {
      index: '04',
      code: 'CNT.04',
      title: 'WCAG 2.1 CONTRAST CHECKER',
      spec: 'RELATIVE LUMINANCE RATIO VERIFICATION',
      description: 'Strict W3C formula verification against Level AA and AAA standards with live typography previews and instant color swapping.',
      path: '/contrast',
      accent: 'bg-[#FF321C] text-white',
    },
    {
      index: '05',
      code: 'GRD.05',
      title: 'GRADIENT STUDIO',
      spec: 'LINEAR & RADIAL RENDERER',
      description: 'Parametric directional angle rotation, multi-stop arrangement, curated presets, and PNG raster output.',
      path: '/gradient',
      accent: 'bg-[#FFDE00] text-black',
    },
    {
      index: '06',
      code: 'VLT.06',
      title: 'MY VAULT',
      spec: 'LOCALSTORAGE DOSSIER ARCHIVE',
      description: 'Client-side private archive for favorite color combinations. Features rename, delete, and JSON dump/restore.',
      path: '/vault',
      accent: 'bg-white text-black',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-mono bg-[#EEEEEE] text-[#080808]">
      {/* Editorial Hero Section */}
      <section className="border-b-2 border-black pt-8 pb-12 sm:pt-14 sm:pb-16 bg-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top Editorial Manifest Header */}
          <div className="border-b-2 border-black pb-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-neutral-600 mb-1">
                <span className="w-2.5 h-2.5 bg-[#FF321C] inline-block" />
                <span>INDEX REF: CV-2026 // PUBLIC EDITION</span>
              </div>
              <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.88] text-black">
                COLOR<br />
                <span className="text-stroke text-[#2020FF]">VAULT.</span>
              </h1>
            </div>

            <div className="max-w-md border-2 border-black p-4 bg-white shadow-brutal space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold border-b border-black pb-1">
                <span>CHROMATIC LAB</span>
                <span className="text-[#39FF14] bg-black px-1">DETERMINISTIC</span>
              </div>
              <p className="text-xs uppercase font-bold leading-relaxed text-black">
                FIND YOUR PERFECT COLOR. A RAW, UNCOMPROMISED CLIENT-SIDE COLOR EXPLORATION STUDIO. NO AI HALLUCINATIONS. NO CLOUD DATABASES. PURE COLOR SCIENCE EXECUTED IN YOUR BROWSER.
              </p>
            </div>
          </div>

          {/* Embedded Interactive Palette Generator Deck */}
          <div className="mt-8">
            <div className="flex items-center justify-between pb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
              <span>// PRIMARY SYNTHESIZER INTERFACE</span>
              <span>SLOT_COUNT: 05</span>
            </div>
            <PaletteGenerator />
          </div>
        </div>
      </section>

      {/* AdSense Placement 1 */}
      <AdContainer slotId="home-below-hero" format="horizontal" />

      {/* Tools Index Section: Editorial Directory */}
      <section className="py-14 sm:py-20 border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b-2 border-black pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase text-[#2020FF]">
                [ SECTION 02 // TOOLS DIRECTORY ]
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight mt-1">
                SYSTEM UTILITY INDEX
              </h2>
            </div>
            <span className="text-xs uppercase text-neutral-500 font-bold">
              06 INDEPENDENT ALGORITHMS
            </span>
          </div>

          {/* Directory Rows */}
          <div className="border-2 border-black divide-y-2 divide-black bg-[#EEEEEE]">
            {toolsIndex.map(tool => (
              <Link
                key={tool.title}
                to={tool.path}
                className="group flex flex-col lg:flex-row items-stretch justify-between p-4 sm:p-6 hover:bg-black hover:text-white transition-none select-none"
              >
                {/* Left: Index & Title */}
                <div className="flex items-start space-x-4 lg:w-1/3 mb-2 lg:mb-0">
                  <span className="font-display font-black text-2xl sm:text-3xl text-neutral-400 group-hover:text-[#39FF14]">
                    {tool.index}
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 group-hover:text-neutral-400">
                      {tool.code}
                    </div>
                    <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight group-hover:text-white">
                      {tool.title}
                    </h3>
                  </div>
                </div>

                {/* Center: Specs & Description */}
                <div className="lg:w-1/2 flex flex-col justify-center space-y-1 mb-3 lg:mb-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#2020FF] group-hover:text-[#39FF14]">
                    [{tool.spec}]
                  </div>
                  <p className="text-xs uppercase text-neutral-600 group-hover:text-neutral-300 leading-normal">
                    {tool.description}
                  </p>
                </div>

                {/* Right: Launch Button */}
                <div className="lg:w-1/6 flex items-center lg:justify-end">
                  <span className="inline-flex items-center space-x-1 px-3 py-1.5 border border-black group-hover:border-white bg-white text-black group-hover:bg-[#2020FF] group-hover:text-white text-xs font-bold uppercase">
                    <span>LAUNCH</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Archive Gallery Preview */}
      <section className="py-14 sm:py-20 border-b-2 border-black bg-[#EEEEEE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b-2 border-black pb-4 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase text-[#FF321C]">
                [ SECTION 03 // ARCHIVE PREVIEW ]
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight mt-1">
                CURATED COLOR DOSSIER
              </h2>
            </div>

            <Link
              to="/explore"
              className="btn-raw-black self-start sm:self-auto text-xs"
            >
              <span>ACCESS FULL ARCHIVE (36 PALETTES) &rarr;</span>
            </Link>
          </div>

          {/* Grid of Palette Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPalettes.map(palette => (
              <PaletteCard key={palette.id} palette={palette} />
            ))}
          </div>
        </div>
      </section>

      {/* Brutalist Architectural Manifesto */}
      <section className="py-14 sm:py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-b border-neutral-800 pb-3 mb-8 flex items-center justify-between text-xs uppercase text-neutral-400">
            <span>[ SYSTEM MANIFESTO & CHROMATIC INTEGRITY ]</span>
            <span className="text-[#39FF14]">SPEC-01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-neutral-700 p-5 space-y-3 bg-[#111111]">
              <div className="text-[11px] font-bold text-[#39FF14]">
                [ 01 // CLIENT-SIDE PURITY ]
              </div>
              <h3 className="font-display font-bold text-lg uppercase text-white">
                Zero Cloud Tracking
              </h3>
              <p className="text-xs uppercase text-neutral-400 leading-relaxed">
                Color manipulation belongs on your workstation. No external database requests, no telemetry tracking, and zero account barriers.
              </p>
            </div>

            <div className="border border-neutral-700 p-5 space-y-3 bg-[#111111]">
              <div className="text-[11px] font-bold text-[#2020FF]">
                [ 02 // DETERMINISTIC MATH ]
              </div>
              <h3 className="font-display font-bold text-lg uppercase text-white">
                True W3C Relative Luminance
              </h3>
              <p className="text-xs uppercase text-neutral-400 leading-relaxed">
                Exact WCAG 2.1 formulas for relative luminance and contrast ratio calculations. No artificial estimates or arbitrary approximations.
              </p>
            </div>

            <div className="border border-neutral-700 p-5 space-y-3 bg-[#111111]">
              <div className="text-[11px] font-bold text-[#FF321C]">
                [ 03 // EXPORT FREEDOM ]
              </div>
              <h3 className="font-display font-bold text-lg uppercase text-white">
                Direct Code & Asset Dump
              </h3>
              <p className="text-xs uppercase text-neutral-400 leading-relaxed">
                Instantly export CSS root variables, PNG graphic cards, or dump your entire vault as validated JSON for cross-device migration.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
