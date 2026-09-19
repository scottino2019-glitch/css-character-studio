import React, { useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language: 'css' | 'html';
  filename: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  filename,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const lines = value.split('\n');
  const lineCount = lines.length;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        if (target) {
          target.selectionStart = target.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#18181e] text-zinc-300 font-mono text-[13px] overflow-hidden border border-zinc-800 rounded-xl shadow-xl">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#121216] border-b border-zinc-800 text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              language === 'css' ? 'bg-sky-400 shadow-sky-400/30' : 'bg-amber-400 shadow-amber-400/30'
            }`}
          />
          <span className="font-semibold text-zinc-100">{filename}</span>
          <span className="text-zinc-500 font-normal">({language.toUpperCase()} puro)</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 font-mono text-[11px]">
          <span>{lineCount} righe</span>
          <span>{new Blob([value]).size} B</span>
        </div>
      </div>

      {/* Editor Body: Synchronized Line numbers + Textarea */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Line Numbers column */}
        <div
          ref={lineNumbersRef}
          className="w-14 py-3 bg-[#141418] text-zinc-500 text-right pr-3.5 select-none overflow-hidden font-mono border-r border-zinc-800 leading-6 text-xs"
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          className="flex-1 py-3 px-4 bg-transparent text-zinc-100 font-mono text-[13px] leading-6 resize-none outline-none border-none overflow-auto whitespace-pre selection:bg-indigo-500/40 caret-indigo-400"
          placeholder={`Scrivi o incolla qui il codice ${language.toUpperCase()}...`}
        />
      </div>
    </div>
  );
};
