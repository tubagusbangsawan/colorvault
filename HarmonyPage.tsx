import React, { useState } from 'react';
import {
  Copy,
  Check,
} from 'lucide-react';
import { HarmonyType, Palette } from '../types';
import {
  generateHarmony,
  isValidHex,
  normalizeHex,
  hexToHsl,
  getContrastingTextColor,
} from '../utils/color';
import { savePaletteToStorage } from '../utils/storage';
import { copyToClipboard } from '../utils/export';
import { useToast } from '../components/common/Toast';
import { AdContainer } from '../components/ads/AdContainer';

const HARMONY_MODES: {
  id: HarmonyType;
  label: string;
  degrees: string;
  description: string;
}[] = [
  {
    id: 'complementary',
    label: 'COMPLEMENTARY',
    degrees: '180°',
    description: 'DIRECT DIAMETRICAL POLAR OPPOSITES ON THE 360° COLOR WHEEL.',
  },
  {
    id: 'analogous',
    label: 'ANALOGOUS',
    degrees: '±30°',
    description: 'SEQUENTIAL NEIGHBORING HUES CREATING COHESIVE SYSTEMIC RHYTHM.',
  },
  {
    id: 'triadic',
    label: 'TRIADIC',
    degrees: '120°',
    description: 'EQUILATERAL TRIANGULAR ARRANGEMENT OF 3 EQUIDISTANT ANCHORS.',
  },
  {
    id: 'split-complementary',
    label: 'SPLIT-COMP',
    degrees: '150° / 210°',
    description: 'BASE HUE COMBINED WITH TWO HUES ADJACENT TO ITS 180° COMPLEMENT.',
  },
  {
    id: 'tetradic',
    label: 'TETRADIC',
    degrees: '90° INTERVALS',
    description: 'QUADRATIC 4-POINT SQUARE FORMING TWO COMPLEMENTARY DUAL PAIRS.',
  },
  {
    id: 'monochromatic',
    label: 'MONOCHROME',
    degrees: '0° STATIC',
    description: 'SINGLE FIXED HUE ROTATED THROUGH CALIBRATED LIGHTNESS / SATURATION STEPS.',
  },
];

const QUICK_BASE_COLORS = [
  '#2020FF',
  '#FF321C',
  '#39FF14',
  '#FFDE00',
  '#080808',
  '#00CED1',
  '#FF007F',
  '#7928CA',
];

export const HarmonyPage: React.FC = () => {
  const { showToast } = useToast();
  const [baseHex, setBaseHex] = useState('#2020FF');
  const [hexInput, setHexInput] = useState('#2020FF');
  const [activeType, setActiveType] = useState<HarmonyType>('complementary');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const swatches = generateHarmony(baseHex, activeType);
  const baseHsl = hexToHsl(baseHex);

  const handleBaseChange = (newHex: string) => {
    setHexInput(newHex);
    if (isValidHex(newHex)) {
      setBaseHex(normalizeHex(newHex));
      setIsSaved(false);
    }
  };

  const handleCopyColor = async (hex: string, idx: number) => {
    const ok = await copyToClipboard(hex);
    if (ok) {
      setCopiedIndex(idx);
      showToast(`Copied ${hex}`, 'success');
      setTimeout(() => setCopiedIndex(null), 1200);
    }
  };

  const handleCopyAll = async () => {
    const text = swatches.join(' ');
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast('All 5 harmony swatches copied!', 'success');
    }
  };

  const handleSaveToVault = () => {
    const currentMode = HARMONY_MODES.find(m => m.id === activeType)?.label || 'HARMONY';
    const paletteObj: Palette = {
      id: `hrm-${Date.now()}`,
      name: `${currentMode} (${baseHex})`,
      colors: [...swatches],
      category: 'vibrant',
      tags: ['harmony', activeType, 'geometry'],
      createdAt: Date.now(),
      isCustom: true,
    };

    const res = savePaletteToStorage(paletteObj);
    if (res.success) {
      setIsSaved(true);
      showToast(res.message, 'success');
    }
  };

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>ALGORITHM // HRM.03</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            COLOR HARMONY EXPLORER
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            GEOMETRIC ANGULAR HUE ROTATION ON THE 360° CHROMATIC WHEEL. HARNESS CLASSICAL COLOR SCIENCE WITH ACCURATE RADIAN CALCULATIONS.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">ACTIVE RULE</div>
          <div className="text-black font-extrabold mt-0.5">
            {HARMONY_MODES.find(m => m.id === activeType)?.label} [{HARMONY_MODES.find(m => m.id === activeType)?.degrees}]
          </div>
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Anchor Setup (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border-2 border-black bg-white p-6 shadow-brutal space-y-4">
            <span className="text-xs font-bold uppercase text-black block border-b border-black pb-2">
              ANCHOR BASE COLOR
            </span>

            <div className="flex items-center space-x-3">
              <label
                htmlFor="harmony-color-picker"
                style={{ backgroundColor: baseHex }}
                className="w-14 h-14 border-2 border-black cursor-pointer shrink-0 shadow-brutal"
                title="Click to select base color"
              >
                <input
                  id="harmony-color-picker"
                  type="color"
                  value={baseHex}
                  onChange={e => handleBaseChange(e.target.value)}
                  className="sr-only"
                />
              </label>

              <div className="flex-1">
                <input
                  type="text"
                  value={hexInput}
                  onChange={e => handleBaseChange(e.target.value)}
                  maxLength={7}
                  className="w-full font-mono text-base font-extrabold uppercase px-3 py-2 bg-[#EEEEEE] border-2 border-black focus:outline-none focus:bg-white"
                  placeholder="#2020FF"
                />
                <div className="text-[10px] uppercase text-neutral-500 mt-1">
                  H: {baseHsl.h}° • S: {baseHsl.s}% • L: {baseHsl.l}%
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral-500 block mb-2">
                STANDARD SEEDS:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {QUICK_BASE_COLORS.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleBaseChange(c)}
                    style={{ backgroundColor: c }}
                    className={`h-8 border-2 border-black hover:opacity-85 ${
                      baseHex.toUpperCase() === c.toUpperCase() ? 'ring-2 ring-black ring-offset-1' : ''
                    }`}
                    title={c}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mathematical Geometry Card */}
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-2">
            <div className="text-[10px] font-bold uppercase text-[#2020FF] border-b border-black pb-1">
              GEOMETRIC ROTATION FORMULA
            </div>
            <p className="text-xs uppercase text-neutral-600 leading-relaxed font-bold">
              {HARMONY_MODES.find(m => m.id === activeType)?.description}
            </p>
            <div className="text-xs font-bold pt-1">
              ANGLE OFFSET: <span className="text-[#FF321C]">{HARMONY_MODES.find(m => m.id === activeType)?.degrees}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Mode Selector & Swatches Ribbon (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Mode Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 border-2 border-black bg-[#EEEEEE] divide-x divide-y divide-black shadow-brutal">
            {HARMONY_MODES.map(mode => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setActiveType(mode.id);
                  setIsSaved(false);
                }}
                className={`p-3 text-left transition-none ${
                  activeType === mode.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-[#EEEEEE]'
                }`}
              >
                <div className="text-xs font-bold uppercase">{mode.label}</div>
                <div className={`text-[10px] mt-0.5 ${activeType === mode.id ? 'text-[#39FF14]' : 'text-neutral-500'}`}>
                  ROTATION: {mode.degrees}
                </div>
              </button>
            ))}
          </div>

          {/* Generated Swatches Deck */}
          <div className="border-2 border-black bg-white shadow-brutal overflow-hidden">
            <div className="h-48 sm:h-56 w-full flex flex-col sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black">
              {swatches.map((hex, idx) => {
                const textColor = getContrastingTextColor(hex);
                const isCopied = copiedIndex === idx;

                return (
                  <div
                    key={idx}
                    style={{ backgroundColor: hex }}
                    onClick={() => handleCopyColor(hex, idx)}
                    className="flex-1 flex flex-row sm:flex-col justify-between items-center p-4 cursor-pointer hover:opacity-90 select-none group"
                    title={`Click to copy ${hex}`}
                  >
                    <span
                      style={{ color: textColor }}
                      className="text-[10px] font-bold uppercase opacity-75"
                    >
                      {idx === 1 ? '[ANCHOR]' : `[H_${idx + 1}]`}
                    </span>

                    <div className="text-center">
                      <span
                        style={{ color: textColor }}
                        className="font-mono text-base sm:text-xl font-black uppercase"
                      >
                        {hex}
                      </span>
                      <span
                        style={{ color: textColor }}
                        className="text-[9px] block uppercase opacity-75 mt-0.5"
                      >
                        {isCopied ? '[COPIED]' : '[CLICK]'}
                      </span>
                    </div>

                    <div className="sm:self-center">
                      {isCopied ? (
                        <Check style={{ color: textColor }} className="w-4 h-4 text-[#39FF14]" />
                      ) : (
                        <Copy style={{ color: textColor }} className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-3 bg-[#EEEEEE] border-t-2 border-black flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[11px] font-bold uppercase text-neutral-600">
                5-SLOT HARMONIC SLAB GENERATED
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className="px-3 py-1.5 border border-black bg-white hover:bg-black hover:text-white uppercase font-bold"
                >
                  [COPY ALL HEX]
                </button>

                <button
                  type="button"
                  onClick={handleSaveToVault}
                  className={`px-3 py-1.5 border border-black uppercase font-bold ${
                    isSaved ? 'bg-[#39FF14] text-black' : 'bg-black text-white hover:bg-[#2020FF]'
                  }`}
                >
                  {isSaved ? '[SAVED TO VAULT]' : '[SAVE TO VAULT]'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="harmony-below-tool" format="horizontal" />
    </div>
  );
};
