import React, { useState } from 'react';
import {
  BASE_CHARACTER_CSS,
  BASE_CHARACTER_HTML,
} from './data/codeSnippets';
import { CodeEditor } from './components/CodeEditor';
import { TopSnippetsBar } from './components/TopSnippetsBar';
import { LiveCharacterCanvas } from './components/LiveCharacterCanvas';
import {
  Code,
  FileCode,
  RotateCcw,
  Download,
  Copy,
  Check,
  Columns2,
  Maximize2,
} from 'lucide-react';

type ViewMode = 'split' | 'editor-only' | 'preview-only';

export default function App() {
  const [cssCode, setCssCode] = useState<string>(BASE_CHARACTER_CSS);
  const [htmlCode, setHtmlCode] = useState<string>(BASE_CHARACTER_HTML);
  const [activeTab, setActiveTab] = useState<'css' | 'html'>('css');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const handleReset = () => {
    setCssCode(BASE_CHARACTER_CSS);
    setHtmlCode(BASE_CHARACTER_HTML);
  };

  const handleInsertCSS = (snippetCode: string) => {
    setCssCode((prev) => `${prev}\n\n/* --- NUOVO SNIPPET APPLICATO --- */\n${snippetCode}`);
    setActiveTab('css');
  };

  const handleInsertHTML = (snippetCode: string) => {
    setHtmlCode((prev) => `${prev}\n${snippetCode}`);
    setActiveTab('html');
  };

  const handleCopyAll = async () => {
    const full = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure CSS Character</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
</body>
</html>`;
    await navigator.clipboard.writeText(full);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleDownloadStandalone = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure CSS Character</title>
  <style>
${cssCode}
  </style>
</head>
<body>
${htmlCode}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pure-css-character.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSS = () => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'character.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#101014] text-zinc-200 font-sans select-none overflow-hidden">
      {/* Top Main Navigation Bar */}
      <header className="h-13 bg-[#16161b] border-b border-zinc-800 px-4 flex items-center justify-between shrink-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-xs font-bold shadow-xs">
              CSS
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              CSS Character Studio
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
              Solo Codice Puro • Zero Librerie
            </span>
          </div>
        </div>

        {/* View Layout Switcher & Global Actions */}
        <div className="flex items-center gap-2">
          {/* Layout Mode Toggles */}
          <div className="flex bg-[#202026] p-0.5 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setViewMode('split')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'split'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Vista divisa (Codice + Preview)"
            >
              <Columns2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Divisa</span>
            </button>
            <button
              onClick={() => setViewMode('editor-only')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'editor-only'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Solo Editor a tutto schermo"
            >
              <Code className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">Solo Codice</span>
            </button>
            <button
              onClick={() => setViewMode('preview-only')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                viewMode === 'preview-only'
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Solo Preview a tutto schermo"
            >
              <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Solo Preview</span>
            </button>
          </div>

          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5 font-medium"
            title="Ripristina il codice del personaggio originale dallo screenshot"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Ripristina Base</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
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
            onClick={handleDownloadStandalone}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Esporta .html
          </button>
        </div>
      </header>

      {/* Top Snippets Bar: Lista chiusa in alto che si apre solo a comando */}
      <TopSnippetsBar
        onInsertCSS={handleInsertCSS}
        onInsertHTML={handleInsertHTML}
      />

      {/* Main Spacious Studio Workspace */}
      <div className="flex-1 flex overflow-hidden p-3 gap-3">
        {/* Code Editor Section (Takes full width in editor-only mode, or ~56% in split mode) */}
        {(viewMode === 'split' || viewMode === 'editor-only') && (
          <div
            className={`flex flex-col min-w-0 h-full ${
              viewMode === 'editor-only' ? 'w-full' : 'flex-1 lg:flex-[1.25]'
            }`}
          >
            {/* Editor File Tabs */}
            <div className="flex items-center gap-2 mb-2 select-none">
              <button
                onClick={() => setActiveTab('css')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'css'
                    ? 'bg-[#1e1e26] text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <Code className="w-4 h-4 text-sky-400" />
                <span>style.css</span>
                <span className="text-[10px] text-zinc-500">(Variabili & Classi)</span>
              </button>

              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'html'
                    ? 'bg-[#1e1e26] text-white font-semibold border border-zinc-700 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>index.html</span>
                <span className="text-[10px] text-zinc-500">(Tag Div Puri)</span>
              </button>
            </div>

            {/* Editor Canvas */}
            <div className="flex-1 min-h-0">
              {activeTab === 'css' ? (
                <CodeEditor
                  value={cssCode}
                  onChange={setCssCode}
                  language="css"
                  filename="style.css"
                />
              ) : (
                <CodeEditor
                  value={htmlCode}
                  onChange={setHtmlCode}
                  language="html"
                  filename="index.html"
                />
              )}
            </div>
          </div>
        )}

        {/* Live Character Render Canvas (Takes full width in preview-only, or ~44% in split mode) */}
        {(viewMode === 'split' || viewMode === 'preview-only') && (
          <div
            className={`flex flex-col min-w-0 h-full ${
              viewMode === 'preview-only' ? 'w-full' : 'flex-1 lg:flex-[1]'
            }`}
          >
            <LiveCharacterCanvas cssCode={cssCode} htmlCode={htmlCode} />
          </div>
        )}
      </div>
    </div>
  );
}
