import { Palette } from '../../types';
import { isValidHex, normalizeHex } from '../color';

const STORAGE_KEY = 'colorvault_saved_palettes';

// In-memory fallback for non-browser or storage-restricted environments
let memoryStore: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
    return memoryStore[key] || null;
  } catch {
    return memoryStore[key] || null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
    memoryStore[key] = value;
  } catch {
    memoryStore[key] = value;
  }
}

/**
 * Retrieves all saved palettes from localStorage.
 */
export function getSavedPalettes(): Palette[] {
  try {
    const raw = safeGetItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(item => validatePaletteObject(item));
  } catch (err) {
    console.error('Failed to load palettes from localStorage:', err);
    return [];
  }
}

/**
 * Saves or updates a palette in localStorage.
 */
export function savePaletteToStorage(palette: Palette): { success: boolean; message: string } {
  try {
    const current = getSavedPalettes();
    const existingIndex = current.findIndex(p => p.id === palette.id);

    if (existingIndex >= 0) {
      current[existingIndex] = { ...palette, createdAt: current[existingIndex].createdAt || Date.now() };
    } else {
      current.unshift({ ...palette, createdAt: palette.createdAt || Date.now() });
    }

    safeSetItem(STORAGE_KEY, JSON.stringify(current));
    return { success: true, message: 'Palette saved to My Vault' };
  } catch (err) {
    console.error('Failed to save palette:', err);
    return { success: false, message: 'Failed to save palette to local storage' };
  }
}

/**
 * Removes a palette from localStorage by id.
 */
export function deletePaletteFromStorage(id: string): boolean {
  try {
    const current = getSavedPalettes();
    const filtered = current.filter(p => p.id !== id);
    safeSetItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete palette:', err);
    return false;
  }
}

/**
 * Renames a palette in localStorage.
 */
export function renamePaletteInStorage(id: string, newName: string): boolean {
  try {
    const trimmed = newName.trim();
    if (!trimmed) return false;
    const current = getSavedPalettes();
    const target = current.find(p => p.id === id);
    if (!target) return false;
    target.name = trimmed;
    safeSetItem(STORAGE_KEY, JSON.stringify(current));
    return true;
  } catch (err) {
    console.error('Failed to rename palette:', err);
    return false;
  }
}

/**
 * Validates whether an unknown object fits the Palette schema.
 */
export function validatePaletteObject(item: any): item is Palette {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.id !== 'string' || !item.id.trim()) return false;
  if (typeof item.name !== 'string' || !item.name.trim()) return false;
  if (!Array.isArray(item.colors) || item.colors.length !== 5) return false;

  const allValidHex = item.colors.every((c: any) => typeof c === 'string' && isValidHex(c));
  return allValidHex;
}

/**
 * Exports all saved palettes as a formatted JSON string.
 */
export function exportVaultToJson(): string {
  const palettes = getSavedPalettes();
  return JSON.stringify(
    {
      app: 'COLORVAULT',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      palettes,
    },
    null,
    2
  );
}

/**
 * Imports palettes from a JSON string, validating the schema.
 */
export function importVaultFromJson(jsonString: string): {
  success: boolean;
  importedCount: number;
  message: string;
} {
  try {
    const parsed = JSON.parse(jsonString);
    let rawPalettes: any[] = [];

    if (Array.isArray(parsed)) {
      rawPalettes = parsed;
    } else if (parsed && Array.isArray(parsed.palettes)) {
      rawPalettes = parsed.palettes;
    } else {
      return {
        success: false,
        importedCount: 0,
        message: 'Invalid JSON structure. Expected a list of palettes.',
      };
    }

    const validPalettes: Palette[] = [];
    for (const item of rawPalettes) {
      if (validatePaletteObject(item)) {
        validPalettes.push({
          ...item,
          colors: item.colors.map(c => normalizeHex(c)),
        });
      }
    }

    if (validPalettes.length === 0) {
      return {
        success: false,
        importedCount: 0,
        message: 'No valid palettes found in imported JSON.',
      };
    }

    // Merge with current, avoiding duplicate IDs
    const current = getSavedPalettes();
    const map = new Map<string, Palette>();

    // Put current ones in map
    for (const p of current) {
      map.set(p.id, p);
    }

    // Add or update with imported ones
    for (const p of validPalettes) {
      map.set(p.id, p);
    }

    const merged = Array.from(map.values());
    safeSetItem(STORAGE_KEY, JSON.stringify(merged));

    return {
      success: true,
      importedCount: validPalettes.length,
      message: `Successfully imported ${validPalettes.length} palette${validPalettes.length === 1 ? '' : 's'}.`,
    };
  } catch (err) {
    return {
      success: false,
      importedCount: 0,
      message: 'Invalid JSON file format. Could not parse data.',
    };
  }
}
