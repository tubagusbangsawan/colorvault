import React, { useState, useRef } from 'react';
import { Copy, Bookmark, BookmarkCheck, Download, Trash2, Edit2, FileCode } from 'lucide-react';
import { Palette } from '../../types';
import { copyToClipboard, downloadCssFile, exportElementAsPng } from '../../utils/export';
import { savePaletteToStorage, getSavedPalettes } from '../../utils/storage';
import { getContrastingTextColor } from '../../utils/color';
import { useToast } from '../common/Toast';

interface PaletteCardProps {
  palette: Palette;
  isVaultItem?: boolean;
  onDelete?: (id: string) => void;
  onRename?: (id: string) => void;
}

export const PaletteCard: React.FC<PaletteCardProps> = ({
  palette,
  isVaultItem = false,
  onDelete,
  onRename,
}) => {
  const { showToast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copiedColorIndex, setCopiedColorIndex] = useState<number | null>(null);

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    if (isVaultItem) return true;
    const saved = getSavedPalettes();
    return saved.some(
      p => p.id === palette.id || p.colors.join(',') === palette.colors.join(',')
    );
  });

  const handleCopyColor = async (e: React.MouseEvent, hex: string, idx: number) => {
    e.stopPropagation();
    const ok = await copyToClipboard(hex);
    if (ok) {
      setCopiedColorIndex(idx);
      showToast(`Copied ${hex}`, 'success');
      setTimeout(() => setCopiedColorIndex(null), 1200);
    }
  };

  const handleCopyAll = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = palette.colors.join(' ');
    const ok = await copyToClipboard(text);
    if (ok) {
      showToast(`Copied palette "${palette.name}"!`, 'success');
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVaultItem && onDelete) {
      onDelete(palette.id);
      return;
    }

    const res = savePaletteToStorage(palette);
    if (res.success) {
      setIsSaved(true);
      showToast(res.message, 'success');
    }
  };

  const handleExportCss = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadCssFile(palette);
    showToast('Downloaded CSS variables!', 'info');
  };

  const handleExportPng = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;
    const slug = palette.name.toLowerCase().replace(/\s+/g, '-');
    const ok = await exportElementAsPng(cardRef.current, `${slug}-palette`);
    if (ok) {
      showToast('Downloaded palette PNG!', 'success');
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col border-2 border-black bg-white shadow-brutal hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-none font-mono"
    >
      {/* Top Metadata Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-black bg-[#EEEEEE] text-[10px] uppercase tracking-wider">
        <span className="font-bold truncate max-w-[170px] sm:max-w-[200px]">
          {palette.name}
        </span>
        <div className="flex items-center space-x-1 shrink-0">
          {palette.category && (
            <span className="px-1.5 py-0.2 bg-black text-white text-[9px] font-bold">
              {palette.category}
            </span>
          )}
        </div>
      </div>

      {/* 5 Swatches Strip */}
      <div className="h-28 sm:h-32 w-full flex border-b border-black divide-x divide-black">
        {palette.colors.map((hex, idx) => {
          const textColor = getContrastingTextColor(hex);
          const isCopied = copiedColorIndex === idx;

          return (
            <div
              key={idx}
              style={{ backgroundColor: hex }}
              onClick={e => handleCopyColor(e, hex, idx)}
              className="flex-1 relative flex flex-col justify-between p-1.5 cursor-pointer hover:opacity-90 select-none group/swatch"
              title={`Click to copy ${hex}`}
            >
              <span
                style={{ color: textColor }}
                className="text-[9px] font-mono font-bold opacity-60"
              >
                0{idx + 1}
              </span>

              <div
                style={{ color: textColor }}
                className="text-center font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-tight"
              >
                {isCopied ? (
                  <span className="bg-black text-[#39FF14] px-1 py-0.5">OK!</span>
                ) : (
                  <span>{hex.replace('#', '')}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Controls Footer */}
      <div className="p-2.5 bg-white flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={handleCopyAll}
          className="px-2 py-1 border border-black bg-[#EEEEEE] hover:bg-black hover:text-white text-[10px] uppercase font-bold flex items-center space-x-1"
        >
          <Copy className="w-3 h-3" />
          <span>[COPY ALL]</span>
        </button>

        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={handleExportCss}
            className="p-1 border border-black hover:bg-black hover:text-white text-[10px]"
            title="Download CSS Variables"
          >
            <FileCode className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleExportPng}
            className="p-1 border border-black hover:bg-black hover:text-white text-[10px]"
            title="Export as PNG"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {isVaultItem ? (
            <>
              {onRename && (
                <button
                  type="button"
                  onClick={() => onRename(palette.id)}
                  className="p-1 border border-black hover:bg-black hover:text-white text-[10px]"
                  title="Rename palette"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(palette.id)}
                  className="p-1 border border-black bg-[#FF321C] text-white hover:bg-black text-[10px]"
                  title="Delete palette"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={handleToggleSave}
              className={`px-2 py-1 border border-black text-[10px] uppercase font-bold flex items-center space-x-1 ${
                isSaved ? 'bg-[#39FF14] text-black' : 'bg-white hover:bg-black hover:text-white'
              }`}
              title={isSaved ? 'Saved in Vault' : 'Save to Vault'}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-3 h-3" />
                  <span>SAVED</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3 h-3" />
                  <span>VAULT</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
