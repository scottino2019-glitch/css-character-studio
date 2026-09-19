import React, { useState } from 'react';
import { CODE_SNIPPETS, CodeSnippet } from '../data/codeSnippets';
import {
  Code,
  Copy,
  Check,
  PlusCircle,
  Search,
  Sparkles,
  Layers,
  Eye,
  Smile,
  Scissors,
  Shirt,
  Play,
  RotateCcw,
} from 'lucide-react';

interface CodeSnippetsSidebarProps {
  onInsertCSS: (code: string) => void;
  onInsertHTML: (code: string) => void;
  onReplaceAll: (css: string, html: string) => void;
}

export const CodeSnippetsSidebar: React.FC<CodeSnippetsSidebarProps> = ({
  onInsertCSS,
  onInsertHTML,
  onReplaceAll,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tutti' },
    { id: 'base', label: 'Modello Base' },
    { id: 'variables', label: 'Variabili CSS' },
    { id: 'eyes', label: 'Occhi' },
    { id: 'nose', label: 'Naso' },
    { id: 'mouth', label: 'Bocca' },
    { id: 'hair', label: 'Capelli' },
    { id: 'ears', label: 'Orecchie' },
    { id: 'body', label: 'Corpo & Abiti' },
    { id: 'accessories', label: 'Accessori' },
    { id: 'animations', label: 'Animazioni' },
  ];

  const filtered = CODE_SNIPPETS.filter((snippet) => {
    const matchCat = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchSearch =
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.description.toLowerCase().includes(search.toLowerCase()) ||
      snippet.code.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = async (snippet: CodeSnippet) => {
    await navigator.clipboard.writeText(snippet.code);
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleInsert = (snippet: CodeSnippet) => {
    if (snippet.type === 'full') {
      // Base model
      onInsertCSS(snippet.code);
    } else if (snippet.type === 'html') {
      onInsertHTML(snippet.code);
    } else {
      onInsertCSS(snippet.code);
    }
    setCopiedId(snippet.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#18181c] text-zinc-300 border-r border-zinc-800 text-xs w-80 md:w-88 shrink-0 overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-zinc-800 bg-[#1e1e24]/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold text-zinc-100 text-xs uppercase tracking-wider">
            <Code className="w-4 h-4 text-indigo-400" />
            <span>Libreria Snippets di Codice</span>
          </div>
          <span className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded">
            {filtered.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Cerca snippet (occhi, naso, bocca)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#121214] text-zinc-200 pl-8 pr-3 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-indigo-500/80 text-[11px] font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1 overflow-x-auto scrollbar-none pt-2 pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2 py-1 rounded-md text-[10px] whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Snippets List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filtered.map((snippet) => {
          return (
            <div
              key={snippet.id}
              className="bg-[#1e1e24] border border-zinc-800/90 rounded-xl p-3 hover:border-zinc-700 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-zinc-100 text-xs flex items-center gap-1.5">
                    {snippet.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                    {snippet.description}
                  </p>
                </div>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                  {snippet.type}
                </span>
              </div>

              {/* Code Preview block */}
              <div className="relative group/code">
                <pre className="p-2 bg-[#121214] rounded-lg text-[10.5px] font-mono text-zinc-300 max-h-24 overflow-y-auto overflow-x-hidden border border-zinc-800/60 leading-4 selection:bg-indigo-500/30">
                  <code>{snippet.code.slice(0, 160)}...</code>
                </pre>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopy(snippet)}
                  className="text-[11px] text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
                >
                  {copiedId === snippet.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      Copiato!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copia Codice
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleInsert(snippet)}
                  className="text-[11px] font-medium text-white bg-indigo-600 hover:bg-indigo-500 flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors shadow-xs"
                >
                  <PlusCircle className="w-3 h-3" />
                  {snippet.type === 'html' ? 'Inserisci in HTML' : 'Inserisci nel CSS'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
