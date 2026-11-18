import React, { useState, useRef } from 'react';
import {
  Copy,
  Download,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { ColorStop, GradientConfig } from '../types';
import { PRESET_GRADIENTS } from '../data/presets/gradients';
import { copyToClipboard, exportElementAsPng } from '../utils/export';
import { useToast } from '../components/common/Toast';
import { AdContainer } from '../components/ads/AdContainer';

export const GradientPage: React.FC = () => {
  const { showToast } = useToast();
  const previewCanvasRef = useRef<HTMLDivElement>(null);

  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#2020FF', position: 0 },
    { id: '2', color: '#FF321C', position: 50 },
    { id: '3', color: '#39FF14', position: 100 },
  ]);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [copiedCss, setCopiedCss] = useState<boolean>(false);

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsCss = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
  const gradientCss =
    type === 'linear'
      ? `linear-gradient(${angle}deg, ${stopsCss})`
      : `radial-gradient(circle at center, ${stopsCss})`;

  const fullCssCode = `background: ${stops[0]?.color || '#000'};\nbackground: ${gradientCss};`;

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addStop = () => {
    if (stops.length >= 7) {
      showToast('Maximum 7 color stops supported', 'info');
      return;
    }
    const newId = Date.now().toString();
    const newStop: ColorStop = {
      id: newId,
      color: '#FFDE00',
      position: Math.min(90, Math.max(10, Math.round((stops[0].position + stops[stops.length - 1].position) / 2))),
    };
    setStops(prev => [...prev, newStop]);
    showToast('Added chromatic stop', 'success');
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) {
      showToast('Gradients require minimum 2 color stops', 'error');
      return;
    }
    setStops(prev => prev.filter(s => s.id !== id));
  };

  const loadPreset = (presetConfig: GradientConfig) => {
    setType(presetConfig.type);
    setAngle(presetConfig.angle);
    setStops([...presetConfig.stops]);
    showToast('Preset gradient matrix loaded', 'success');
  };

  const handleCopyCss = async () => {
    const ok = await copyToClipboard(fullCssCode);
    if (ok) {
      setCopiedCss(true);
      showToast('CSS gradient snippet copied', 'success');
      setTimeout(() => setCopiedCss(false), 1500);
    }
  };

  const handleDownloadPng = async () => {
    if (!previewCanvasRef.current) return;
    setIsExportingPng(true);
    try {
      const ok = await exportElementAsPng(previewCanvasRef.current, 'custom-gradient-slab');
      if (ok) {
        showToast('Gradient PNG exported at 2x resolution', 'success');
      } else {
        showToast('PNG render failed', 'error');
      }
    } finally {
      setIsExportingPng(false);
    }
  };

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>RENDERER // GRD.05</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            GRADIENT STUDIO
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            PARAMETRIC DIRECTIONAL RASTER RENDERER. CONTROL CHROMATIC STOPS, ROTATE DEGREE ANGLES, AND EXPORT STANDARDS-COMPLIANT CSS OR RASTER PNG.
          </p>
        </div>

        <div className="border-2 border-black bg-white p-3 shadow-brutal text-xs font-bold uppercase shrink-0">
          <div className="text-[10px] text-neutral-500">CANVAS MODE</div>
          <div className="text-black font-extrabold mt-0.5">
            {type.toUpperCase()} • {stops.length} STOPS
          </div>
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Column: Generator Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mode Switcher */}
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-4">
            <span className="text-xs font-bold uppercase text-black block border-b border-black pb-2">
              RENDER GEOMETRY
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('linear')}
                className={`py-2 px-3 border-2 border-black text-xs font-bold uppercase ${
                  type === 'linear' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#EEEEEE]'
                }`}
              >
                LINEAR MATRIX
              </button>
              <button
                type="button"
                onClick={() => setType('radial')}
                className={`py-2 px-3 border-2 border-black text-xs font-bold uppercase ${
                  type === 'radial' ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#EEEEEE]'
                }`}
              >
                RADIAL MATRIX
              </button>
            </div>

            {/* Angle Slider for Linear */}
            {type === 'linear' && (
              <div className="pt-2 border-t border-black">
                <div className="flex justify-between items-center text-xs font-bold mb-1">
                  <span>ROTATION ANGLE</span>
                  <span className="text-[#2020FF]">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={e => setAngle(parseInt(e.target.value))}
                  className="w-full h-3 border border-black appearance-none cursor-pointer bg-[#EEEEEE]"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-bold mt-1">
                  <span>0° (E)</span>
                  <span>90° (S)</span>
                  <span>180° (W)</span>
                  <span>270° (N)</span>
                  <span>360°</span>
                </div>
              </div>
            )}
          </div>

          {/* Color Stops Manager */}
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span className="text-xs font-bold uppercase text-black">
                COLOR STOPS [{stops.length}/7]
              </span>
              <button
                type="button"
                onClick={addStop}
                className="px-2.5 py-1 border border-black text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>[ADD STOP]</span>
              </button>
            </div>

            <div className="space-y-2">
              {stops.map(stop => (
                <div
                  key={stop.id}
                  className="flex items-center space-x-2 p-2 border border-black bg-[#EEEEEE]"
                >
                  <label
                    htmlFor={`grd-stop-${stop.id}`}
                    style={{ backgroundColor: stop.color }}
                    className="w-7 h-7 border border-black cursor-pointer shrink-0"
                    title="Change stop color"
                  >
                    <input
                      id={`grd-stop-${stop.id}`}
                      type="color"
                      value={stop.color}
                      onChange={e => updateStop(stop.id, { color: e.target.value.toUpperCase() })}
                      className="sr-only"
                    />
                  </label>

                  <input
                    type="text"
                    value={stop.color}
                    onChange={e => updateStop(stop.id, { color: e.target.value })}
                    className="w-20 font-mono text-xs font-extrabold uppercase px-1.5 py-1 bg-white border border-black"
                  />

                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={e => updateStop(stop.id, { position: parseInt(e.target.value) })}
                      className="w-full h-2 border border-black appearance-none cursor-pointer bg-white"
                    />
                    <span className="text-[10px] font-bold w-7 text-right">
                      {stop.position}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="p-1 border border-black bg-white hover:bg-[#FF321C] hover:text-white disabled:opacity-30"
                    title="Remove stop"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Curated Presets Deck */}
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-3">
            <span className="text-xs font-bold uppercase text-black block border-b border-black pb-2">
              PRESET MATRICES
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_GRADIENTS.map(preset => {
                const presetCss =
                  preset.config.type === 'linear'
                    ? `linear-gradient(${preset.config.angle}deg, ${preset.config.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                    : `radial-gradient(circle, ${preset.config.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => loadPreset(preset.config)}
                    className="flex items-center space-x-2 p-1.5 border border-black bg-[#EEEEEE] hover:bg-black hover:text-white text-left group"
                  >
                    <div
                      style={{ background: presetCss }}
                      className="w-6 h-6 border border-black shrink-0"
                    />
                    <span className="text-[11px] font-bold uppercase truncate">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Gradient Canvas & CSS Code (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Visual Slab */}
          <div
            ref={previewCanvasRef}
            style={{ background: gradientCss }}
            className="w-full h-80 sm:h-96 border-2 border-black shadow-brutal relative flex flex-col justify-between p-6 select-none overflow-hidden"
          >
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase border border-white">
                {type.toUpperCase()} • {type === 'linear' ? `${angle}°` : 'CENTER'}
              </span>
              <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase border border-white">
                {stops.length} CHROMATIC STOPS
              </span>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCopyCss}
                className="px-3.5 py-2 bg-white text-black border-2 border-black text-xs font-bold uppercase hover:bg-black hover:text-white flex items-center space-x-1"
              >
                {copiedCss ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCss ? '[COPIED]' : '[COPY CSS]'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                disabled={isExportingPng}
                className="px-3.5 py-2 bg-black text-white border-2 border-black text-xs font-bold uppercase hover:bg-[#2020FF] flex items-center space-x-1 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExportingPng ? '[RENDERING...]' : '[PNG EXPORT]'}</span>
              </button>
            </div>
          </div>

          {/* Generated CSS Snippet Box */}
          <div className="border-2 border-black bg-white p-5 shadow-brutal space-y-3">
            <div className="flex items-center justify-between border-b border-black pb-2">
              <span className="text-xs font-bold uppercase text-black">
                STANDARDS-COMPLIANT CSS DECLARATION
              </span>
              <button
                type="button"
                onClick={handleCopyCss}
                className="text-xs font-bold uppercase text-[#2020FF] hover:underline"
              >
                [COPY SNIPPET]
              </button>
            </div>

            <pre className="p-3.5 bg-[#EEEEEE] text-black font-mono text-xs border border-black overflow-x-auto leading-relaxed">
              <code>{fullCssCode}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* AdSense Placement */}
      <AdContainer slotId="gradient-below-tool" format="horizontal" />
    </div>
  );
};
