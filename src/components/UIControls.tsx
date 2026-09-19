import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  cssVar?: string;
  onChange: (val: number) => void;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = 'px',
  cssVar,
  onChange,
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-zinc-700">{label}</span>
          {cssVar && (
            <code className="text-[10px] text-zinc-400 font-mono bg-zinc-100 px-1 py-0.5 rounded">
              {cssVar}
            </code>
          )}
        </div>
        <span className="text-zinc-500 font-mono text-[11px]">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
      />
    </div>
  );
};

interface ColorControlProps {
  label: string;
  value: string;
  cssVar?: string;
  onChange: (val: string) => void;
  presetColors?: string[];
}

export const ColorControl: React.FC<ColorControlProps> = ({
  label,
  value,
  cssVar,
  onChange,
  presetColors = [],
}) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-zinc-700">{label}</span>
          {cssVar && (
            <code className="text-[10px] text-zinc-400 font-mono bg-zinc-100 px-1 py-0.5 rounded">
              {cssVar}
            </code>
          )}
        </div>
        <span className="text-zinc-400 font-mono text-[10px] uppercase">
          {value}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 shrink-0 shadow-xs">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-xs font-mono px-2.5 py-1.5 border border-zinc-200 rounded-lg bg-zinc-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
        />
        {presetColors.length > 0 && (
          <div className="flex items-center gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onChange(color)}
                style={{ backgroundColor: color }}
                className={`w-6 h-6 rounded-md border transition-transform hover:scale-110 ${
                  value.toLowerCase() === color.toLowerCase()
                    ? 'border-zinc-900 scale-105 ring-1 ring-zinc-900'
                    : 'border-black/15'
                }`}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface OptionGridProps<T extends string> {
  label: string;
  current: T;
  options: { id: T; label: string; icon?: React.ReactNode; previewBg?: string }[];
  onChange: (id: T) => void;
}

export function OptionGrid<T extends string>({
  label,
  current,
  options,
  onChange,
}: OptionGridProps<T>) {
  return (
    <div className="space-y-1.5">
      <div className="text-xs font-medium text-zinc-700">{label}</div>
      <div className="grid grid-cols-2 gap-1.5">
        {options.map((opt) => {
          const isSelected = current === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`text-xs px-2.5 py-2 rounded-lg border font-medium text-left transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-xs'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              <span>{opt.label}</span>
              {opt.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}
