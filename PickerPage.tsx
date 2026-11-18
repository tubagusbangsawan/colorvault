import React, { useState } from 'react';
import {
  Pipette,
  Copy,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  isValidHex,
  normalizeHex,
  hexToRgb,
  rgbToHsl,
  hslToHex,
  rgbToHex,
  getComplementaryColor,
  getContrastingTextColor,
} from '../utils/color';
import { copyToClipboard } from '../utils/export';
import { useToast } from '../components/common/Toast';
import { AdContainer } from '../components/ads/AdContainer';

export const PickerPage: React.FC = () => {
  const { showToast } = useToast();
  const [hexInput, setHexInput] = useState('#2020FF');
  const [currentColor, setCurrentColor] = useState('#2020FF');
  const [isValid, setIsValid] = useState(true);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [channelMode, setChannelMode] = useState<'hsl' | 'rgb'>('hsl');

  const rgb = hexToRgb(currentColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const compColor = getComplementaryColor(currentColor);
  const textColor = getContrastingTextColor(currentColor);
  const compTextColor = getContrastingTextColor(compColor);

  const shades = [15, 30, 45, 60, 75, 90].map(lightness => {
    return hslToHex(hsl.h, hsl.s, lightness);
  });

  const handleHexChange = (value: string) => {
    setHexInput(value);
    if (isValidHex(value)) {
      setIsValid(true);
      setCurrentColor(normalizeHex(value));
    } else {
      setIsValid(false);
    }
  };

  const handleNativeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setHexInput(val);
    setCurrentColor(val);
    setIsValid(true);
  };

  const handleRgbSlider = (channel: 'r' | 'g' | 'b', val: number) => {
    const updated = { ...rgb, [channel]: val };
    const newHex = rgbToHex(updated.r, updated.g, updated.b);
    setHexInput(newHex);
    setCurrentColor(newHex);
    setIsValid(true);
  };

  const handleHslSlider = (channel: 'h' | 's' | 'l', val: number) => {
    const updated = { ...hsl, [channel]: val };
    const newHex = hslToHex(updated.h, updated.s, updated.l);
    setHexInput(newHex);
    setCurrentColor(newHex);
    setIsValid(true);
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedFormat(label);
      showToast(`Copied ${label}: ${text}`, 'success');
      setTimeout(() => setCopiedFormat(null), 1500);
    }
  };

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>INSTRUMENT // PCK.02</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            COLOR PROBE & CONVERTER
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            PRECISE OPTICAL SPECTRAL ANALYSIS. VALIDATE HEX CODES, DECOMPOSE CHANNELS ACROSS HSL AND RGB, AND JUXTAPOSE 180° COMPLEMENTARY OPPOSITES.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">ACTIVE SAMPLE</div>
          <div className="text-black font-extrabold mt-0.5">{currentColor}</div>
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Color Block & Optical Juxtaposition (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Swatch Block */}
          <div
            style={{ backgroundColor: currentColor }}
            className="w-full h-72 sm:h-80 border-2 border-black shadow-brutal flex flex-col justify-between p-6 transition-none relative"
          >
            <div className="flex items-center justify-between">
              <span
                style={{ color: textColor }}
                className="text-[11px] font-bold tracking-widest uppercase border border-current px-2 py-0.5 bg-black/10 backdrop-blur-sm"
              >
                PROBE TARGET
              </span>

              <label
                htmlFor="picker-eyedropper"
                className="px-3 py-1 bg-white text-black border border-black text-xs font-bold uppercase cursor-pointer hover:bg-black hover:text-white flex items-center space-x-1"
              >
                <Pipette className="w-3.5 h-3.5" />
                <span>EYEDROPPER</span>
                <input
                  id="picker-eyedropper"
                  type="color"
                  value={currentColor}
                  onChange={handleNativeColorChange}
                  className="sr-only"
                />
              </label>
            </div>

            <div className="text-center">
              <span
                style={{ color: textColor }}
                className="font-mono text-4xl sm:text-5xl font-black uppercase tracking-tight block"
              >
                {currentColor}
              </span>
              <span
                style={{ color: textColor }}
                className="text-[11px] font-bold uppercase tracking-wider opacity-80 mt-1 block"
              >
                RGB({rgb.r}, {rgb.g}, {rgb.b}) • HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
              </span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleCopy(currentColor, 'HEX')}
                className="px-3 py-1.5 bg-white text-black border border-black text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center space-x-1"
              >
                {copiedFormat === 'HEX' ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'HEX' ? '[COPIED]' : '[COPY HEX]'}</span>
              </button>
            </div>
          </div>

          {/* Optical Complementary Split Swatch */}
          <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase text-neutral-600 border-b border-black pb-2">
              <span>OPTICAL OPPOSITE (180° ROTATION)</span>
              <span>COMPLEMENT</span>
            </div>

            {/* Split Visual Block */}
            <div className="h-20 w-full border-2 border-black flex divide-x-2 divide-black">
              <div
                style={{ backgroundColor: currentColor }}
                className="flex-1 flex items-center justify-center p-2 text-center"
              >
                <span
                  style={{ color: textColor }}
                  className="text-xs font-bold uppercase"
                >
                  BASE
                </span>
              </div>
              <div
                style={{ backgroundColor: compColor }}
                className="flex-1 flex items-center justify-center p-2 text-center cursor-pointer hover:opacity-90"
                onClick={() => handleHexChange(compColor)}
                title="Click to adopt this complement"
              >
                <span
                  style={{ color: compTextColor }}
                  className="text-xs font-bold uppercase"
                >
                  {compColor}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] uppercase text-neutral-500">
                180° HUE POLARITY
              </span>
              <button
                type="button"
                onClick={() => handleCopy(compColor, 'Complement')}
                className="px-2.5 py-1 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white"
              >
                [COPY OPPOSITE]
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Format Readouts, HEX Input & Channel Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* HEX Input Box */}
          <div className="border-2 border-black bg-white p-6 shadow-brutal space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="pck-hex-input" className="text-xs font-bold uppercase text-black">
                HEXADECIMAL NOTATION
              </label>
              {!isValid && (
                <span className="text-[11px] text-[#FF321C] font-bold uppercase flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>INVALID HEX SYNTAX</span>
                </span>
              )}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-neutral-500">
                #
              </span>
              <input
                id="pck-hex-input"
                type="text"
                value={hexInput.replace('#', '')}
                onChange={e => handleHexChange(`#${e.target.value}`)}
                maxLength={7}
                placeholder="2020FF"
                className={`w-full pl-8 pr-28 py-2.5 bg-[#EEEEEE] font-mono text-base font-extrabold uppercase border-2 focus:outline-none focus:bg-white ${
                  isValid ? 'border-black' : 'border-[#FF321C] text-[#FF321C]'
                }`}
              />
              <button
                type="button"
                onClick={() => handleCopy(currentColor, 'HEX')}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-black text-white hover:bg-[#2020FF] text-xs font-bold uppercase"
              >
                [COPY]
              </button>
            </div>
          </div>

          {/* RGB & HSL Monospace Data Tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RGB Card */}
            <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
              <div className="flex items-center justify-between border-b border-black pb-1.5 text-xs font-bold uppercase">
                <span>RGB MATRIX</span>
                <button
                  type="button"
                  onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
                  className="hover:underline text-[10px]"
                >
                  [COPY]
                </button>
              </div>
              <div className="text-sm font-extrabold text-black">
                rgb({rgb.r}, {rgb.g}, {rgb.b})
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] font-bold text-center">
                <div className="border border-black bg-[#EEEEEE] py-1">R: {rgb.r}</div>
                <div className="border border-black bg-[#EEEEEE] py-1">G: {rgb.g}</div>
                <div className="border border-black bg-[#EEEEEE] py-1">B: {rgb.b}</div>
              </div>
            </div>

            {/* HSL Card */}
            <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
              <div className="flex items-center justify-between border-b border-black pb-1.5 text-xs font-bold uppercase">
                <span>HSL GEOMETRY</span>
                <button
                  type="button"
                  onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                  className="hover:underline text-[10px]"
                >
                  [COPY]
                </button>
              </div>
              <div className="text-sm font-extrabold text-black">
                hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)
              </div>
              <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] font-bold text-center">
                <div className="border border-black bg-[#EEEEEE] py-1">H: {hsl.h}°</div>
                <div className="border border-black bg-[#EEEEEE] py-1">S: {hsl.s}%</div>
                <div className="border border-black bg-[#EEEEEE] py-1">L: {hsl.l}%</div>
              </div>
            </div>
          </div>

          {/* Interactive Channel Sliders Console */}
          <div className="border-2 border-black bg-white p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span className="text-xs font-bold uppercase text-black">
                CHANNEL MANIPULATION
              </span>
              <div className="flex border border-black divide-x divide-black text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setChannelMode('hsl')}
                  className={`px-3 py-1 ${channelMode === 'hsl' ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                  HSL
                </button>
                <button
                  type="button"
                  onClick={() => setChannelMode('rgb')}
                  className={`px-3 py-1 ${channelMode === 'rgb' ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                  RGB
                </button>
              </div>
            </div>

            {channelMode === 'hsl' ? (
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>HUE DEGREE [H]</span>
                    <span className="text-[#2020FF]">{hsl.h}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hsl.h}
                    onChange={e => handleHslSlider('h', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-green-500 via-blue-500 to-red-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>SATURATION [S]</span>
                    <span className="text-[#2020FF]">{hsl.s}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.s}
                    onChange={e => handleHslSlider('s', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#EEEEEE]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>LIGHTNESS [L]</span>
                    <span className="text-[#2020FF]">{hsl.l}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hsl.l}
                    onChange={e => handleHslSlider('l', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#EEEEEE]"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>RED CHANNEL [R]</span>
                    <span className="text-[#FF321C]">{rgb.r}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={e => handleRgbSlider('r', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#FF321C]/20"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>GREEN CHANNEL [G]</span>
                    <span className="text-[#39FF14] bg-black px-1">{rgb.g}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={e => handleRgbSlider('g', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#39FF14]/20"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>BLUE CHANNEL [B]</span>
                    <span className="text-[#2020FF]">{rgb.b}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={e => handleRgbSlider('b', parseInt(e.target.value))}
                    className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#2020FF]/20"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tonal Steps Ribbon */}
          <div className="border-2 border-black bg-white p-4 shadow-brutal space-y-2">
            <div className="text-[10px] uppercase font-bold text-neutral-500">
              LIGHTNESS GRADIENT MATRIX (15% &rarr; 90%)
            </div>
            <div className="grid grid-cols-6 border-2 border-black divide-x divide-black h-12">
              {shades.map((shadeHex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleHexChange(shadeHex)}
                  style={{ backgroundColor: shadeHex }}
                  className="h-full relative group/shade select-none hover:opacity-80"
                  title={`Select ${shadeHex}`}
                >
                  <span
                    style={{ color: getContrastingTextColor(shadeHex) }}
                    className="text-[9px] font-bold block text-center"
                  >
                    {15 + idx * 15}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="picker-below-tool" format="horizontal" />
    </div>
  );
};
