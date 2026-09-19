import React, { useState } from 'react';
import {
  CharacterConfig,
  HairStyle,
  EyesStyle,
  EyebrowsStyle,
  GlassesStyle,
  NoseStyle,
  MouthStyle,
  EarringStyle,
  OutfitStyle,
  ArmsPose,
  PantsType,
  ShoesType,
  ThoughtBubbleType,
  AnimationType,
} from '../types';
import { SliderControl, ColorControl, OptionGrid } from './UIControls';
import { SnippetsLibrary } from './SnippetsLibrary';
import { getCharacterVariables } from '../utils/cssGenerator';
import {
  Sparkles,
  User,
  Scissors,
  Eye,
  Glasses,
  Smile,
  Shirt,
  MessageSquare,
  Code2,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Sliders,
  Layers,
} from 'lucide-react';

interface CustomizerPanelProps {
  config: CharacterConfig;
  onChange: (updated: CharacterConfig) => void;
  onReset: () => void;
}

type TabKey =
  | 'snippets'
  | 'face'
  | 'hair'
  | 'eyes'
  | 'glasses'
  | 'nose'
  | 'mouth'
  | 'ears'
  | 'clothes'
  | 'limbs'
  | 'accessories'
  | 'css_vars'
  | 'animation';

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  config,
  onChange,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('face');
  const [newVarName, setNewVarName] = useState('');
  const [newVarVal, setNewVarVal] = useState('');
  const [varSearchQuery, setVarSearchQuery] = useState('');

  const update = <K extends keyof CharacterConfig>(key: K, value: CharacterConfig[K]) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  const handleAddCustomVar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVarName.trim() || !newVarVal.trim()) return;

    let key = newVarName.trim();
    if (!key.startsWith('--')) {
      key = `--${key}`;
    }

    onChange({
      ...config,
      customVariables: {
        ...config.customVariables,
        [key]: newVarVal.trim(),
      },
    });
    setNewVarName('');
    setNewVarVal('');
  };

  const handleRemoveCustomVar = (key: string) => {
    const updated = { ...config.customVariables };
    delete updated[key];
    onChange({
      ...config,
      customVariables: updated,
    });
  };

  const allVars = getCharacterVariables(config);
  const filteredVars = Object.entries(allVars).filter(([k]) =>
    k.toLowerCase().includes(varSearchQuery.toLowerCase())
  );

  const tabs: { id: TabKey; label: string; icon: React.ReactNode }[] = [
    { id: 'snippets', label: 'Snippets', icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'face', label: 'Viso', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'hair', label: 'Capelli', icon: <Scissors className="w-3.5 h-3.5" /> },
    { id: 'eyes', label: 'Occhi', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'glasses', label: 'Occhiali', icon: <Glasses className="w-3.5 h-3.5" /> },
    { id: 'nose', label: 'Naso', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'mouth', label: 'Bocca', icon: <Smile className="w-3.5 h-3.5" /> },
    { id: 'ears', label: 'Orecchie', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'clothes', label: 'Abiti', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'limbs', label: 'Braccia/Gambe', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'accessories', label: 'Fumetto & Badge', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'css_vars', label: 'Variabili CSS', icon: <Code2 className="w-3.5 h-3.5 text-indigo-500" /> },
    { id: 'animation', label: 'Animazioni', icon: <Play className="w-3.5 h-3.5 text-emerald-500" /> },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-l border-zinc-200">
      {/* Scrollable Horizontal Tabs Header */}
      <div className="border-b border-zinc-200 bg-zinc-50/70 p-2 overflow-x-auto scrollbar-none flex items-center gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/80 font-semibold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ===================== TAB: SNIPPETS ===================== */}
        {activeTab === 'snippets' && (
          <SnippetsLibrary
            currentConfig={config}
            onSelectPreset={(newConfig) => onChange(newConfig)}
          />
        )}

        {/* ===================== TAB: VISO E BASE ===================== */}
        {activeTab === 'face' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Dimensioni & Forma Testa
              </h3>
              <button
                onClick={onReset}
                className="text-xs text-zinc-400 hover:text-zinc-700 flex items-center gap-1"
                title="Ripristina valori originali"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <SliderControl
              label="Larghezza Testa"
              cssVar="--head-width"
              value={config.headWidth}
              min={110}
              max={200}
              onChange={(val) => update('headWidth', val)}
            />

            <SliderControl
              label="Altezza Testa"
              cssVar="--head-height"
              value={config.headHeight}
              min={110}
              max={200}
              onChange={(val) => update('headHeight', val)}
            />

            <SliderControl
              label="Raggio Angoli (Squircle)"
              cssVar="--head-radius"
              value={config.headRadius}
              min={10}
              max={80}
              onChange={(val) => update('headRadius', val)}
            />

            <SliderControl
              label="Inclinazione Testa"
              cssVar="--head-tilt"
              value={config.headTilt}
              min={-20}
              max={20}
              unit="°"
              onChange={(val) => update('headTilt', val)}
            />

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Tonalità Pelle & Ombre
              </h3>
              <ColorControl
                label="Colore Pelle"
                cssVar="--skin-color"
                value={config.skinColor}
                onChange={(val) => update('skinColor', val)}
                presetColors={['#fbc4b2', '#fed7aa', '#f5d0c5', '#fae8e0', '#d49a7a', '#8d5537']}
              />
              <ColorControl
                label="Ombra Pelle"
                cssVar="--skin-shadow"
                value={config.skinShadowColor}
                onChange={(val) => update('skinShadowColor', val)}
                presetColors={['#e9a894', '#fba564', '#e2b3a4', '#edd3c7', '#b57657', '#6b3c22']}
              />
            </div>

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Guance & Blush
              </h3>
              <ColorControl
                label="Colore Blush"
                cssVar="--blush-color"
                value={config.blushColor}
                onChange={(val) => update('blushColor', val)}
                presetColors={['#f28f80', '#f43f5e', '#ec4899', '#fb7185', '#d97706']}
              />
              <SliderControl
                label="Opacità Blush"
                cssVar="--blush-opacity"
                value={Math.round(config.blushOpacity * 100)}
                min={0}
                max={100}
                unit="%"
                onChange={(val) => update('blushOpacity', val / 100)}
              />
              <SliderControl
                label="Dimensione Blush"
                cssVar="--blush-size"
                value={config.blushSize}
                min={10}
                max={44}
                onChange={(val) => update('blushSize', val)}
              />
            </div>
          </div>
        )}

        {/* ===================== TAB: CAPELLI ===================== */}
        {activeTab === 'hair' && (
          <div className="space-y-5">
            <OptionGrid<HairStyle>
              label="Stile Acconciatura"
              current={config.hairStyle}
              onChange={(val) => update('hairStyle', val)}
              options={[
                { id: 'curly-voluminous', label: 'Ricci Voluminosi (Ispirazione)' },
                { id: 'wavy-shoulder', label: 'Mossi alle Spalle' },
                { id: 'bob-straight', label: 'Caschetto Dritto' },
                { id: 'short-messy', label: 'Corti Scompigliati' },
                { id: 'afro-puff', label: 'Afro Puff' },
                { id: 'bun-top', label: 'Chignon Alto' },
                { id: 'bald', label: 'Rasati / Nessuno' },
              ]}
            />

            <ColorControl
              label="Colore Capelli"
              cssVar="--hair-color"
              value={config.hairColor}
              onChange={(val) => update('hairColor', val)}
              presetColors={['#b95c25', '#18181b', '#451a03', '#ca8a04', '#0284c7', '#db2777']}
            />

            <ColorControl
              label="Riflesso / Highlight"
              cssVar="--hair-highlight"
              value={config.hairHighlightColor}
              onChange={(val) => update('hairHighlightColor', val)}
              presetColors={['#c76e36', '#27272a', '#78350f', '#eab308', '#38bdf8', '#f472b6']}
            />

            <SliderControl
              label="Volume Capelli"
              cssVar="--hair-volume"
              value={Math.round(config.hairVolume * 100)}
              min={80}
              max={140}
              unit="%"
              onChange={(val) => update('hairVolume', val / 100)}
            />
          </div>
        )}

        {/* ===================== TAB: OCCHI E SOPRACCIGLIA ===================== */}
        {activeTab === 'eyes' && (
          <div className="space-y-5">
            <OptionGrid<EyesStyle>
              label="Stile Espressione Occhi"
              current={config.eyesStyle}
              onChange={(val) => update('eyesStyle', val)}
              options={[
                { id: 'cartoon-expressive', label: 'Cartoon Espressivi (Ispirazione)' },
                { id: 'happy-arcs', label: 'Archi Felici (^ _ ^)' },
                { id: 'wide-round', label: 'Spalancati Tondi' },
                { id: 'wink', label: 'Occhiolino (;)' },
                { id: 'sleepy', label: 'Rilassati / Sonnolenti' },
                { id: 'confident', label: 'Decisi / Sicuri' },
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <ColorControl
                label="Iride"
                cssVar="--iris-color"
                value={config.irisColor}
                onChange={(val) => update('irisColor', val)}
                presetColors={['#8a3a14', '#0284c7', '#059669', '#18181b', '#7c3aed']}
              />
              <ColorControl
                label="Pupilla"
                cssVar="--pupil-color"
                value={config.pupilColor}
                onChange={(val) => update('pupilColor', val)}
                presetColors={['#2b1208', '#09090b', '#0c4a6e']}
              />
            </div>

            <SliderControl
              label="Dimensione Occhio"
              cssVar="--eye-size"
              value={config.eyeSize}
              min={12}
              max={36}
              onChange={(val) => update('eyeSize', val)}
            />

            <SliderControl
              label="Distanza tra Occhi"
              cssVar="--eye-spacing"
              value={config.eyeSpacing}
              min={24}
              max={72}
              onChange={(val) => update('eyeSpacing', val)}
            />

            <SliderControl
              label="Posizione Verticale (Y)"
              cssVar="--eye-y"
              value={config.eyeY}
              min={30}
              max={80}
              onChange={(val) => update('eyeY', val)}
            />

            <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
              <span className="text-xs font-medium text-zinc-700">Riflesso Luce Bianca</span>
              <input
                type="checkbox"
                checked={config.showEyeHighlight}
                onChange={(e) => update('showEyeHighlight', e.target.checked)}
                className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
              />
            </div>

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Sopracciglia
              </h3>
              <ColorControl
                label="Colore Sopracciglia"
                cssVar="--eyebrow-color"
                value={config.eyebrowColor}
                onChange={(val) => update('eyebrowColor', val)}
              />
              <SliderControl
                label="Spessore Sopracciglia"
                cssVar="--eyebrow-thickness"
                value={config.eyebrowThickness}
                min={2}
                max={10}
                onChange={(val) => update('eyebrowThickness', val)}
              />
              <SliderControl
                label="Inclinazione"
                cssVar="--eyebrow-angle"
                value={config.eyebrowAngle}
                min={-25}
                max={25}
                unit="°"
                onChange={(val) => update('eyebrowAngle', val)}
              />
              <SliderControl
                label="Posizione Verticale (Y)"
                cssVar="--eyebrow-y"
                value={config.eyebrowY}
                min={20}
                max={55}
                onChange={(val) => update('eyebrowY', val)}
              />
            </div>
          </div>
        )}

        {/* ===================== TAB: OCCHIALI ===================== */}
        {activeTab === 'glasses' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between p-3 bg-zinc-50 border border-zinc-200 rounded-xl">
              <div className="flex items-center gap-2">
                <Glasses className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-semibold text-zinc-800">
                  Indossa Occhiali
                </span>
              </div>
              <input
                type="checkbox"
                checked={config.glassesEnabled}
                onChange={(e) => update('glassesEnabled', e.target.checked)}
                className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
              />
            </div>

            {config.glassesEnabled && (
              <>
                <OptionGrid<GlassesStyle>
                  label="Modello Montatura"
                  current={config.glassesStyle}
                  onChange={(val) => update('glassesStyle', val)}
                  options={[
                    { id: 'rounded-rect', label: 'Rettangolari Arrotondati (Ispirazione)' },
                    { id: 'circular-nerd', label: 'Tondi Vintage' },
                    { id: 'retro-hex', label: 'Esagonali Moderni' },
                    { id: 'sunglasses', label: 'Da Sole Dark' },
                  ]}
                />

                <ColorControl
                  label="Colore Montatura"
                  cssVar="--glasses-color"
                  value={config.glassesColor}
                  onChange={(val) => update('glassesColor', val)}
                  presetColors={['#8c78d4', '#0f172a', '#d97706', '#dc2626', '#0284c7', '#10b981']}
                />

                <SliderControl
                  label="Spessore Montatura"
                  cssVar="--glasses-thickness"
                  value={config.glassesThickness}
                  min={2}
                  max={10}
                  onChange={(val) => update('glassesThickness', val)}
                />

                <SliderControl
                  label="Larghezza Totale Occhiali"
                  cssVar="--glasses-width"
                  value={config.glassesWidth}
                  min={90}
                  max={150}
                  onChange={(val) => update('glassesWidth', val)}
                />

                <SliderControl
                  label="Larghezza Ponte Centrale"
                  cssVar="--glasses-bridge-width"
                  value={config.glassesBridgeWidth}
                  min={10}
                  max={30}
                  onChange={(val) => update('glassesBridgeWidth', val)}
                />

                <SliderControl
                  label="Posizione Verticale (Y)"
                  cssVar="--glasses-y"
                  value={config.glassesY}
                  min={30}
                  max={70}
                  onChange={(val) => update('glassesY', val)}
                />
              </>
            )}
          </div>
        )}

        {/* ===================== TAB: NASO ===================== */}
        {activeTab === 'nose' && (
          <div className="space-y-5">
            <OptionGrid<NoseStyle>
              label="Forma del Naso"
              current={config.noseStyle}
              onChange={(val) => update('noseStyle', val)}
              options={[
                { id: 'rounded-triangle', label: 'Triangolo Morbido (Ispirazione)' },
                { id: 'button-round', label: 'A Bottone Rotondo' },
                { id: 'soft-pill', label: 'Pillola Orizzontale' },
                { id: 'minimal-line', label: 'Tratto Minimale' },
              ]}
            />

            <ColorControl
              label="Colore Naso"
              cssVar="--nose-color"
              value={config.noseColor}
              onChange={(val) => update('noseColor', val)}
              presetColors={['#e8947f', '#f97316', '#dc2626', '#d97706', '#be123c']}
            />

            <SliderControl
              label="Dimensione Naso"
              cssVar="--nose-size"
              value={config.noseSize}
              min={10}
              max={34}
              onChange={(val) => update('noseSize', val)}
            />

            <SliderControl
              label="Posizione Verticale (Y)"
              cssVar="--nose-y"
              value={config.noseY}
              min={60}
              max={110}
              onChange={(val) => update('noseY', val)}
            />
          </div>
        )}

        {/* ===================== TAB: BOCCA ===================== */}
        {activeTab === 'mouth' && (
          <div className="space-y-5">
            <OptionGrid<MouthStyle>
              label="Espressione Bocca"
              current={config.mouthStyle}
              onChange={(val) => update('mouthStyle', val)}
              options={[
                { id: 'open-toothy', label: 'Aperta con Dente e Lingua (Ispirazione)' },
                { id: 'wide-smile', label: 'Grande Sorriso Aperto' },
                { id: 'gentle-smile', label: 'Sorrisetto a Linea' },
                { id: 'smirk-side', label: 'Sorrisetto Furbo' },
                { id: 'surprised-o', label: 'Sorpresa a "O"' },
                { id: 'flat-neutral', label: 'Neutra Ditta' },
                { id: 'playful-tongue', label: 'Linguaccia Giocherellona' },
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <ColorControl
                label="Cavità Bocca"
                cssVar="--mouth-color"
                value={config.mouthColor}
                onChange={(val) => update('mouthColor', val)}
                presetColors={['#7a2228', '#881337', '#18181b', '#991b1b']}
              />
              <ColorControl
                label="Colore Lingua"
                cssVar="--tongue-color"
                value={config.tongueColor}
                onChange={(val) => update('tongueColor', val)}
                presetColors={['#d65260', '#fb7185', '#f43f5e', '#f87171']}
              />
            </div>

            <ColorControl
              label="Colore Dente"
              cssVar="--tooth-color"
              value={config.toothColor}
              onChange={(val) => update('toothColor', val)}
              presetColors={['#ffffff', '#fef08a', '#f4f4f5']}
            />

            <SliderControl
              label="Larghezza Bocca"
              cssVar="--mouth-width"
              value={config.mouthWidth}
              min={20}
              max={70}
              onChange={(val) => update('mouthWidth', val)}
            />

            <SliderControl
              label="Apertura / Altezza"
              cssVar="--mouth-height"
              value={config.mouthHeight}
              min={10}
              max={44}
              onChange={(val) => update('mouthHeight', val)}
            />

            <SliderControl
              label="Posizione Verticale (Y)"
              cssVar="--mouth-y"
              value={config.mouthY}
              min={85}
              max={125}
              onChange={(val) => update('mouthY', val)}
            />
          </div>
        )}

        {/* ===================== TAB: ORECCHIE ===================== */}
        {activeTab === 'ears' && (
          <div className="space-y-5">
            <SliderControl
              label="Dimensione Orecchie"
              cssVar="--ear-size"
              value={config.earSize}
              min={18}
              max={46}
              onChange={(val) => update('earSize', val)}
            />

            <SliderControl
              label="Posizione Verticale (Y)"
              cssVar="--ear-y"
              value={config.earY}
              min={40}
              max={85}
              onChange={(val) => update('earY', val)}
            />

            <ColorControl
              label="Colore Orecchie"
              cssVar="--ear-color"
              value={config.earColor}
              onChange={(val) => update('earColor', val)}
            />

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <OptionGrid<EarringStyle>
                label="Orecchini & Piercing"
                current={config.earringStyle}
                onChange={(val) => update('earringStyle', val)}
                options={[
                  { id: 'none', label: 'Nessuno' },
                  { id: 'gold-hoop', label: 'Cerchio Dorato' },
                  { id: 'silver-stud', label: 'Punto Luce Argento' },
                  { id: 'pearl', label: 'Perla Bianca' },
                ]}
              />

              {config.earringStyle !== 'none' && (
                <ColorControl
                  label="Colore Orecchini"
                  cssVar="--earring-color"
                  value={config.earringColor}
                  onChange={(val) => update('earringColor', val)}
                  presetColors={['#f59e0b', '#e2e8f0', '#06b6d4', '#ec4899']}
                />
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: ABITI E CORPO ===================== */}
        {activeTab === 'clothes' && (
          <div className="space-y-5">
            <OptionGrid<OutfitStyle>
              label="Modello Abito / Scollatura"
              current={config.outfitStyle}
              onChange={(val) => update('outfitStyle', val)}
              options={[
                { id: 'turtleneck', label: 'Dolcevita Alto (Ispirazione)' },
                { id: 'crewneck-tshirt', label: 'Girocollo T-Shirt' },
                { id: 'hoodie-casual', label: 'Felpa Sportiva' },
                { id: 'collared-shirt', label: 'Camicia con Colletto' },
                { id: 'v-neck-sweater', label: 'Maglia con Scollo a V' },
              ]}
            />

            <ColorControl
              label="Colore Principale Vestiti"
              cssVar="--clothes-color"
              value={config.clothesColor}
              onChange={(val) => update('clothesColor', val)}
              presetColors={['#6fa628', '#1e293b', '#2563eb', '#ef4444', '#f59e0b', '#7c3aed', '#fafaf9']}
            />

            <ColorControl
              label="Colore Accento / Bordo"
              cssVar="--clothes-accent"
              value={config.clothesSecondaryColor}
              onChange={(val) => update('clothesSecondaryColor', val)}
              presetColors={['#5c8c1e', '#0f172a', '#1d4ed8', '#b91c1c', '#d97706', '#6d28d9']}
            />

            <SliderControl
              label="Larghezza Collo"
              cssVar="--neck-width"
              value={config.neckWidth}
              min={36}
              max={80}
              onChange={(val) => update('neckWidth', val)}
            />

            <SliderControl
              label="Altezza Collo"
              cssVar="--neck-height"
              value={config.neckHeight}
              min={24}
              max={65}
              onChange={(val) => update('neckHeight', val)}
            />

            <SliderControl
              label="Larghezza Spalle"
              cssVar="--shoulders-width"
              value={config.shouldersWidth}
              min={130}
              max={240}
              onChange={(val) => update('shouldersWidth', val)}
            />
          </div>
        )}

        {/* ===================== TAB: BRACCIA E GAMBE (FULLBODY) ===================== */}
        {activeTab === 'limbs' && (
          <div className="space-y-5">
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800">
                  Modalità Corpo Intero (Full Body)
                </span>
                <input
                  type="checkbox"
                  checked={config.mode === 'fullbody'}
                  onChange={(e) => update('mode', e.target.checked ? 'fullbody' : 'avatar')}
                  className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-zinc-500">
                Attiva braccia, gambe, pantaloni e scarpe renderizzate in puro CSS.
              </p>
            </div>

            <OptionGrid<ArmsPose>
              label="Posa delle Braccia"
              current={config.armsPose}
              onChange={(val) => update('armsPose', val)}
              options={[
                { id: 'hands-on-hips', label: 'Mani sui Fianchi' },
                { id: 'waving-hand', label: 'Saluto con la Mano' },
                { id: 'relaxed-down', label: 'Rilassate ai Lati' },
              ]}
            />

            <ColorControl
              label="Colore Mani / Pelle"
              cssVar="--hands-color"
              value={config.handsColor}
              onChange={(val) => update('handsColor', val)}
            />

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <OptionGrid<PantsType>
                label="Tipo Pantaloni"
                current={config.pantsType}
                onChange={(val) => update('pantsType', val)}
                options={[
                  { id: 'jeans', label: 'Jeans' },
                  { id: 'chinos', label: 'Chino / Eleganti' },
                  { id: 'sweatpants', label: 'Tuta Sportiva' },
                ]}
              />

              <ColorControl
                label="Colore Pantaloni"
                cssVar="--pants-color"
                value={config.pantsColor}
                onChange={(val) => update('pantsColor', val)}
                presetColors={['#2563eb', '#1e293b', '#64748b', '#78350f', '#000000']}
              />
            </div>

            <div className="pt-2 border-t border-zinc-100 space-y-4">
              <OptionGrid<ShoesType>
                label="Scarpe"
                current={config.shoesType}
                onChange={(val) => update('shoesType', val)}
                options={[
                  { id: 'sneakers', label: 'Sneakers' },
                  { id: 'boots', label: 'Stivaletti' },
                  { id: 'loafers', label: 'Mocassini' },
                ]}
              />

              <div className="grid grid-cols-2 gap-3">
                <ColorControl
                  label="Colore Scarpe"
                  cssVar="--shoes-color"
                  value={config.shoesColor}
                  onChange={(val) => update('shoesColor', val)}
                  presetColors={['#ffffff', '#0f172a', '#78350f', '#dc2626']}
                />
                <ColorControl
                  label="Suola / Accento"
                  cssVar="--shoes-accent"
                  value={config.shoesAccentColor}
                  onChange={(val) => update('shoesAccentColor', val)}
                />
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: FUMETTO E BADGE ===================== */}
        {activeTab === 'accessories' && (
          <div className="space-y-5">
            {/* Thought Bubble */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Fumetto / Thought Bubble
              </h3>
              <OptionGrid<ThoughtBubbleType>
                label="Contenuto Fumetto"
                current={config.thoughtBubbleType}
                onChange={(val) => update('thoughtBubbleType', val)}
                options={[
                  { id: 'curious-eyes', label: 'Occhi Curiosi (Ispirazione)' },
                  { id: 'code-brackets', label: 'Codice </>' },
                  { id: 'lightbulb', label: 'Lampadina Idea 💡' },
                  { id: 'heart', label: 'Cuore ❤️' },
                  { id: 'music-note', label: 'Nota Musicale 🎵' },
                  { id: 'question-mark', label: 'Punto Interrogativo ?' },
                  { id: 'custom-text', label: 'Testo Personalizzato' },
                  { id: 'none', label: 'Disattivato' },
                ]}
              />

              {config.thoughtBubbleType === 'custom-text' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-700">Testo nel fumetto</label>
                  <input
                    type="text"
                    maxLength={12}
                    value={config.thoughtBubbleText}
                    onChange={(e) => update('thoughtBubbleText', e.target.value)}
                    placeholder="Es: Ciao! o Wow!"
                    className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                </div>
              )}

              {config.thoughtBubbleType !== 'none' && (
                <ColorControl
                  label="Colore Sfondo Fumetto"
                  cssVar="--bubble-bg"
                  value={config.thoughtBubbleBg}
                  onChange={(val) => update('thoughtBubbleBg', val)}
                  presetColors={['#ffffff', '#f4f4f5', '#fef08a', '#dcfce7']}
                />
              )}
            </div>

            {/* Sfondo Circolare (Badge) */}
            <div className="pt-3 border-t border-zinc-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Badge Circolare (Sfondo)
                </h3>
                <input
                  type="checkbox"
                  checked={config.showCircleBadge}
                  onChange={(e) => update('showCircleBadge', e.target.checked)}
                  className="w-4 h-4 accent-zinc-900 rounded cursor-pointer"
                />
              </div>

              {config.showCircleBadge && (
                <>
                  <ColorControl
                    label="Colore Sfondo Circolare"
                    cssVar="--badge-color"
                    value={config.badgeColor}
                    onChange={(val) => update('badgeColor', val)}
                    presetColors={['#f8a5c9', '#fed7aa', '#c7d2fe', '#a7f3d0', '#fef08a', '#e2e8f0']}
                  />

                  <SliderControl
                    label="Diametro Cerchio"
                    cssVar="--badge-size"
                    value={config.badgeSize}
                    min={200}
                    max={360}
                    onChange={(val) => update('badgeSize', val)}
                  />
                </>
              )}
            </div>

            {/* Pallino di Stato Online */}
            <div className="pt-3 border-t border-zinc-100 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Indicatore Stato Online
                </h3>
                <input
                  type="checkbox"
                  checked={config.showStatusDot}
                  onChange={(e) => update('showStatusDot', e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
              </div>

              {config.showStatusDot && (
                <ColorControl
                  label="Colore Pallino"
                  cssVar="--status-color"
                  value={config.statusColor}
                  onChange={(val) => update('statusColor', val)}
                  presetColors={['#4cd305', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']}
                />
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: VARIABILI CSS AVANZATE ===================== */}
        {activeTab === 'css_vars' && (
          <div className="space-y-5">
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-xs text-indigo-950">
              <div className="font-semibold mb-1 flex items-center gap-1">
                <Code2 className="w-4 h-4 text-indigo-600" />
                Controllo Totale Variabili CSS
              </div>
              Tutti gli elementi grafici sono controllati da proprietà custom CSS. Puoi ispezionare
              ogni valore o aggiungere nuove variabili per personalizzazioni senza limiti.
            </div>

            {/* Search filter for variables */}
            <div>
              <input
                type="text"
                placeholder="Cerca variabile (es. --skin, --head)..."
                value={varSearchQuery}
                onChange={(e) => setVarSearchQuery(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-zinc-50"
              />
            </div>

            {/* Table of active variables */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-100">
              {filteredVars.map(([k, v]) => (
                <div key={k} className="p-2.5 flex items-center justify-between text-xs hover:bg-zinc-50/80">
                  <div className="font-mono text-zinc-800 font-medium truncate max-w-[180px]">
                    {k}
                  </div>
                  <div className="flex items-center gap-2">
                    {v.startsWith('#') && (
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: v }}
                      />
                    )}
                    <span className="font-mono text-zinc-500 text-[11px] bg-zinc-100 px-2 py-0.5 rounded">
                      {v}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom User Variable */}
            <div className="pt-3 border-t border-zinc-100">
              <h4 className="text-xs font-semibold text-zinc-700 mb-2">
                Aggiungi Variabile CSS Personalizzata
              </h4>
              <form onSubmit={handleAddCustomVar} className="space-y-2">
                <input
                  type="text"
                  placeholder="Nome (es: --custom-glow o --shadow)"
                  value={newVarName}
                  onChange={(e) => setNewVarName(e.target.value)}
                  className="w-full text-xs font-mono px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Valore (es: 10px o #ff0077)"
                    value={newVarVal}
                    onChange={(e) => setNewVarVal(e.target.value)}
                    className="flex-1 text-xs font-mono px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  />
                  <button
                    type="submit"
                    disabled={!newVarName || !newVarVal}
                    className="px-3 py-2 bg-zinc-900 text-white rounded-lg text-xs font-medium hover:bg-zinc-800 disabled:opacity-40 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Aggiungi
                  </button>
                </div>
              </form>

              {Object.keys(config.customVariables).length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase">
                    Variabili Aggiuntive:
                  </div>
                  {Object.entries(config.customVariables).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between text-xs bg-zinc-50 p-2 rounded-lg border border-zinc-200"
                    >
                      <span className="font-mono text-zinc-800 font-medium">{k}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-zinc-500">{v}</span>
                        <button
                          onClick={() => handleRemoveCustomVar(k)}
                          className="text-zinc-400 hover:text-red-500"
                          title="Rimuovi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: ANIMAZIONI ===================== */}
        {activeTab === 'animation' && (
          <div className="space-y-5">
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 text-xs text-emerald-950">
              <div className="font-semibold mb-1 flex items-center gap-1">
                <Play className="w-4 h-4 text-emerald-600" />
                Animazioni Pure CSS (@keyframes)
              </div>
              Tutte le animazioni sono scritte in puro CSS senza librerie JS. Vengono esportate
              direttamente nel foglio di stile finale.
            </div>

            <OptionGrid<AnimationType>
              label="Effetto Animazione Attivo"
              current={config.animation}
              onChange={(val) => update('animation', val)}
              options={[
                { id: 'idle-breathing', label: 'Respiro Calmo (Idle)' },
                { id: 'blinking', label: 'Battito Occhi Naturale' },
                { id: 'floating', label: 'Fluttuazione Delicata' },
                { id: 'none', label: 'Nessuna (Statico)' },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
