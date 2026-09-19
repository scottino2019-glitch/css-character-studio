import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, Copy, Check, ExternalLink } from 'lucide-react';

interface LiveCharacterCanvasProps {
  cssCode: string;
  htmlCode: string;
}

export const LiveCharacterCanvas: React.FC<LiveCharacterCanvasProps> = ({
  cssCode,
  htmlCode,
}) => {
  const [scale, setScale] = useState(1);
  const [stageBg, setStageBg] = useState<'light' | 'checker' | 'white' | 'dark' | 'soft-pink'>('light');
  const [copied, setCopied] = useState(false);

  const bgStyles = {
    light: 'bg-zinc-100',
    white: 'bg-white',
    dark: 'bg-zinc-900',
    'soft-pink': 'bg-pink-50',
    checker:
      'bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px] bg-zinc-50',
  }[stageBg];

  const handleDownloadStandalone = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure CSS Character</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f4f5;
    }
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
    a.download = 'character.html';
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

  const handleCopyStandalone = async () => {
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
    await navigator.clipboard.writeText(fullHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestNewTab = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pure CSS Character - Test</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f4f5;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-lg">
      {/* Canvas Controls Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181c] border-b border-zinc-800 select-none text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-zinc-200">Live Preview Render</span>
          <span className="text-[11px] text-zinc-500">(100% Puro CSS)</span>
        </div>

        {/* Background & Zoom Tools */}
        <div className="flex items-center gap-3">
          {/* Background switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            {(
              [
                { id: 'light', title: 'Neutro', color: '#e4e4e7' },
                { id: 'checker', title: 'Trasparente', color: '#71717a' },
                { id: 'white', title: 'Bianco', color: '#ffffff' },
                { id: 'dark', title: 'Scuro', color: '#18181b' },
                { id: 'soft-pink', title: 'Rosa', color: '#fbcfe8' },
              ] as const
            ).map((b) => (
              <button
                key={b.id}
                onClick={() => setStageBg(b.id)}
                className={`w-4 h-4 rounded-full border transition-all ${
                  stageBg === b.id
                    ? 'border-indigo-500 scale-125 ring-1 ring-indigo-500'
                    : 'border-zinc-700 hover:scale-110'
                }`}
                style={{ backgroundColor: b.color }}
                title={b.title}
              />
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 font-mono">
            <button
              onClick={() => setScale((s) => Math.max(0.5, Math.round((s - 0.1) * 10) / 10))}
              className="hover:text-zinc-100"
              title="Rimpicciolisci"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.min(1.5, Math.round((s + 0.1) * 10) / 10))}
              className="hover:text-zinc-100"
              title="Ingrandisci"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Render Stage */}
      <div
        className={`flex-1 relative flex items-center justify-center overflow-hidden transition-colors ${bgStyles}`}
      >
        {/* Dynamic Pure CSS Styles injected directly */}
        <style>{cssCode}</style>

        {/* Character HTML rendered dynamically */}
        <div
          className="transition-transform duration-100 ease-out origin-center"
          style={{ transform: `scale(${scale})` }}
          dangerouslySetInnerHTML={{ __html: htmlCode }}
        />
      </div>

      {/* Canvas Footer Export Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#18181c] border-t border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestNewTab}
            className="px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5"
            title="Apri codice in un nuovo tab"
          >
            <ExternalLink className="w-3 h-3" />
            Test Nuova Scheda
          </button>
          <button
            onClick={handleCopyStandalone}
            className="px-2.5 py-1.5 text-[11px] font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" /> Copiato!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copia Codice Standalone
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSS}
            className="px-3 py-1.5 text-[11px] font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3 h-3 text-sky-400" />
            Scarica style.css
          </button>
          <button
            onClick={handleDownloadStandalone}
            className="px-3 py-1.5 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3 h-3 text-amber-300" />
            Scarica index.html
          </button>
        </div>
      </div>
    </div>
  );
};
