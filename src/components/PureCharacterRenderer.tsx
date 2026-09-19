import React, { useMemo } from 'react';
import { CharacterConfig } from '../types';
import { getCharacterVariables, generatePureCSS } from '../utils/cssGenerator';

interface PureCharacterRendererProps {
  config: CharacterConfig;
  scale?: number;
  stageBg?: 'checker' | 'light' | 'white' | 'dark' | 'soft-pink';
}

export const PureCharacterRenderer: React.FC<PureCharacterRendererProps> = ({
  config,
  scale = 1,
  stageBg = 'light',
}) => {
  const cssVariables = useMemo(() => {
    return getCharacterVariables(config) as React.CSSProperties;
  }, [config]);

  // Generate pure CSS stylesheet string to inject inside a scoped style element
  const pureCssString = useMemo(() => {
    return generatePureCSS(config);
  }, [config]);

  const bgClasses = {
    checker: 'bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:16px_16px] bg-zinc-50',
    light: 'bg-zinc-100',
    white: 'bg-white',
    dark: 'bg-zinc-900',
    'soft-pink': 'bg-pink-50',
  }[stageBg];

  const animClass = config.animation !== 'none' ? `anim-${config.animation}` : '';

  return (
    <div
      className={`relative w-full h-full min-h-[380px] rounded-2xl flex items-center justify-center overflow-hidden transition-colors border border-zinc-200/80 shadow-inner ${bgClasses}`}
      style={{ touchAction: 'none' }}
    >
      {/* Dynamic CSS styles for the character */}
      <style>{pureCssString}</style>

      {/* Scaled Character Wrapper */}
      <div
        className="transition-transform duration-200 ease-out origin-center select-none"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className={`pure-css-character ${animClass}`}
          style={cssVariables}
        >
          {/* Background circle badge (like screenshot) */}
          {config.showCircleBadge && <div className="char-badge" />}

          {/* Online status indicator dot (like screenshot) */}
          {config.showStatusDot && (
            <div className="char-status-dot" title="Online Status" />
          )}

          {/* Thought bubble with icon / eyes (like screenshot) */}
          {config.thoughtBubbleType !== 'none' && (
            <div className="char-thought-bubble">
              <div className="bubble-content">
                {config.thoughtBubbleType === 'curious-eyes' && (
                  <div className="bubble-eyes">
                    <div className="bubble-eye">
                      <div className="bubble-eye-pupil" />
                    </div>
                    <div className="bubble-eye">
                      <div className="bubble-eye-pupil" />
                    </div>
                  </div>
                )}
                {config.thoughtBubbleType === 'code-brackets' && (
                  <span className="font-mono font-bold text-sky-600 text-sm">
                    &lt;/&gt;
                  </span>
                )}
                {config.thoughtBubbleType === 'heart' && (
                  <span className="text-xl">❤️</span>
                )}
                {config.thoughtBubbleType === 'lightbulb' && (
                  <span className="text-xl">💡</span>
                )}
                {config.thoughtBubbleType === 'music-note' && (
                  <span className="text-xl">🎵</span>
                )}
                {config.thoughtBubbleType === 'question-mark' && (
                  <span className="text-xl font-bold text-zinc-500">?</span>
                )}
                {config.thoughtBubbleType === 'custom-text' && (
                  <span className="text-xs font-semibold text-zinc-700 px-1">
                    {config.thoughtBubbleText || 'Ciao!'}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="char-stage">
            {/* Hair Back Layers */}
            {config.hairStyle !== 'bald' && (
              <div
                className="char-hair-back"
                style={
                  config.hairStyle === 'bob-straight'
                    ? { borderRadius: '40px 40px 10px 10px', boxShadow: 'none' }
                    : config.hairStyle === 'bun-top'
                    ? {
                        borderRadius: '50%',
                        boxShadow: '0 -25px 0 10px var(--hair-color)',
                      }
                    : undefined
                }
              />
            )}

            {/* Neck (turtleneck or standard) */}
            <div className="char-neck" />
            <div className="char-shoulders" />

            {/* Fullbody Torso, Arms and Legs (when in fullbody mode) */}
            {config.mode === 'fullbody' && (
              <>
                <div className="char-fullbody-torso">
                  <div
                    className="char-arm arm-left"
                    style={
                      config.armsPose === 'hands-on-hips'
                        ? { transform: 'rotate(45deg) translateY(12px)' }
                        : config.armsPose === 'waving-hand'
                        ? { transform: 'rotate(-120deg) translateY(-20px)' }
                        : undefined
                    }
                  >
                    <div className="char-hand" />
                  </div>
                  <div
                    className="char-arm arm-right"
                    style={
                      config.armsPose === 'hands-on-hips'
                        ? { transform: 'rotate(-45deg) translateY(12px)' }
                        : undefined
                    }
                  >
                    <div className="char-hand" />
                  </div>
                </div>
                <div className="char-legs">
                  <div className="char-leg leg-left">
                    <div className="char-shoe" />
                  </div>
                  <div className="char-leg leg-right">
                    <div className="char-shoe" />
                  </div>
                </div>
              </>
            )}

            {/* Head */}
            <div className="char-head">
              {/* Ears */}
              <div className="char-ear ear-left">
                {config.earringStyle !== 'none' && <div className="char-earring" />}
              </div>
              <div className="char-ear ear-right">
                {config.earringStyle !== 'none' && <div className="char-earring" />}
              </div>

              {/* Cheeks Blush */}
              <div className="char-blush blush-left" />
              <div className="char-blush blush-right" />

              {/* Eyebrows */}
              <div className="char-eyebrows">
                <div className="char-eyebrow eyebrow-left" />
                <div className="char-eyebrow eyebrow-right" />
              </div>

              {/* Eyes */}
              <div className="char-eyes">
                {config.eyesStyle === 'happy-arcs' ? (
                  <>
                    <div
                      className="char-eye"
                      style={{
                        background: 'transparent',
                        borderTop: '4px solid #18181b',
                        borderRadius: '50% 50% 0 0',
                        boxShadow: 'none',
                        height: '14px',
                      }}
                    />
                    <div
                      className="char-eye"
                      style={{
                        background: 'transparent',
                        borderTop: '4px solid #18181b',
                        borderRadius: '50% 50% 0 0',
                        boxShadow: 'none',
                        height: '14px',
                      }}
                    />
                  </>
                ) : config.eyesStyle === 'wink' ? (
                  <>
                    <div className="char-eye eye-left">
                      <div className="char-eye-iris">
                        <div className="char-eye-pupil">
                          {config.showEyeHighlight && <div className="char-eye-shine" />}
                        </div>
                      </div>
                    </div>
                    <div
                      className="char-eye eye-right"
                      style={{
                        background: 'transparent',
                        borderBottom: '4px solid #18181b',
                        borderRadius: '0 0 50% 50%',
                        boxShadow: 'none',
                        height: '12px',
                        alignSelf: 'center',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="char-eye eye-left">
                      <div className="char-eye-iris">
                        <div className="char-eye-pupil">
                          {config.showEyeHighlight && <div className="char-eye-shine" />}
                        </div>
                      </div>
                    </div>
                    <div className="char-eye eye-right">
                      <div className="char-eye-iris">
                        <div className="char-eye-pupil">
                          {config.showEyeHighlight && <div className="char-eye-shine" />}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Glasses */}
              {config.glassesEnabled && config.glassesStyle !== 'none' && (
                <div className="char-glasses">
                  <div
                    className="glasses-lens lens-left"
                    style={
                      config.glassesStyle === 'circular-nerd'
                        ? { borderRadius: '50%' }
                        : config.glassesStyle === 'sunglasses'
                        ? { backgroundColor: '#18181b', borderRadius: '8px' }
                        : config.glassesStyle === 'retro-hex'
                        ? { borderRadius: '4px' }
                        : undefined
                    }
                  />
                  <div className="glasses-bridge" />
                  <div
                    className="glasses-lens lens-right"
                    style={
                      config.glassesStyle === 'circular-nerd'
                        ? { borderRadius: '50%' }
                        : config.glassesStyle === 'sunglasses'
                        ? { backgroundColor: '#18181b', borderRadius: '8px' }
                        : config.glassesStyle === 'retro-hex'
                        ? { borderRadius: '4px' }
                        : undefined
                    }
                  />
                </div>
              )}

              {/* Nose */}
              <div
                className="char-nose"
                style={
                  config.noseStyle === 'button-round'
                    ? { borderRadius: '50%' }
                    : config.noseStyle === 'minimal-line'
                    ? { width: '4px', height: '14px', borderRadius: '2px' }
                    : undefined
                }
              />

              {/* Mouth */}
              <div
                className="char-mouth"
                style={
                  config.mouthStyle === 'gentle-smile'
                    ? {
                        height: '10px',
                        backgroundColor: 'transparent',
                        borderBottom: '4px solid var(--mouth-lip-color)',
                        borderRadius: '0 0 16px 16px',
                        boxShadow: 'none',
                      }
                    : config.mouthStyle === 'surprised-o'
                    ? {
                        width: '20px',
                        height: '24px',
                        borderRadius: '50%',
                      }
                    : config.mouthStyle === 'flat-neutral'
                    ? {
                        height: '4px',
                        backgroundColor: 'var(--mouth-lip-color)',
                        borderRadius: '2px',
                        boxShadow: 'none',
                      }
                    : undefined
                }
              >
                {config.mouthStyle === 'open-toothy' && (
                  <div className="char-mouth-tooth" />
                )}
                {['open-toothy', 'playful-tongue', 'wide-smile'].includes(
                  config.mouthStyle
                ) && <div className="char-mouth-tongue" />}
              </div>

              {/* Front hair bangs */}
              {config.hairStyle !== 'bald' && (
                <div className="char-hair-front">
                  <div className="hair-bang-1" />
                  <div className="hair-bang-2" />
                  <div className="hair-bang-curl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
