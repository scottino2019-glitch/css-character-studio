import React, { useState, useRef, useEffect } from 'react';
import { CODE_SNIPPETS, CodeSnippet } from '../data/codeSnippets';
import {
  Code,
  Copy,
  Check,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Eye,
  Smile,
  Scissors,
  Shirt,
  Play,
  Sliders,
} from 'lucide-react';

interface TopSnippetsBarProps {
  onInsertCSS: (code: string) => void;
  onInsertHTML: (code: string) => void;
}

export const TopSnippetsBar: React.FC<TopSnippetsBarProps> = ({
  onInsertCSS,
  onInsertHTML,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'Tutti gli Snippets' },
    { id: 'base', label: 'Modello Base' },
    { id: 'variables', label: 'Variabili CSS Volto' },
    { id: 'eyes', label: 'Occhi' },
    { id: 'nose', label: 'Naso' },
    { id: 'mouth', label: 'Bocca' },
    { id: 'hair', label: 'Capelli' },
    { id: 'ears', label: 'Orecchie' },
    { id: 'body', label: 'Corpo & Abiti' },
    { id: 'accessories', label: 'Accessori' },
    { id: 'animations', label: 'Animazioni' },
  ];

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filtered = CODE_SNIPPETS.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  const handleCopy = async (snippet: CodeSnippet) => {
    await navigator.clipboard.writeText(snippet.code);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleInsert = (snippet: CodeSnippet) => {
    if (snippet.type === 'html') {
      onInsertHTML(snippet.code);
    } else {
      onInsertCSS(snippet.code);
    }
    setCopiedId(snippet.id);
    setTimeout(() => {
      setCopiedId(null);
      setIsOpen(false);
    }, 600);
  };

  return (
    <div ref={containerRef} className="relative z-30 bg-[#16161a] border-b border-zinc-800">
      {/* Top Bar with Collapsed Trigger Button */}
      <div className="px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all text-xs border ${
              isOpen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'bg-[#222228] text-zinc-200 border-zinc-700 hover:border-zinc-500 hover:bg-[#282830]'
            }`}
          >
            <Code className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Libreria Snippets di Codice</span>
            <span className="text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
              {CODE_SNIPPETS.length}
            </span>
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          <span className="text-[11px] text-zinc-400 hidden sm:inline">
            Clicca per aprire la lista e scegliere pezzi di codice (occhi, naso, bocca, capelli, variabili)
          </span>
        </div>

        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            title="Chiudi lista"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Expandable Dropdown Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 max-h-[70vh] bg-[#1a1a20] border-b border-zinc-700 shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Categories Selector */}
          <div className="p-3 bg-[#141418] border-b border-zinc-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Snippets Grid */}
          <div className="p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filtered.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-[#22222a] border border-zinc-700/80 rounded-xl p-3.5 flex flex-col justify-between hover:border-indigo-500/60 transition-all space-y-2.5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-zinc-100 text-xs truncate">
                      {snippet.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 shrink-0">
                      {snippet.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                    {snippet.description}
                  </p>
                </div>

                <div className="bg-[#121216] p-2 rounded-lg border border-zinc-800/80 text-[11px] font-mono text-zinc-300 max-h-24 overflow-y-auto leading-relaxed">
                  <code>{snippet.code.slice(0, 180)}...</code>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => handleCopy(snippet)}
                    className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                  >
                    {copiedId === snippet.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copiato!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copia
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleInsert(snippet)}
                    className="text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    {snippet.type === 'html' ? 'Inserisci in HTML' : 'Inserisci nel CSS'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
