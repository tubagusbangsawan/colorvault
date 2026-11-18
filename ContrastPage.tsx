import React, { useState } from 'react';
import {
  ArrowLeftRight,
} from 'lucide-react';
import {
  calculateContrast,
  isValidHex,
  normalizeHex,
} from '../utils/color';
import { copyToClipboard } from '../utils/export';
import { useToast } from '../components/common/Toast';
import { AdContainer } from '../components/ads/AdContainer';

const QUICK_PAIRS = [
  { name: 'STARK MONOCHROME', fg: '#080808', bg: '#FFFFFF' },
  { name: 'ELECTRIC INVERT', fg: '#FFFFFF', bg: '#2020FF' },
  { name: 'SIGNAL CONTRAST', fg: '#FFFFFF', bg: '#FF321C' },
  { name: 'TERMINAL GREEN', fg: '#080808', bg: '#39FF14' },
  { name: 'LOW CONTRAST WARNING', fg: '#888888', bg: '#EEEEEE' },
];

export const ContrastPage: React.FC = () => {
  const { showToast } = useToast();
  const [fgHex, setFgHex] = useState('#080808');
  const [bgHex, setBgHex] = useState('#EEEEEE');
  const [fgInput, setFgInput] = useState('#080808');
  const [bgInput, setBgInput] = useState('#EEEEEE');

  const contrast = calculateContrast(fgHex, bgHex);

  const handleFgChange = (val: string) => {
    setFgInput(val);
    if (isValidHex(val)) {
      setFgHex(normalizeHex(val));
    }
  };

  const handleBgChange = (val: string) => {
    setBgInput(val);
    if (isValidHex(val)) {
      setBgHex(normalizeHex(val));
    }
  };

  const handleSwap = () => {
    const temp = fgHex;
    setFgHex(bgHex);
    setBgHex(temp);
    setFgInput(bgHex);
    setBgInput(temp);
    showToast('Swapped foreground & background coordinates', 'info');
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast(`Copied ${label}: ${text}`, 'success');
    }
  };

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>SPECIFICATION // CNT.04</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            WCAG 2.1 CONTRAST CHECKER
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            DETERMINISTIC RELATIVE LUMINANCE RATIO COMPUTATION. AUDIT READABILITY COMPLIANCE FOR DIGITAL EDITORIALS AND PRODUCTION USER INTERFACES.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">W3C STANDARD RATIO</div>
          <div className="text-black font-extrabold text-lg mt-0.5">{contrast.ratio} : 1</div>
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Selectors & Scoreboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Controls Card */}
          <div className="border-2 border-black bg-white p-6 shadow-brutal space-y-5">
            {/* Foreground */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase mb-1">
                <span>TEXT [FOREGROUND]</span>
                <button
                  type="button"
                  onClick={() => handleCopy(fgHex, 'Foreground')}
                  className="text-[10px] hover:underline"
                >
                  [COPY]
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="contrast-fg-native"
                  style={{ backgroundColor: fgHex }}
                  className="w-12 h-12 border-2 border-black cursor-pointer shrink-0"
                  title="Pick foreground"
                >
                  <input
                    id="contrast-fg-native"
                    type="color"
                    value={fgHex}
                    onChange={e => handleFgChange(e.target.value)}
                    className="sr-only"
                  />
                </label>
                <input
                  id="contrast-fg-input"
                  type="text"
                  value={fgInput}
                  onChange={e => handleFgChange(e.target.value)}
                  maxLength={7}
                  className="w-full font-mono text-base font-extrabold uppercase px-3 py-2 bg-[#EEEEEE] border-2 border-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1">
              <button
                type="button"
                onClick={handleSwap}
                className="px-4 py-1.5 border-2 border-black bg-[#EEEEEE] hover:bg-black hover:text-white text-xs font-bold uppercase flex items-center space-x-1"
                title="Swap foreground and background"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                <span>[SWAP INVERT]</span>
              </button>
            </div>

            {/* Background */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase mb-1">
                <span>SURFACE [BACKGROUND]</span>
                <button
                  type="button"
                  onClick={() => handleCopy(bgHex, 'Background')}
                  className="text-[10px] hover:underline"
                >
                  [COPY]
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <label
                  htmlFor="contrast-bg-native"
                  style={{ backgroundColor: bgHex }}
                  className="w-12 h-12 border-2 border-black cursor-pointer shrink-0"
                  title="Pick background"
                >
                  <input
                    id="contrast-bg-native"
                    type="color"
                    value={bgHex}
                    onChange={e => handleBgChange(e.target.value)}
                    className="sr-only"
                  />
                </label>
                <input
                  id="contrast-bg-input"
                  type="text"
                  value={bgInput}
                  onChange={e => handleBgChange(e.target.value)}
                  maxLength={7}
                  className="w-full font-mono text-base font-extrabold uppercase px-3 py-2 bg-[#EEEEEE] border-2 border-black focus:outline-none focus:bg-white"
                />
              </div>
            </div>

            {/* Benchmark Preset Pairs */}
            <div className="pt-2 border-t border-black">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-2">
                BENCHMARK PAIRINGS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PAIRS.map(pair => (
                  <button
                    key={pair.name}
                    type="button"
                    onClick={() => {
                      setFgHex(pair.fg);
                      setBgHex(pair.bg);
                      setFgInput(pair.fg);
                      setBgInput(pair.bg);
                    }}
                    className="px-2 py-1 border border-black text-[10px] uppercase font-bold hover:bg-black hover:text-white bg-white"
                  >
                    {pair.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Big Scorecard Banner */}
          <div className="border-2 border-black bg-white p-6 shadow-brutal text-center space-y-2">
            <span className="text-[11px] font-bold uppercase text-neutral-500">
              MEASURED CONTRAST RATIO
            </span>
            <div className="font-display font-black text-5xl sm:text-6xl tracking-tighter text-black">
              {contrast.ratio}
              <span className="text-2xl text-neutral-400 font-mono"> : 1</span>
            </div>
            <div className="pt-2">
              {contrast.scoreAAA ? (
                <div className="inline-block px-3 py-1 bg-[#39FF14] text-black border border-black text-xs font-black uppercase">
                  [ PASSES ALL WCAG LEVELS — LEVEL AAA ]
                </div>
              ) : contrast.scoreAA ? (
                <div className="inline-block px-3 py-1 bg-[#2020FF] text-white border border-black text-xs font-black uppercase">
                  [ PASSES MINIMUM STANDARD — LEVEL AA ]
                </div>
              ) : (
                <div className="inline-block px-3 py-1 bg-[#FF321C] text-white border border-black text-xs font-black uppercase">
                  [ FAILS WCAG STANDARD (&lt; 4.5:1) ]
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: WCAG Matrix & Specimen Simulation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* WCAG Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-black bg-[#EEEEEE] divide-x divide-y sm:divide-y-0 divide-black shadow-brutal">
            {/* AA Normal */}
            <div className="p-3 bg-white space-y-1">
              <div className="text-[10px] font-bold uppercase text-neutral-500">AA NORMAL</div>
              <div className="text-xs font-bold text-neutral-600">REQ: 4.5:1</div>
              <div className={`text-sm font-black uppercase ${contrast.scoreAA ? 'text-[#080808]' : 'text-[#FF321C]'}`}>
                {contrast.scoreAA ? '[PASS]' : '[FAIL]'}
              </div>
            </div>

            {/* AA Large */}
            <div className="p-3 bg-white space-y-1">
              <div className="text-[10px] font-bold uppercase text-neutral-500">AA LARGE</div>
              <div className="text-xs font-bold text-neutral-600">REQ: 3.0:1</div>
              <div className={`text-sm font-black uppercase ${contrast.scoreAALarge ? 'text-[#080808]' : 'text-[#FF321C]'}`}>
                {contrast.scoreAALarge ? '[PASS]' : '[FAIL]'}
              </div>
            </div>

            {/* AAA Normal */}
            <div className="p-3 bg-white space-y-1">
              <div className="text-[10px] font-bold uppercase text-neutral-500">AAA NORMAL</div>
              <div className="text-xs font-bold text-neutral-600">REQ: 7.0:1</div>
              <div className={`text-sm font-black uppercase ${contrast.scoreAAA ? 'text-[#080808]' : 'text-[#FF321C]'}`}>
                {contrast.scoreAAA ? '[PASS]' : '[FAIL]'}
              </div>
            </div>

            {/* AAA Large */}
            <div className="p-3 bg-white space-y-1">
              <div className="text-[10px] font-bold uppercase text-neutral-500">AAA LARGE</div>
              <div className="text-xs font-bold text-neutral-600">REQ: 4.5:1</div>
              <div className={`text-sm font-black uppercase ${contrast.scoreAAALarge ? 'text-[#080808]' : 'text-[#FF321C]'}`}>
                {contrast.scoreAAALarge ? '[PASS]' : '[FAIL]'}
              </div>
            </div>
          </div>

          {/* Live Brutalist Specimen Poster Simulation */}
          <div
            style={{ backgroundColor: bgHex }}
            className="border-2 border-black p-6 sm:p-8 shadow-brutal space-y-6 transition-none"
          >
            <div className="flex items-center justify-between border-b border-current pb-3">
              <span style={{ color: fgHex }} className="text-xs font-bold uppercase tracking-widest">
                [LIVE TYPOGRAPHIC PROJECTION SPECIMEN]
              </span>
              <span style={{ color: fgHex }} className="text-xs font-bold uppercase">
                RATIO: {contrast.ratio}:1
              </span>
            </div>

            {/* Large Headline */}
            <div>
              <h2
                style={{ color: fgHex }}
                className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight leading-tight"
              >
                THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
              </h2>
              <span style={{ color: fgHex }} className="text-[10px] uppercase font-bold opacity-75 mt-1 block">
                LARGE DISPLAY (18PT+ / 24PX BOLD)
              </span>
            </div>

            {/* Body Paragraph */}
            <div>
              <p
                style={{ color: fgHex }}
                className="text-xs sm:text-sm uppercase leading-relaxed font-bold"
              >
                Good design respects human visual physiology. WCAG 2.1 specifies that normal text requires a minimum contrast of 4.5:1 to ensure legibility across all ambient lighting and display devices.
              </p>
              <span style={{ color: fgHex }} className="text-[10px] uppercase font-bold opacity-75 mt-1 block">
                NORMAL TEXT (14PT / 16PX REGULAR)
              </span>
            </div>

            {/* Simulated UI controls in active colors */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-current">
              <button
                type="button"
                style={{ backgroundColor: fgHex, color: bgHex }}
                className="px-3 py-1.5 text-xs font-black uppercase border border-current"
              >
                SOLID BUTTON
              </button>

              <button
                type="button"
                style={{ borderColor: fgHex, color: fgHex }}
                className="px-3 py-1.5 text-xs font-bold uppercase border-2"
              >
                OUTLINED
              </button>

              <span
                style={{ backgroundColor: fgHex, color: bgHex }}
                className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase"
              >
                TAG // SPEC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="contrast-below-tool" format="horizontal" />
    </div>
  );
};
