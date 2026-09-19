import React, { useState, useEffect } from 'react';
import { CharacterConfig, PresetSnippet } from '../types';
import { PRESET_SNIPPETS } from '../data/presets';
import { Sparkles, BookmarkPlus, Trash2, Check, Copy } from 'lucide-react';

interface SnippetsLibraryProps {
  currentConfig: CharacterConfig;
  onSelectPreset: (config: CharacterConfig) => void;
}

const LOCAL_STORAGE_KEY = 'css_character_custom_snippets';

export const SnippetsLibrary: React.FC<SnippetsLibraryProps> = ({
  currentConfig,
  onSelectPreset,
}) => {
  const [customSnippets, setCustomSnippets] = useState<PresetSnippet[]>([]);
  const [newSnippetName, setNewSnippetName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load custom snippets from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setCustomSnippets(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading custom snippets', e);
    }
  }, []);

  const handleSaveSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnippetName.trim()) return;

    const newSnippet: PresetSnippet = {
      id: `custom-${Date.now()}`,
      title: newSnippetName.trim(),
      description: 'Snippet personalizzato salvato',
      category: 'custom',
      config: { ...currentConfig, name: newSnippetName.trim() },
    };

    const updated = [newSnippet, ...customSnippets];
    setCustomSnippets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    setNewSnippetName('');
  };

  const handleDeleteSnippet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customSnippets.filter((s) => s.id !== id);
    setCustomSnippets(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleApply = (snippet: PresetSnippet) => {
    onSelectPreset(snippet.config);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Save current config as snippet */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-zinc-700">
          <BookmarkPlus className="w-4 h-4 text-emerald-600" />
          <span>Salva la configurazione attuale come Snippet</span>
        </div>
        <form onSubmit={handleSaveSnippet} className="flex gap-2">
          <input
            type="text"
            placeholder="Nome snippet (es. Il mio Avatar)..."
            value={newSnippetName}
            onChange={(e) => setNewSnippetName(e.target.value)}
            className="flex-1 text-xs px-3 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
          />
          <button
            type="submit"
            disabled={!newSnippetName.trim()}
            className="px-3 py-2 bg-zinc-900 text-white rounded-lg text-xs font-medium hover:bg-zinc-800 disabled:opacity-40 transition-colors whitespace-nowrap"
          >
            Salva
          </button>
        </form>
      </div>

      {/* User Custom Snippets if any */}
      {customSnippets.length > 0 && (
        <div>
          <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2.5">
            I tuoi Snippets ({customSnippets.length})
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {customSnippets.map((snippet) => {
              const isSelected = currentConfig.name === snippet.title;
              return (
                <div
                  key={snippet.id}
                  onClick={() => handleApply(snippet)}
                  className={`group relative p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-sm'
                      : 'border-zinc-200 bg-white hover:border-zinc-300 text-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{snippet.title}</div>
                    <div className="flex items-center gap-1.5">
                      {copiedId === snippet.id ? (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Applicato
                        </span>
                      ) : null}
                      <button
                        onClick={(e) => handleDeleteSnippet(snippet.id, e)}
                        className={`p-1 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors ${
                          isSelected ? 'text-zinc-400' : 'text-zinc-400'
                        }`}
                        title="Elimina snippet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {snippet.config.mode === 'avatar' ? 'Avatar circolare' : 'Personaggio intero'} •{' '}
                    {snippet.config.hairColor}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Preset Snippets Catalog */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Snippet Modelli Predefiniti
          </span>
          <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Clicca per caricare
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {PRESET_SNIPPETS.map((snippet) => {
            const isSelected = currentConfig.id === snippet.id;
            const isOriginal = snippet.id === 'original-character';

            return (
              <div
                key={snippet.id}
                onClick={() => handleApply(snippet)}
                className={`group p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-600/30'
                    : 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-zinc-900">
                        {snippet.title}
                      </span>
                      {isOriginal && (
                        <span className="text-[10px] px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full font-bold uppercase tracking-wider">
                          Screenshot
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                      {snippet.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: snippet.config.hairColor }}
                        title="Colore capelli"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: snippet.config.clothesColor }}
                        title="Colore vestito"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: snippet.config.badgeColor }}
                        title="Colore badge"
                      />
                    </div>
                    {copiedId === snippet.id && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Attivo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
