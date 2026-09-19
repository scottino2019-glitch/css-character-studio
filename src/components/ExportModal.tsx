import React, { useState } from 'react';
import { CharacterConfig } from '../types';
import {
  generatePureCSS,
  generatePureHTML,
  generateStandaloneHTML,
  generateCSSVariablesString,
} from '../utils/cssGenerator';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  Code,
  FileText,
  Sliders,
  ExternalLink,
} from 'lucide-react';

interface ExportModalProps {
  config: CharacterConfig;
  isOpen: boolean;
  onClose: () => void;
}

type ExportTab = 'standalone' | 'css' | 'html' | 'vars';

export const ExportModal: React.FC<ExportModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<ExportTab>('standalone');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const standaloneCode = generateStandaloneHTML(config);
  const pureCssCode = generatePureCSS(config);
  const pureHtmlCode = generatePureHTML(config);
  const cssVarsCode = generateCSSVariablesString(config, ':root');

  let currentCode = '';
  let filename = 'character';
  let mimeType = 'text/plain';

  if (tab === 'standalone') {
    currentCode = standaloneCode;
    filename = `${config.name.toLowerCase().replace(/\s+/g, '-')}.html`;
    mimeType = 'text/html';
  } else if (tab === 'css') {
    currentCode = pureCssCode;
    filename = 'character.css';
    mimeType = 'text/css';
  } else if (tab === 'html') {
    currentCode = pureHtmlCode;
    filename = 'character-snippet.html';
    mimeType = 'text/html';
  } else {
    currentCode = cssVarsCode;
    filename = 'character-variables.css';
    mimeType = 'text/css';
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePreviewNewTab = () => {
    const blob = new Blob([standaloneCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/70">
          <div>
            <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-indigo-600" />
              Esporta Codice Puro (HTML + CSS)
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              100% codice puro senza librerie o framework. Pronto all'uso in qualsiasi sito.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-zinc-200 bg-zinc-50/40 overflow-x-auto">
          <button
            onClick={() => setTab('standalone')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === 'standalone'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            HTML Standalone (.html completo)
          </button>
          <button
            onClick={() => setTab('css')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === 'css'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            Foglio di Stile (.css puro)
          </button>
          <button
            onClick={() => setTab('html')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === 'html'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Snippet HTML (Tag & Classi)
          </button>
          <button
            onClick={() => setTab('vars')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              tab === 'vars'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Solo Variabili :root
          </button>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-hidden p-6 bg-zinc-950 flex flex-col">
          <div className="flex items-center justify-between pb-3 text-zinc-400 text-xs font-mono">
            <span>{filename}</span>
            <span>{currentCode.split('\n').length} righe</span>
          </div>

          <pre className="flex-1 overflow-auto p-4 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs leading-relaxed border border-zinc-800 selection:bg-indigo-500/30">
            <code>{currentCode}</code>
          </pre>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-zinc-200 bg-white">
          <div className="text-xs text-zinc-500">
            Nessuna dipendenza npm richiesta.
          </div>

          <div className="flex items-center gap-2">
            {tab === 'standalone' && (
              <button
                onClick={handlePreviewNewTab}
                className="px-3.5 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors flex items-center gap-1.5"
                title="Apri in una nuova scheda"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Test in Nuova Scheda
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Copiato!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copia Codice
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Scarica {filename}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
