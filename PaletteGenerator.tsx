import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Lock,
  Unlock,
  Copy,
  RefreshCw,
  Bookmark,
  BookmarkCheck,
  Download,
  FileCode,
  Sliders,
  Check,
} from 'lucide-react';
import {
  generateRandomPalette,
  generateRandomHex,
  isValidHex,
  normalizeHex,
  getContrastingTextColor,
} from '../../utils/color';
import { savePaletteToStorage, getSavedPalettes } from '../../utils/storage';
import { copyToClipboard, downloadCssFile, exportElementAsPng } from '../../utils/export';
import { useToast } from '../common/Toast';
import { Palette } from '../../types';

interface PaletteGeneratorProps {
  initialColors?: string[];
  initialName?: string;
  isCompact?: boolean;
}

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({
  initialColors,
  initialName = 'BRUTALIST ARCHIVE SET #01',
  isCompact = false,
}) => {
  const { showToast } = useToast();
  const paletteContainerRef = useRef<HTMLDivElement>(null);

  const [colors, setColors] = useState<string[]>(() => {
    if (initialColors && initialColors.length === 5) {
      return initialColors.map(c => normalizeHex(c));
    }
    return generateRandomPalette();
  });

  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [paletteName, setPaletteName] = useState<string>(initialName);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [activeEditingIndex, setActiveEditingIndex] = useState<number | null>(null);
  const [editingInputHex, setEditingInputHex] = useState<string>('');

  const checkIfSaved = useCallback((currentColors: string[]) => {
    const saved = getSavedPalettes();
    const exists = saved.some(
      p => p.colors.join(',').toUpperCase() === currentColors.join(',').toUpperCase()
    );
    setIsSaved(exists);
  }, []);

  useEffect(() => {
    checkIfSaved(colors);
  }, [colors, checkIfSaved]);

  const handleGenerate = useCallback(() => {
    const newColors = [...colors];
    const newRandom = generateRandomPalette();

    for (let i = 0; i < 5; i++) {
      if (!locked[i]) {
        newColors[i] = newRandom[i] || generateRandomHex();
      }
    }
    setColors(newColors);
    setIsSaved(false);
  }, [colors, locked]);

  const toggleLock = (index: number) => {
    setLocked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleCopyColor = async (hex: string, index: number) => {
    const success = await copyToClipboard(hex);
    if (success) {
      setCopiedIndex(index);
      showToast(`Copied ${hex}`, 'success');
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  };

  const handleCopyPalette = async () => {
    const text = colors.join('  ');
    const success = await copyToClipboard(text);
    if (success) {
      showToast('All 5 HEX values copied to clipboard', 'success');
    }
  };

  const handleSaveToVault = () => {
    const paletteObj: Palette = {
      id: `pal-${Date.now()}`,
      name: paletteName || 'BRUTALIST CHROMATIC SET',
      colors: [...colors],
      createdAt: Date.now(),
      isCustom: true,
    };

    const res = savePaletteToStorage(paletteObj);
    if (res.success) {
      setIsSaved(true);
      showToast(res.message, 'success');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleExportCss = () => {
    downloadCssFile({
      id: 'current',
      name: paletteName || 'ColorVault Palette',
      colors,
    });
    showToast('Downloaded CSS root definitions', 'info');
  };

  const handleExportPng = async () => {
    if (!paletteContainerRef.current) return;
    setIsExportingPng(true);
    try {
      const success = await exportElementAsPng(
        paletteContainerRef.current,
        `${paletteName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-palette`
      );
      if (success) {
        showToast('PNG chromatic slab exported', 'success');
      } else {
        showToast('PNG rendering failed', 'error');
      }
    } finally {
      setIsExportingPng(false);
    }
  };

  const startEditing = (index: number) => {
    setActiveEditingIndex(index);
    setEditingInputHex(colors[index]);
  };

  const applyEditedHex = (index: number, newHex: string) => {
    if (isValidHex(newHex)) {
      const normalized = normalizeHex(newHex);
      const updated = [...colors];
      updated[index] = normalized;
      setColors(updated);
      setActiveEditingIndex(null);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      } else if (e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handleCopyPalette();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        handleSaveToVault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate, handleCopyPalette]);

  return (
    <div className="w-full flex flex-col font-mono">
      {/* Brutalist Hardware Controls Bar */}
      <div className="flex flex-wrap items-stretch justify-between border-2 border-black bg-white mb-2 shadow-brutal divide-y sm:divide-y-0 sm:divide-x divide-black">
        {/* Name input & Serial Label */}
        <div className="flex items-center px-4 py-2 flex-1 min-w-[240px]">
          <span className="text-[10px] uppercase font-bold text-neutral-500 mr-2 shrink-0">
            [IDENT]:
          </span>
          <input
            type="text"
            value={paletteName}
            onChange={e => setPaletteName(e.target.value)}
            className="w-full bg-transparent text-black font-bold uppercase text-xs sm:text-sm focus:outline-none focus:bg-[#EEEEEE] px-1 py-0.5 tracking-wider"
            placeholder="NAME SPEC"
          />
        </div>

        {/* Buttons Deck */}
        <div className="flex flex-wrap items-center divide-x divide-black">
          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center space-x-1.5 px-4 py-3 bg-[#2020FF] text-white hover:bg-black text-xs uppercase font-bold transition-none active:translate-y-0.5"
            title="Press Spacebar to randomize unlocked slots"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>[ GENERATE ]</span>
            <span className="hidden md:inline-block ml-1 text-[9px] bg-white/20 px-1 py-0.5">
              SPACE
            </span>
          </button>

          <button
            type="button"
            onClick={handleCopyPalette}
            className="px-3.5 py-3 bg-white text-black hover:bg-black hover:text-white text-xs uppercase font-bold transition-none"
            title="Copy all 5 HEX values (C)"
          >
            <div className="flex items-center space-x-1">
              <Copy className="w-3.5 h-3.5" />
              <span>[COPY]</span>
            </div>
          </button>

          <button
            type="button"
            onClick={handleSaveToVault}
            className={`px-3.5 py-3 text-xs uppercase font-bold transition-none flex items-center space-x-1 ${
              isSaved
                ? 'bg-[#39FF14] text-black'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
            title="Save palette to local vault (S)"
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? '[SAVED]' : '[VAULT]'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportCss}
            className="hidden sm:flex items-center space-x-1 px-3 py-3 bg-white text-black hover:bg-black hover:text-white text-xs uppercase font-bold transition-none"
            title="Export CSS root variables"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>CSS</span>
          </button>

          <button
            type="button"
            onClick={handleExportPng}
            disabled={isExportingPng}
            className="hidden sm:flex items-center space-x-1 px-3 py-3 bg-white text-black hover:bg-black hover:text-white text-xs uppercase font-bold transition-none disabled:opacity-40"
            title="Render and download PNG card"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPng ? 'RENDERING' : 'PNG'}</span>
          </button>
        </div>
      </div>

      {/* Main Chromatic Slabs Arena */}
      <div
        ref={paletteContainerRef}
        className={`w-full border-2 border-black bg-white shadow-brutal flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black ${
          isCompact ? 'h-[400px] md:h-[440px]' : 'min-h-[500px] md:h-[580px]'
        }`}
      >
        {colors.map((hex, index) => {
          const isLocked = locked[index];
          const textColor = getContrastingTextColor(hex);
          const isCopied = copiedIndex === index;
          const isEditing = activeEditingIndex === index;

          return (
            <div
              key={index}
              style={{ backgroundColor: hex }}
              className="relative flex-1 flex flex-row md:flex-col items-center justify-between p-4 sm:p-6 transition-none group select-none overflow-hidden"
            >
              {/* Slot Indicator & Lock Toggle */}
              <div className="flex items-center justify-between w-full md:w-auto md:self-start">
                <span
                  style={{ color: textColor }}
                  className="font-mono text-xs font-black tracking-widest uppercase opacity-80"
                >
                  // SLOT 0{index + 1}
                </span>

                <button
                  type="button"
                  onClick={() => toggleLock(index)}
                  className={`px-2 py-1 border border-black font-mono text-[10px] font-bold uppercase transition-none ${
                    isLocked
                      ? 'bg-black text-[#39FF14]'
                      : 'bg-white/80 text-black hover:bg-black hover:text-white'
                  }`}
                  aria-label={isLocked ? `Unlock ${hex}` : `Lock ${hex}`}
                >
                  {isLocked ? (
                    <span className="flex items-center space-x-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>LOCKED</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <Unlock className="w-2.5 h-2.5" />
                      <span>OPEN</span>
                    </span>
                  )}
                </button>
              </div>

              {/* Swatch Center: Oversized Hex Readout & Copy Action */}
              <div className="my-auto text-center">
                {isEditing ? (
                  <div className="border-2 border-black bg-white p-3 space-y-2 text-black shadow-brutal">
                    <div className="text-[10px] font-bold uppercase text-neutral-500">
                      EDIT HEX CODE
                    </div>
                    <input
                      type="text"
                      value={editingInputHex}
                      onChange={e => setEditingInputHex(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') applyEditedHex(index, editingInputHex);
                        if (e.key === 'Escape') setActiveEditingIndex(null);
                      }}
                      className="w-28 text-center font-mono text-sm font-bold uppercase bg-[#EEEEEE] text-black px-2 py-1 border border-black focus:outline-none focus:bg-white"
                      autoFocus
                    />
                    <div className="flex items-center justify-center space-x-2 pt-1">
                      <input
                        type="color"
                        value={isValidHex(editingInputHex) ? normalizeHex(editingInputHex) : hex}
                        onChange={e => {
                          setEditingInputHex(e.target.value);
                          applyEditedHex(index, e.target.value);
                        }}
                        className="w-6 h-6 border border-black cursor-pointer bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => applyEditedHex(index, editingInputHex)}
                        className="px-2 py-1 text-[10px] bg-black text-white uppercase font-bold"
                      >
                        SET
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCopyColor(hex, index)}
                    className="flex flex-col items-center group/btn focus:outline-none"
                    title="Click to copy HEX value"
                  >
                    <span
                      style={{ color: textColor }}
                      className="font-mono text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase"
                    >
                      {hex}
                    </span>
                    <span
                      style={{ color: textColor }}
                      className="text-[10px] font-mono uppercase tracking-widest mt-1 border-b border-current pb-0.5 opacity-60 group-hover/btn:opacity-100 transition-opacity"
                    >
                      {isCopied ? '[ COPIED TO CLIPBOARD ]' : '[ CLICK TO COPY ]'}
                    </span>
                  </button>
                )}
              </div>

              {/* Swatch Bottom Controls */}
              <div className="flex items-center space-x-1.5 md:self-end">
                <button
                  type="button"
                  onClick={() => (isEditing ? setActiveEditingIndex(null) : startEditing(index))}
                  className="p-1.5 border border-black bg-white/90 text-black hover:bg-black hover:text-white transition-none text-[10px] font-bold"
                  title="Manual adjustment"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyColor(hex, index)}
                  className="p-1.5 border border-black bg-white/90 text-black hover:bg-black hover:text-white transition-none text-[10px] font-bold"
                  title="Copy HEX"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technical Footnote Strip */}
      <div className="flex flex-wrap items-center justify-between border-x-2 border-b-2 border-black bg-[#E5E5E5] px-4 py-2 text-[10px] uppercase font-bold text-neutral-600 gap-2">
        <div className="flex items-center space-x-3">
          <span>SHORTCUTS: [SPACE] = REGENERATE</span>
          <span>•</span>
          <span>[C] = COPY ALL</span>
          <span>•</span>
          <span>[S] = VAULT</span>
        </div>
        <div>
          <span>DETERMINISTIC_COLOR_ENGINE // LOCAL 100%</span>
        </div>
      </div>
    </div>
  );
};
