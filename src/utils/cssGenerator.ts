import { CharacterConfig } from '../types';

/**
 * Returns a dictionary of all computed CSS custom properties for the character
 */
export function getCharacterVariables(config: CharacterConfig): Record<string, string> {
  const vars: Record<string, string> = {
    // Skin & Head
    '--skin-color': config.skinColor,
    '--skin-shadow': config.skinShadowColor,
    '--blush-color': config.blushColor,
    '--blush-opacity': config.blushOpacity.toString(),
    '--blush-size': `${config.blushSize}px`,
    '--head-width': `${config.headWidth}px`,
    '--head-height': `${config.headHeight}px`,
    '--head-radius': `${config.headRadius}px`,
    '--head-tilt': `${config.headTilt}deg`,

    // Hair
    '--hair-color': config.hairColor,
    '--hair-highlight': config.hairHighlightColor,
    '--hair-volume': config.hairVolume.toString(),

    // Eyes
    '--eye-size': `${config.eyeSize}px`,
    '--eye-spacing': `${config.eyeSpacing}px`,
    '--eye-y': `${config.eyeY}px`,
    '--iris-color': config.irisColor,
    '--pupil-color': config.pupilColor,

    // Eyebrows
    '--eyebrow-color': config.eyebrowColor,
    '--eyebrow-thickness': `${config.eyebrowThickness}px`,
    '--eyebrow-y': `${config.eyebrowY}px`,
    '--eyebrow-angle': `${config.eyebrowAngle}deg`,

    // Glasses
    '--glasses-color': config.glassesColor,
    '--glasses-thickness': `${config.glassesThickness}px`,
    '--glasses-width': `${config.glassesWidth}px`,
    '--glasses-bridge-width': `${config.glassesBridgeWidth}px`,
    '--glasses-y': `${config.glassesY}px`,

    // Nose
    '--nose-color': config.noseColor,
    '--nose-size': `${config.noseSize}px`,
    '--nose-y': `${config.noseY}px`,

    // Mouth
    '--mouth-color': config.mouthColor,
    '--mouth-lip-color': config.mouthLipColor,
    '--tongue-color': config.tongueColor,
    '--tooth-color': config.toothColor,
    '--mouth-width': `${config.mouthWidth}px`,
    '--mouth-height': `${config.mouthHeight}px`,
    '--mouth-y': `${config.mouthY}px`,

    // Ears
    '--ear-size': `${config.earSize}px`,
    '--ear-y': `${config.earY}px`,
    '--ear-color': config.earColor,
    '--earring-color': config.earringColor,

    // Clothes
    '--clothes-color': config.clothesColor,
    '--clothes-accent': config.clothesSecondaryColor,
    '--neck-width': `${config.neckWidth}px`,
    '--neck-height': `${config.neckHeight}px`,
    '--shoulders-width': `${config.shouldersWidth}px`,

    // Full Body & Limbs
    '--hands-color': config.handsColor,
    '--pants-color': config.pantsColor,
    '--shoes-color': config.shoesColor,
    '--shoes-accent': config.shoesAccentColor,

    // Badge & Background
    '--badge-color': config.badgeColor,
    '--badge-size': `${config.badgeSize}px`,
    '--badge-border-color': config.badgeBorderColor,

    // Status Dot
    '--status-color': config.statusColor,

    // Thought Bubble
    '--bubble-bg': config.thoughtBubbleBg,
    '--bubble-scale': config.thoughtBubbleScale.toString(),

    // Extra user vars
    ...config.customVariables,
  };

  return vars;
}

/**
 * Returns formatted CSS custom properties block (:root or .pure-css-character)
 */
export function generateCSSVariablesString(config: CharacterConfig, selector: string = '.pure-css-character'): string {
  const vars = getCharacterVariables(config);
  const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * Generates the complete, dependency-free CSS stylesheet for the character
 */
export function generatePureCSS(config: CharacterConfig): string {
  const varsString = generateCSSVariablesString(config, ':root');

  return `/* ==========================================================
   * PURE CSS CHARACTER / AVATAR
   * Codice 100% puro CSS e HTML - Nessun framework o libreria.
   * Personalizzabile totalmente tramite le variabili CSS in :root
   * ========================================================== */

${varsString}

/* Box sizing reset per il componente */
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
  width: ${config.mode === 'fullbody' ? '320px' : '300px'};
  height: ${config.mode === 'fullbody' ? '460px' : '300px'};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

/* Sfondo Circolare (Badge) - come nel riferimento */
.char-badge {
  position: absolute;
  width: var(--badge-size);
  height: var(--badge-size);
  background-color: var(--badge-color);
  border-radius: 50%;
  z-index: 1;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  ${config.badgeBorder ? 'border: 4px solid var(--badge-border-color);' : ''}
  transition: all 0.3s ease;
}

/* Pallino di Stato Online (verde fluorescente con bordo bianco) */
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
  animation: pulse-dot 2.5s infinite ease-in-out;
}

/* Fumetto di pensiero / reazione (come nel riferimento) */
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
  transform: scale(var(--bubble-scale));
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float-bubble 4s infinite ease-in-out;
}

/* Puntini del fumetto */
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

/* Occhi curiosi all'interno del fumetto (ispirazione screenshot!) */
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

/* Struttura Principale Corpo / Testa */
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

/* Capelli posteriori (volume e ricci) */
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

/* Testa (squadrata morbida / squircle iconico) */
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
.char-earring {
  position: absolute;
  bottom: -4px;
  width: 10px;
  height: 10px;
  border: 2.5px solid var(--earring-color);
  border-radius: 50%;
}
.char-ear.ear-left .char-earring { left: 4px; }
.char-ear.ear-right .char-earring { right: 4px; }

/* Capelli frontali / Frangia riccia (come la chioma nel riferimento) */
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
  transform: rotate(var(--eyebrow-angle));
}
.char-eyebrow.eyebrow-left {
  transform: rotate(calc(var(--eyebrow-angle) * -1));
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
.char-eye-shine {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 32%;
  height: 32%;
  background: #ffffff;
  border-radius: 50%;
}

/* Occhiali (Iconici lilla/viola arrotondati con ponte e cerniere) */
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
/* Cerniere esterne delle stanghette degli occhiali */
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

/* Naso (Triangolo arrotondato morbido con punta in basso) */
.char-nose {
  position: absolute;
  top: var(--nose-y);
  width: var(--nose-size);
  height: calc(var(--nose-size) * 0.9);
  background-color: var(--nose-color);
  border-radius: 40% 40% 50% 50%;
  z-index: 6;
}

/* Bocca espressiva aperta con dente e lingua (come nel riferimento) */
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
  box-shadow: inset 0 -2px 0 var(--mouth-lip-color);
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

/* Collo (Dolcevita alto come nel riferimento) */
.char-neck {
  position: absolute;
  top: calc(var(--head-height) - 16px);
  width: var(--neck-width);
  height: var(--neck-height);
  background-color: var(--clothes-color);
  border-radius: 8px;
  z-index: 3;
  box-shadow: inset 0 6px 0 0 rgba(0, 0, 0, 0.12);
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

/* Busto / Spalle */
.char-shoulders {
  position: absolute;
  top: calc(var(--head-height) + 18px);
  width: var(--shoulders-width);
  height: 90px;
  background-color: var(--clothes-color);
  border-radius: 50px 50px 0 0;
  z-index: 2;
  box-shadow: inset 0 8px 16px rgba(0, 0, 0, 0.08);
}

/* Modalità Full Body: Torso esteso, braccia, gambe, scarpe */
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

/* Animazioni Pure CSS opzionali */
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes float-bubble {
  0%, 100% { transform: translateY(0) scale(var(--bubble-scale)); }
  50% { transform: translateY(-6px) scale(var(--bubble-scale)); }
}

@keyframes breathe {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes blink {
  0%, 96%, 100% { transform: scaleY(1); }
  98% { transform: scaleY(0.1); }
}

/* Classi di Animazione attivabili */
.anim-breathing .char-head,
.anim-breathing .char-shoulders {
  animation: breathe 3s infinite ease-in-out;
}

.anim-blinking .char-eye {
  animation: blink 4s infinite;
}

.anim-floating {
  animation: breathe 2.5s infinite ease-in-out;
}
`;
}

/**
 * Generates the clean, semantic pure HTML markup for the character
 */
export function generatePureHTML(config: CharacterConfig): string {
  const isFull = config.mode === 'fullbody';
  const animClass = config.animation !== 'none' ? ` anim-${config.animation}` : '';

  let accessoryInsideBubble = '';
  if (config.thoughtBubbleType === 'curious-eyes') {
    accessoryInsideBubble = `
        <div class="bubble-eyes">
          <div class="bubble-eye"><div class="bubble-eye-pupil"></div></div>
          <div class="bubble-eye"><div class="bubble-eye-pupil"></div></div>
        </div>`;
  } else if (config.thoughtBubbleType === 'code-brackets') {
    accessoryInsideBubble = `<span style="font-family: monospace; font-weight: bold; font-size: 16px; color: #0284c7;">&lt;/&gt;</span>`;
  } else if (config.thoughtBubbleType === 'heart') {
    accessoryInsideBubble = `<span style="font-size: 20px;">❤️</span>`;
  } else if (config.thoughtBubbleType === 'lightbulb') {
    accessoryInsideBubble = `<span style="font-size: 20px;">💡</span>`;
  } else if (config.thoughtBubbleType === 'music-note') {
    accessoryInsideBubble = `<span style="font-size: 20px;">🎵</span>`;
  } else if (config.thoughtBubbleType === 'question-mark') {
    accessoryInsideBubble = `<span style="font-size: 20px; font-weight: bold; color: #71717a;">?</span>`;
  } else if (config.thoughtBubbleType === 'custom-text') {
    accessoryInsideBubble = `<span style="font-size: 13px; font-weight: 600; color: #374151;">${config.thoughtBubbleText || 'Ciao!'}</span>`;
  }

  return `<!-- ==============================================
     PURE CSS CHARACTER CONTAINER
     Non richiede dipendenze, immagini né font esterni
     ============================================== -->
<div class="pure-css-character${animClass}">
  ${config.showCircleBadge ? '<div class="char-badge"></div>' : ''}
  
  ${config.showStatusDot ? '<div class="char-status-dot" title="Online Status"></div>' : ''}

  ${
    config.thoughtBubbleType !== 'none'
      ? `<div class="char-thought-bubble">
      <div class="bubble-content">${accessoryInsideBubble}
      </div>
    </div>`
      : ''
  }

  <div class="char-stage">
    <!-- Capelli di sfondo -->
    <div class="char-hair-back"></div>

    <!-- Collo e Spalle -->
    <div class="char-neck"></div>
    <div class="char-shoulders"></div>

    ${
      isFull
        ? `<!-- Fullbody Torso, Braccia e Gambe -->
    <div class="char-fullbody-torso">
      <div class="char-arm arm-left"><div class="char-hand"></div></div>
      <div class="char-arm arm-right"><div class="char-hand"></div></div>
    </div>
    <div class="char-legs">
      <div class="char-leg leg-left"><div class="char-shoe"></div></div>
      <div class="char-leg leg-right"><div class="char-shoe"></div></div>
    </div>`
        : ''
    }

    <!-- Testa e Volto -->
    <div class="char-head">
      <!-- Orecchie -->
      <div class="char-ear ear-left">
        ${config.earringStyle !== 'none' ? '<div class="char-earring"></div>' : ''}
      </div>
      <div class="char-ear ear-right">
        ${config.earringStyle !== 'none' ? '<div class="char-earring"></div>' : ''}
      </div>

      <!-- Guance / Blush -->
      <div class="char-blush blush-left"></div>
      <div class="char-blush blush-right"></div>

      <!-- Sopracciglia -->
      <div class="char-eyebrows">
        <div class="char-eyebrow eyebrow-left"></div>
        <div class="char-eyebrow eyebrow-right"></div>
      </div>

      <!-- Occhi -->
      <div class="char-eyes">
        <div class="char-eye eye-left">
          <div class="char-eye-iris">
            <div class="char-eye-pupil">
              ${config.showEyeHighlight ? '<div class="char-eye-shine"></div>' : ''}
            </div>
          </div>
        </div>
        <div class="char-eye eye-right">
          <div class="char-eye-iris">
            <div class="char-eye-pupil">
              ${config.showEyeHighlight ? '<div class="char-eye-shine"></div>' : ''}
            </div>
          </div>
        </div>
      </div>

      ${
        config.glassesEnabled && config.glassesStyle !== 'none'
          ? `<!-- Occhiali -->
      <div class="char-glasses">
        <div class="glasses-lens lens-left"></div>
        <div class="glasses-bridge"></div>
        <div class="glasses-lens lens-right"></div>
      </div>`
          : ''
      }

      <!-- Naso -->
      <div class="char-nose"></div>

      <!-- Bocca -->
      <div class="char-mouth">
        ${config.mouthStyle === 'open-toothy' ? '<div class="char-mouth-tooth"></div>' : ''}
        ${['open-toothy', 'playful-tongue', 'wide-smile'].includes(config.mouthStyle) ? '<div class="char-mouth-tongue"></div>' : ''}
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
}

/**
 * Generates a full, standalone .html file that the user can open directly in any browser
 */
export function generateStandaloneHTML(config: CharacterConfig): string {
  const css = generatePureCSS(config);
  const html = generatePureHTML(config);

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.name} - Pure CSS Character</title>
  <style>
    /* Reset della pagina demo */
    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f4f4f5;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 24px;
    }
    
    .demo-container {
      background: #ffffff;
      padding: 40px;
      border-radius: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.06);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .demo-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #27272a;
      letter-spacing: -0.02em;
    }

    ${css}
  </style>
</head>
<body>

  <div class="demo-container">
    <div class="demo-title">${config.name}</div>
    ${html}
  </div>

</body>
</html>`;
}
