export interface CodeSnippet {
  id: string;
  category:
    | 'base'
    | 'variables'
    | 'eyes'
    | 'nose'
    | 'mouth'
    | 'hair'
    | 'ears'
    | 'body'
    | 'arms'
    | 'legs'
    | 'accessories'
    | 'animations';
  title: string;
  description: string;
  type: 'css' | 'html' | 'full';
  code: string;
}

export const BASE_CHARACTER_CSS = `/* ==========================================================
 * PERSONAGGIO IN PURO CSS (100% Codice Puro - Zero Librerie)
 * Modello Fedele allo Screenshot: Ragazza con capelli ramati,
 * occhiali lilla, dolcevita verde, fumetto con occhi e badge rosa.
 * ========================================================== */

:root {
  /* --- DIMENSIONI & FORMA DEL VOLTO --- */
  --head-width: 154px;
  --head-height: 154px;
  --head-radius: 38px;          /* Squircle morbido */
  --head-tilt: 0deg;

  /* --- TONALITA PELLE & BLUSH --- */
  --skin-color: #fbc4b2;
  --skin-shadow: #e9a894;
  --blush-color: #f28f80;
  --blush-opacity: 0.28;
  --blush-size: 24px;

  /* --- CAPELLI & VOLUME --- */
  --hair-color: #b95c25;
  --hair-highlight: #c76e36;
  --hair-volume: 1.15;

  /* --- OCCHI & SOPRACCIGLIA --- */
  --eye-size: 22px;
  --eye-spacing: 46px;
  --eye-y: 52px;
  --iris-color: #8a3a14;
  --pupil-color: #2b1208;
  --eyebrow-color: #7a310b;
  --eyebrow-thickness: 4px;
  --eyebrow-y: 34px;
  --eyebrow-angle: 0deg;

  /* --- OCCHIALI --- */
  --glasses-color: #8c78d4;
  --glasses-thickness: 6px;
  --glasses-width: 128px;
  --glasses-bridge-width: 18px;
  --glasses-y: 48px;

  /* --- NASO --- */
  --nose-color: #e8947f;
  --nose-size: 20px;
  --nose-y: 82px;

  /* --- BOCCA --- */
  --mouth-color: #7a2228;
  --mouth-lip-color: #6a1b20;
  --tongue-color: #d65260;
  --tooth-color: #ffffff;
  --mouth-width: 42px;
  --mouth-height: 28px;
  --mouth-y: 104px;

  /* --- ORECCHIE --- */
  --ear-size: 32px;
  --ear-y: 62px;
  --ear-color: #fbc4b2;
  --earring-color: #f59e0b;

  /* --- VESTITI (DOLCEVITA) --- */
  --clothes-color: #6fa628;
  --clothes-accent: #5c8c1e;
  --neck-width: 54px;
  --neck-height: 46px;
  --shoulders-width: 180px;

  /* --- BRACCIA, GAMBE & SCARPE (FULL BODY) --- */
  --hands-color: #fbc4b2;
  --pants-color: #2563eb;
  --shoes-color: #ffffff;
  --shoes-accent: #6fa628;

  /* --- SFONDO & BADGE --- */
  --badge-color: #f8a5c9;
  --badge-size: 270px;
  --status-color: #4cd305;
  --bubble-bg: #ffffff;
}

/* Reset per il personaggio */
.pure-css-character,
.pure-css-character *,
.pure-css-character *::before,
.pure-css-character *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.pure-css-character {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

/* Sfondo Circolare */
.char-badge {
  position: absolute;
  width: var(--badge-size);
  height: var(--badge-size);
  background-color: var(--badge-color);
  border-radius: 50%;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* Pallino di Stato Online */
.char-status-dot {
  position: absolute;
  width: 36px;
  height: 36px;
  background-color: var(--status-color);
  border: 4.5px solid #ffffff;
  border-radius: 50%;
  bottom: 22px;
  right: 42px;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Fumetto di Pensiero */
.char-thought-bubble {
  position: absolute;
  top: 10px;
  right: 18px;
  background-color: var(--bubble-bg);
  border: 3.5px solid #d4d4d8;
  border-radius: 46% 54% 48% 52% / 54% 46% 54% 46%;
  padding: 10px 14px;
  z-index: 15;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
}

.char-thought-bubble::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 8px;
  width: 10px;
  height: 10px;
  background: var(--bubble-bg);
  border: 3px solid #d4d4d8;
  border-radius: 50%;
}
.char-thought-bubble::after {
  content: '';
  position: absolute;
  bottom: -18px;
  left: 2px;
  width: 6px;
  height: 6px;
  background: var(--bubble-bg);
  border: 2px solid #d4d4d8;
  border-radius: 50%;
}

/* Occhi curiosi nel fumetto */
.bubble-eyes {
  display: flex;
  gap: 3px;
}
.bubble-eye {
  width: 20px;
  height: 28px;
  background: #ffffff;
  border: 3.5px solid #71717a;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.bubble-eye-pupil {
  position: absolute;
  top: 7px;
  left: 2px;
  width: 11px;
  height: 14px;
  background: #0284c7;
  border-radius: 7px;
}
.bubble-eye-pupil::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 2px;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
}

/* Palcoscenico Centrale */
.char-stage {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

/* Capelli Posteriori Ricci */
.char-hair-back {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%) scale(var(--hair-volume));
  width: calc(var(--head-width) * 1.34);
  height: calc(var(--head-height) * 1.25);
  background-color: var(--hair-color);
  border-radius: 50% 50% 45% 45%;
  z-index: 2;
  box-shadow: 
    -24px 10px 0 6px var(--hair-color),
    24px 10px 0 6px var(--hair-color),
    -36px 36px 0 4px var(--hair-color),
    36px 36px 0 4px var(--hair-color),
    -15px -12px 0 10px var(--hair-highlight),
    18px -10px 0 8px var(--hair-color);
}

/* Testa Squircle */
.char-head {
  position: relative;
  width: var(--head-width);
  height: var(--head-height);
  background-color: var(--skin-color);
  border-radius: var(--head-radius);
  transform: rotate(var(--head-tilt));
  z-index: 4;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Orecchie */
.char-ear {
  position: absolute;
  top: var(--ear-y);
  width: var(--ear-size);
  height: var(--ear-size);
  background-color: var(--ear-color);
  border-radius: 50%;
  z-index: 3;
}
.char-ear.ear-left {
  left: -12px;
  box-shadow: inset 4px 0 0 2px var(--skin-shadow);
}
.char-ear.ear-right {
  right: -12px;
  box-shadow: inset -4px 0 0 2px var(--skin-shadow);
}

/* Guance / Blush */
.char-blush {
  position: absolute;
  top: calc(var(--eye-y) + 26px);
  width: var(--blush-size);
  height: calc(var(--blush-size) * 0.65);
  background-color: var(--blush-color);
  opacity: var(--blush-opacity);
  border-radius: 50%;
  filter: blur(1.5px);
}
.char-blush.blush-left { left: 16px; }
.char-blush.blush-right { right: 16px; }

/* Sopracciglia */
.char-eyebrows {
  position: absolute;
  top: var(--eyebrow-y);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: calc(var(--eye-spacing) * 0.9);
  z-index: 6;
}
.char-eyebrow {
  width: 24px;
  height: var(--eyebrow-thickness);
  background-color: var(--eyebrow-color);
  border-radius: 4px;
}

/* Occhi */
.char-eyes {
  position: absolute;
  top: var(--eye-y);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--eye-spacing);
  z-index: 5;
}
.char-eye {
  width: var(--eye-size);
  height: calc(var(--eye-size) * 1.25);
  background: #ffffff;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
}
.char-eye-iris {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 65%;
  height: 65%;
  background-color: var(--iris-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.char-eye-pupil {
  width: 60%;
  height: 60%;
  background-color: var(--pupil-color);
  border-radius: 50%;
  position: relative;
}
.char-eye-pupil::after {
  content: '';
  position: absolute;
  top: 15%;
  right: 15%;
  width: 32%;
  height: 32%;
  background: #ffffff;
  border-radius: 50%;
}

/* Occhiali Lilla */
.char-glasses {
  position: absolute;
  top: var(--glasses-y);
  width: var(--glasses-width);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
}
.glasses-lens {
  width: 48px;
  height: 38px;
  border: var(--glasses-thickness) solid var(--glasses-color);
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.08);
  position: relative;
}
.glasses-lens.lens-left::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  width: 7px;
  height: 8px;
  background-color: var(--glasses-color);
  border-radius: 4px;
}
.glasses-lens.lens-right::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -8px;
  transform: translateY(-50%);
  width: 7px;
  height: 8px;
  background-color: var(--glasses-color);
  border-radius: 4px;
}
.glasses-bridge {
  width: var(--glasses-bridge-width);
  height: var(--glasses-thickness);
  background-color: var(--glasses-color);
  border-radius: 2px;
}

/* Naso a triangolo smussato */
.char-nose {
  position: absolute;
  top: var(--nose-y);
  width: var(--nose-size);
  height: calc(var(--nose-size) * 0.9);
  background-color: var(--nose-color);
  border-radius: 40% 40% 50% 50%;
  z-index: 6;
}

/* Bocca aperta con dente e lingua */
.char-mouth {
  position: absolute;
  top: var(--mouth-y);
  width: var(--mouth-width);
  height: var(--mouth-height);
  background-color: var(--mouth-color);
  border-radius: 8px 8px 24px 24px;
  z-index: 6;
  overflow: hidden;
  position: relative;
}
.char-mouth-tooth {
  position: absolute;
  top: 0;
  left: 22%;
  width: 16px;
  height: 10px;
  background-color: var(--tooth-color);
  border-radius: 0 0 6px 6px;
}
.char-mouth-tongue {
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 24px;
  height: 18px;
  background-color: var(--tongue-color);
  border-radius: 50%;
}

/* Capelli Frontali */
.char-hair-front {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%) scale(var(--hair-volume));
  width: calc(var(--head-width) * 1.08);
  height: 70px;
  z-index: 8;
  pointer-events: none;
}
.hair-bang-1 {
  position: absolute;
  top: 0;
  left: 10px;
  width: 75px;
  height: 52px;
  background-color: var(--hair-color);
  border-radius: 40px 60px 40px 40px;
  transform: rotate(-10deg);
}
.hair-bang-2 {
  position: absolute;
  top: -4px;
  right: 14px;
  width: 82px;
  height: 56px;
  background-color: var(--hair-color);
  border-radius: 60px 40px 40px 40px;
  transform: rotate(14deg);
}
.hair-bang-curl {
  position: absolute;
  top: 26px;
  left: 36px;
  width: 32px;
  height: 24px;
  background-color: var(--hair-highlight);
  border-radius: 50%;
}

/* Collo (Dolcevita) */
.char-neck {
  position: absolute;
  top: calc(var(--head-height) - 16px);
  width: var(--neck-width);
  height: var(--neck-height);
  background-color: var(--clothes-color);
  border-radius: 8px;
  z-index: 3;
}
.char-neck::after {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(var(--neck-width) + 8px);
  height: 14px;
  background-color: var(--clothes-color);
  border-radius: 6px;
  border-bottom: 2px solid var(--clothes-accent);
}

/* Spalle / Busto */
.char-shoulders {
  position: absolute;
  top: calc(var(--head-height) + 18px);
  width: var(--shoulders-width);
  height: 90px;
  background-color: var(--clothes-color);
  border-radius: 50px 50px 0 0;
  z-index: 2;
}

/* --- ELEMENTI FULL BODY (BRACCIA E GAMBE) --- */
.char-fullbody-torso {
  position: absolute;
  top: calc(var(--head-height) + 60px);
  width: 120px;
  height: 110px;
  background-color: var(--clothes-color);
  border-radius: 12px 12px 6px 6px;
  z-index: 2;
}
.char-arm {
  position: absolute;
  width: 26px;
  height: 90px;
  background-color: var(--clothes-color);
  border-radius: 14px;
  z-index: 2;
}
.char-arm.arm-left {
  left: -22px;
  top: 10px;
  transform-origin: top center;
  transform: rotate(20deg);
}
.char-arm.arm-right {
  right: -22px;
  top: 10px;
  transform-origin: top center;
  transform: rotate(-20deg);
}
.char-hand {
  position: absolute;
  bottom: -10px;
  left: 2px;
  width: 22px;
  height: 22px;
  background-color: var(--hands-color);
  border-radius: 50%;
}
.char-legs {
  position: absolute;
  top: calc(var(--head-height) + 165px);
  width: 90px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
}
.char-leg {
  width: 36px;
  height: 100%;
  background-color: var(--pants-color);
  border-radius: 6px;
  position: relative;
}
.char-shoe {
  position: absolute;
  bottom: -12px;
  left: -4px;
  width: 44px;
  height: 22px;
  background-color: var(--shoes-color);
  border-radius: 12px 16px 8px 8px;
  border-bottom: 4px solid var(--shoes-accent);
}
`;

export const BASE_CHARACTER_HTML = `<div class="pure-css-character">
  <!-- Sfondo Circolare -->
  <div class="char-badge"></div>

  <!-- Pallino di Stato Online -->
  <div class="char-status-dot"></div>

  <!-- Fumetto di Pensiero con Occhi Curiosi -->
  <div class="char-thought-bubble">
    <div class="bubble-eyes">
      <div class="bubble-eye"><div class="bubble-eye-pupil"></div></div>
      <div class="bubble-eye"><div class="bubble-eye-pupil"></div></div>
    </div>
  </div>

  <div class="char-stage">
    <!-- Capelli Posteriori -->
    <div class="char-hair-back"></div>

    <!-- Collo e Spalle -->
    <div class="char-neck"></div>
    <div class="char-shoulders"></div>

    <!-- Testa e Volto -->
    <div class="char-head">
      <!-- Orecchie -->
      <div class="char-ear ear-left"></div>
      <div class="char-ear ear-right"></div>

      <!-- Blush Guance -->
      <div class="char-blush blush-left"></div>
      <div class="char-blush blush-right"></div>

      <!-- Sopracciglia -->
      <div class="char-eyebrows">
        <div class="char-eyebrow eyebrow-left"></div>
        <div class="char-eyebrow eyebrow-right"></div>
      </div>

      <!-- Occhi Cartoon -->
      <div class="char-eyes">
        <div class="char-eye eye-left">
          <div class="char-eye-iris"><div class="char-eye-pupil"></div></div>
        </div>
        <div class="char-eye eye-right">
          <div class="char-eye-iris"><div class="char-eye-pupil"></div></div>
        </div>
      </div>

      <!-- Occhiali Lilla -->
      <div class="char-glasses">
        <div class="glasses-lens lens-left"></div>
        <div class="glasses-bridge"></div>
        <div class="glasses-lens lens-right"></div>
      </div>

      <!-- Naso -->
      <div class="char-nose"></div>

      <!-- Bocca Aperta -->
      <div class="char-mouth">
        <div class="char-mouth-tooth"></div>
        <div class="char-mouth-tongue"></div>
      </div>

      <!-- Capelli Frontali -->
      <div class="char-hair-front">
        <div class="hair-bang-1"></div>
        <div class="hair-bang-2"></div>
        <div class="hair-bang-curl"></div>
      </div>
    </div>
  </div>
</div>`;

export const CODE_SNIPPETS: CodeSnippet[] = [
  {
    id: 'snippet-base',
    category: 'base',
    title: 'Modello Base Completo (Screenshot)',
    description: 'Il codice CSS e HTML integrale del personaggio mostrato nello screenshot.',
    type: 'full',
    code: BASE_CHARACTER_CSS,
  },
  {
    id: 'snippet-variables',
    category: 'variables',
    title: 'Variabili CSS del Volto (Controllo Totale)',
    description: 'Tutte le CSS custom properties per personalizzare colore, raggio, posizione e scala.',
    type: 'css',
    code: `:root {
  /* Volto & Pelle */
  --head-width: 154px;
  --head-height: 154px;
  --head-radius: 38px;
  --head-tilt: 0deg;
  --skin-color: #fbc4b2;
  --skin-shadow: #e9a894;
  --blush-color: #f28f80;
  --blush-opacity: 0.28;
  --blush-size: 24px;

  /* Capelli */
  --hair-color: #b95c25;
  --hair-highlight: #c76e36;
  --hair-volume: 1.15;

  /* Occhi & Sopracciglia */
  --eye-size: 22px;
  --eye-spacing: 46px;
  --eye-y: 52px;
  --iris-color: #8a3a14;
  --pupil-color: #2b1208;
  --eyebrow-color: #7a310b;
  --eyebrow-thickness: 4px;
  --eyebrow-y: 34px;

  /* Occhiali */
  --glasses-color: #8c78d4;
  --glasses-thickness: 6px;
  --glasses-width: 128px;
  --glasses-bridge-width: 18px;
  --glasses-y: 48px;

  /* Naso & Bocca */
  --nose-color: #e8947f;
  --nose-size: 20px;
  --nose-y: 82px;
  --mouth-color: #7a2228;
  --tongue-color: #d65260;
  --tooth-color: #ffffff;
  --mouth-width: 42px;
  --mouth-height: 28px;
  --mouth-y: 104px;

  /* Corpo & Abiti */
  --clothes-color: #6fa628;
  --clothes-accent: #5c8c1e;
  --neck-width: 54px;
  --neck-height: 46px;
  --shoulders-width: 180px;

  /* Sfondo & Accessori */
  --badge-color: #f8a5c9;
  --badge-size: 270px;
  --status-color: #4cd305;
}`,
  },
  {
    id: 'snippet-eyes-happy',
    category: 'eyes',
    title: 'Occhi Archi Felici (^ _ ^)',
    description: 'Snippet CSS per occhi socchiusi ad arco sorridente in puro CSS.',
    type: 'css',
    code: `/* Sostituisci la classe .char-eye con archi sorridenti */
.char-eye {
  width: 22px;
  height: 12px;
  background: transparent !important;
  border-top: 4px solid #18181b !important;
  border-radius: 50% 50% 0 0 !important;
  box-shadow: none !important;
}
.char-eye-iris { display: none !important; }`,
  },
  {
    id: 'snippet-eyes-wink',
    category: 'eyes',
    title: 'Occhi con Occhiolino (;)',
    description: 'Snippet CSS per occhio sinistro aperto e occhio destro ammiccante.',
    type: 'css',
    code: `/* Occhiolino: occhio destro socchiuso a curva */
.char-eye.eye-right {
  background: transparent !important;
  border-bottom: 4px solid #18181b !important;
  border-radius: 0 0 50% 50% !important;
  box-shadow: none !important;
  height: 10px !important;
  margin-top: 6px;
}
.char-eye.eye-right .char-eye-iris { display: none !important; }`,
  },
  {
    id: 'snippet-mouth-smile',
    category: 'mouth',
    title: 'Bocca Grande Sorriso Curvo',
    description: 'Snippet CSS per un sorriso aperto e amichevole a mezzaluna.',
    type: 'css',
    code: `.char-mouth {
  width: 48px !important;
  height: 24px !important;
  background-color: var(--mouth-color) !important;
  border-radius: 0 0 28px 28px !important;
  box-shadow: inset 0 3px 0 0 var(--tooth-color) !important;
}
.char-mouth-tooth { display: none !important; }`,
  },
  {
    id: 'snippet-mouth-gentle',
    category: 'mouth',
    title: 'Bocca Sorrisetto a Linea Sottile',
    description: 'Bocca minimale ad arco sottile senza cavità.',
    type: 'css',
    code: `.char-mouth {
  width: 32px !important;
  height: 8px !important;
  background: transparent !important;
  border-bottom: 3.5px solid var(--mouth-lip-color) !important;
  border-radius: 0 0 16px 16px !important;
}
.char-mouth-tooth, .char-mouth-tongue { display: none !important; }`,
  },
  {
    id: 'snippet-hair-bob',
    category: 'hair',
    title: 'Capelli a Caschetto Dritto',
    description: 'Snippet CSS per capelli a caschetto elegante.',
    type: 'css',
    code: `.char-hair-back {
  border-radius: 40px 40px 10px 10px !important;
  box-shadow: none !important;
  width: calc(var(--head-width) * 1.18) !important;
  height: calc(var(--head-height) * 1.15) !important;
}`,
  },
  {
    id: 'snippet-hair-bun',
    category: 'hair',
    title: 'Capelli con Chignon Alto',
    description: 'Snippet CSS per chignon superiore tondo con elastico.',
    type: 'css',
    code: `.char-hair-back {
  border-radius: 50% !important;
  box-shadow: 0 -30px 0 12px var(--hair-color) !important;
  width: calc(var(--head-width) * 1.1) !important;
}`,
  },
  {
    id: 'snippet-glasses-round',
    category: 'accessories',
    title: 'Occhiali Tondi Vintage',
    description: 'Snippet CSS per montatura perfettamente circolare.',
    type: 'css',
    code: `.glasses-lens {
  border-radius: 50% !important;
  width: 44px !important;
  height: 44px !important;
}`,
  },
  {
    id: 'snippet-glasses-sunglasses',
    category: 'accessories',
    title: 'Occhiali da Sole Dark',
    description: 'Lenti scure polarizzate protettive in puro CSS.',
    type: 'css',
    code: `.glasses-lens {
  background-color: #0f172a !important;
  border-color: #1e293b !important;
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.2) !important;
}`,
  },
  {
    id: 'snippet-body-arms-legs',
    category: 'body',
    title: 'Snippet HTML & CSS Corpo Intero (Braccia & Gambe)',
    description: 'Aggiunge le sezioni HTML e stili per renderizzare braccia, mani sui fianchi, gambe e scarpe.',
    type: 'html',
    code: `<!-- Inserisci all'interno di .char-stage per la modalità Full Body -->
<div class="char-fullbody-torso">
  <div class="char-arm arm-left"><div class="char-hand"></div></div>
  <div class="char-arm arm-right"><div class="char-hand"></div></div>
</div>
<div class="char-legs">
  <div class="char-leg leg-left"><div class="char-shoe"></div></div>
  <div class="char-leg leg-right"><div class="char-shoe"></div></div>
</div>`,
  },
  {
    id: 'snippet-animation-breathe',
    category: 'animations',
    title: 'Animazione Pure CSS: Respiro Fluido',
    description: 'Keyframe CSS per movimento morbido di respiro su testa e spalle.',
    type: 'css',
    code: `@keyframes breathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.char-head,
.char-shoulders {
  animation: breathe 3.2s infinite ease-in-out;
}`,
  },
  {
    id: 'snippet-animation-blink',
    category: 'animations',
    title: 'Animazione Pure CSS: Battito Occhi',
    description: 'Keyframe CSS per un ammiccamento naturale degli occhi a intervalli.',
    type: 'css',
    code: `@keyframes blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.08); }
}

.char-eye {
  animation: blink 4.5s infinite;
  transform-origin: center;
}`,
  },
];
