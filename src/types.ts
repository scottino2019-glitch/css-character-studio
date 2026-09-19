export type CharacterMode = 'avatar' | 'fullbody';

export type HairStyle =
  | 'curly-voluminous' // Matching the screenshot puffy curls
  | 'wavy-shoulder'
  | 'bob-straight'
  | 'short-messy'
  | 'afro-puff'
  | 'bun-top'
  | 'pixie-cut'
  | 'bald';

export type EyesStyle =
  | 'cartoon-expressive' // Matching the screenshot with blue iris, dark pupil, white shine
  | 'happy-arcs'
  | 'wide-round'
  | 'wink'
  | 'sleepy'
  | 'curious-side'
  | 'confident';

export type EyebrowsStyle =
  | 'neutral'
  | 'curved-friendly'
  | 'arched-inquisitive'
  | 'straight'
  | 'worried';

export type GlassesStyle =
  | 'none'
  | 'rounded-rect' // Exact match for the screenshot purple glasses!
  | 'circular-nerd'
  | 'cat-eye'
  | 'retro-hex'
  | 'sunglasses';

export type NoseStyle =
  | 'rounded-triangle' // Exact match for screenshot
  | 'button-round'
  | 'soft-pill'
  | 'minimal-line'
  | 'cute-snout';

export type MouthStyle =
  | 'open-toothy' // Exact match for screenshot: open mouth with top tooth and tongue
  | 'wide-smile'
  | 'smirk-side'
  | 'surprised-o'
  | 'gentle-smile'
  | 'flat-neutral'
  | 'playful-tongue';

export type EarStyle = 'standard' | 'pointy-elf' | 'small' | 'large';

export type EarringStyle = 'none' | 'gold-hoop' | 'silver-stud' | 'pearl' | 'double-ring';

export type OutfitStyle =
  | 'turtleneck' // Olive turtleneck from screenshot
  | 'crewneck-tshirt'
  | 'hoodie-casual'
  | 'collared-shirt'
  | 'v-neck-sweater'
  | 'striped-top';

export type ArmsPose =
  | 'relaxed-down'
  | 'hands-on-hips'
  | 'waving-hand'
  | 'arms-crossed'
  | 'peace-sign'
  | 'holding-coffee';

export type LegsPose = 'standing-straight' | 'confident-stride' | 'crossed-legs';

export type PantsType = 'jeans' | 'chinos' | 'shorts' | 'skirt' | 'sweatpants';

export type ShoesType = 'sneakers' | 'boots' | 'loafers' | 'flats';

export type ThoughtBubbleType =
  | 'none'
  | 'curious-eyes' // Exact match for the eyes in the bubble from the screenshot!
  | 'heart'
  | 'lightbulb'
  | 'code-brackets'
  | 'music-note'
  | 'question-mark'
  | 'custom-text';

export type AnimationType = 'none' | 'idle-breathing' | 'blinking' | 'floating' | 'talking';

export interface CharacterConfig {
  id: string;
  name: string;
  mode: CharacterMode;

  // Base & Head
  headWidth: number; // in px or scale ratio (e.g. 150)
  headHeight: number; // in px (e.g. 155)
  headRadius: number; // in px (e.g. 36 for squircle)
  headTilt: number; // deg
  skinColor: string;
  skinShadowColor: string;
  blushColor: string;
  blushOpacity: number; // 0 to 1
  blushSize: number;

  // Hair
  hairStyle: HairStyle;
  hairColor: string;
  hairHighlightColor: string;
  hairVolume: number; // scale 0.8 to 1.4

  // Eyes & Eyebrows
  eyesStyle: EyesStyle;
  eyeSize: number;
  eyeSpacing: number;
  eyeY: number;
  irisColor: string;
  pupilColor: string;
  showEyeHighlight: boolean;
  eyebrowsStyle: EyebrowsStyle;
  eyebrowColor: string;
  eyebrowThickness: number;
  eyebrowY: number;
  eyebrowAngle: number;

  // Glasses
  glassesEnabled: boolean;
  glassesStyle: GlassesStyle;
  glassesColor: string;
  glassesThickness: number;
  glassesWidth: number;
  glassesBridgeWidth: number;
  glassesY: number;

  // Nose
  noseStyle: NoseStyle;
  noseColor: string;
  noseSize: number;
  noseY: number;

  // Mouth
  mouthStyle: MouthStyle;
  mouthColor: string; // cavity
  mouthLipColor: string;
  tongueColor: string;
  toothColor: string;
  mouthWidth: number;
  mouthHeight: number;
  mouthY: number;

  // Ears & Piercings
  earSize: number;
  earY: number;
  earColor: string;
  earringStyle: EarringStyle;
  earringColor: string;

  // Outfit & Body
  outfitStyle: OutfitStyle;
  clothesColor: string;
  clothesSecondaryColor: string;
  neckWidth: number;
  neckHeight: number;
  shouldersWidth: number;

  // Fullbody: Arms & Legs
  armsPose: ArmsPose;
  handsColor: string;
  legsPose: LegsPose;
  pantsType: PantsType;
  pantsColor: string;
  shoesType: ShoesType;
  shoesColor: string;
  shoesAccentColor: string;

  // Background & Accessories
  showCircleBadge: boolean;
  badgeColor: string;
  badgeSize: number;
  badgeBorder: boolean;
  badgeBorderColor: string;

  // Status Indicator Dot (like screenshot green dot)
  showStatusDot: boolean;
  statusColor: string;
  statusPosition: 'bottom-right' | 'bottom-left' | 'top-right';

  // Thought Bubble (like screenshot eyes bubble)
  thoughtBubbleType: ThoughtBubbleType;
  thoughtBubbleText: string;
  thoughtBubbleBg: string;
  thoughtBubbleScale: number;

  // Other Accessories
  accessoryHead: 'none' | 'beanie' | 'headphones' | 'flower-clip' | 'party-hat';
  accessoryColor: string;

  // Animation
  animation: AnimationType;

  // Arbitrary extra CSS variables
  customVariables: Record<string, string>;
}

export interface PresetSnippet {
  id: string;
  title: string;
  description: string;
  category: 'original' | 'tech' | 'creatives' | 'playful' | 'custom';
  config: CharacterConfig;
}
