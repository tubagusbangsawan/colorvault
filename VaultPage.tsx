import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Upload,
  Edit3,
  Plus,
  X,
} from 'lucide-react';
import { Palette } from '../types';
import {
  getSavedPalettes,
  deletePaletteFromStorage,
  renamePaletteInStorage,
  exportVaultToJson,
  importVaultFromJson,
} from '../utils/storage';
import { downloadJsonFile } from '../utils/export';
import { PaletteCard } from '../components/palette/PaletteCard';
import { useToast } from '../components/common/Toast';
import { AdContainer } from '../components/ads/AdContainer';

export const VaultPage: React.FC = () => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>('');

  const loadVault = () => {
    const list = getSavedPalettes();
    setPalettes(list);
  };

  useEffect(() => {
    loadVault();
    window.addEventListener('storage', loadVault);
    return () => window.removeEventListener('storage', loadVault);
  }, []);

  const handleDelete = (id: string) => {
    const target = palettes.find(p => p.id === id);
    const ok = deletePaletteFromStorage(id);
    if (ok) {
      loadVault();
      showToast(`Deleted "${target?.name || 'record'}"`, 'info');
    }
  };

  const handleOpenRename = (id: string) => {
    const target = palettes.find(p => p.id === id);
    if (target) {
      setEditingId(id);
      setEditingName(target.name);
    }
  };

  const handleSaveRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId || !editingName.trim()) return;

    const ok = renamePaletteInStorage(editingId, editingName.trim());
    if (ok) {
      loadVault();
      showToast('Palette record renamed', 'success');
      setEditingId(null);
    }
  };

  const handleExportJson = () => {
    if (palettes.length === 0) {
      showToast('Vault dossier is currently empty', 'info');
      return;
    }
    const jsonStr = exportVaultToJson();
    const dateStr = new Date().toISOString().split('T')[0];
    downloadJsonFile(jsonStr, `colorvault-dossier-${dateStr}.json`);
    showToast('Vault JSON backup exported', 'success');
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (content) {
        const result = importVaultFromJson(content);
        if (result.success) {
          loadVault();
          showToast(result.message, 'success');
        } else {
          showToast(result.message, 'error');
        }
      }
    };
    reader.onerror = () => {
      showToast('Failed to parse incoming file stream', 'error');
    };
    reader.readAsText(file);
  };

  return (
    <div className="py-8 md:py-14 max-w-7xl mx-auto px-4 sm:px-6 font-mono text-black">
      {/* Header */}
      <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#2020FF] mb-1">
            <span className="w-2.5 h-2.5 bg-[#2020FF] inline-block" />
            <span>ARCHIVE DOSSIER // VLT.06</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-black">
            MY VAULT
          </h1>
          <p className="text-xs uppercase text-neutral-600 font-bold mt-1 max-w-xl leading-relaxed">
            CLIENT-SIDE CHROMATIC SANCTUARY. SAVED PALETTES ARE ENCRYPTED IN YOUR CURRENT BROWSER LOCALSTORAGE. ZERO THIRD-PARTY CLOUD INGESTION.
          </p>
        </div>

        {/* Toolbar Deck */}
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleImportClick}
            className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-bold uppercase flex items-center space-x-1"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>[IMPORT JSON]</span>
          </button>

          <button
            type="button"
            onClick={handleExportJson}
            disabled={palettes.length === 0}
            className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-xs font-bold uppercase flex items-center space-x-1 disabled:opacity-40"
          >
            <Download className="w-3.5 h-3.5" />
            <span>[DUMP JSON]</span>
          </button>

          <Link
            to="/generator"
            className="btn-raw-black text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>NEW SLAB</span>
          </Link>
        </div>
      </div>

      {/* Security & Device Notice Banner */}
      <div className="border-2 border-black bg-white p-4 shadow-brutal mb-8 space-y-1">
        <div className="flex items-center justify-between text-xs font-bold border-b border-black pb-1.5">
          <span className="text-[#2020FF]">[LOCAL STORAGE NOTICE: BROWSER ISOLATED]</span>
          <span className="text-neutral-500 font-mono">ENCRYPTION: DOMAIN-BOUND</span>
        </div>
        <p className="text-xs uppercase text-neutral-600 leading-relaxed font-bold">
          All records belong exclusively to this hardware workstation. If you clear browsing cache or switch computers, use <strong>[DUMP JSON]</strong> to retain a portable backup file.
        </p>
      </div>

      {/* Palettes Grid */}
      {palettes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {palettes.map(palette => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              isVaultItem={true}
              onDelete={handleDelete}
              onRename={handleOpenRename}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="border-2 border-black bg-white p-12 text-center shadow-brutal my-12 space-y-4">
          <div className="text-sm font-bold uppercase text-neutral-500">
            [ 0 PALETTE RECORDS IN LOCAL REGISTRY ]
          </div>
          <h3 className="font-display font-black text-2xl uppercase">
            YOUR VAULT IS CURRENTLY EMPTY
          </h3>
          <p className="text-xs uppercase text-neutral-600 max-w-sm mx-auto font-bold leading-relaxed">
            No custom palettes have been retained yet. Generate new color slabs in the synthesizer or bookmark sets from the curated archive.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link to="/generator" className="btn-raw-black text-xs">
              SYNTHESIZE NEW PALETTE &rarr;
            </Link>
            <Link to="/explore" className="btn-raw text-xs">
              EXPLORE ARCHIVE
            </Link>
          </div>
        </div>
      )}

      {/* AdSense Placement */}
      <AdContainer slotId="vault-below-content" format="horizontal" />

      {/* Rename Dialog Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md border-2 border-black bg-white p-6 shadow-brutal space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase">
                <Edit3 className="w-4 h-4 text-[#2020FF]" />
                <span>RENAME VAULT RECORD</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="p-1 hover:bg-black hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRename} className="space-y-4">
              <div>
                <label htmlFor="rename-input" className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">
                  NEW IDENTIFIER
                </label>
                <input
                  id="rename-input"
                  type="text"
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#EEEEEE] border-2 border-black text-xs font-bold uppercase focus:outline-none focus:bg-white"
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-black">
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1.5 border border-black text-xs font-bold uppercase hover:bg-[#EEEEEE]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-raw-black text-xs"
                >
                  SAVE RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
