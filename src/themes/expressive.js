// Expressive: Material 3 Expressive structure in two palettes from the Color Bears dictionary (instagram.com/color.bears).
// Each palette has three roles: main (hero, toolbar), accent (title, filled button, highlighted nodes) and complementary
// (surfaces and containers). Cobalt: Deep Cobalt, Lime Spark, Stellar Periwinkle. Pop: Hue (near black), Pop (a gradient),
// Ray (light gray). Structure: tonal containers in place of borders and shadows, connected list groups for tables, the M3E
// corner scale, the M3E shape library with shape morphing, and the expressive spring motion scheme (expressive-data.js).
// Google Sans Flex is embedded for text outside diagrams; diagrams keep --font-sans because their text widths are estimated
// for it (svg/text.js). Both themes share one stylesheet: every palette value is a token.
import { SANS, MONO } from './fonts.js';
import { MOTION, SHAPES } from './expressive-data.js';

const GSF = `"Google Sans Flex", ${SANS}`;
const ease = (m) => `${m.ms}ms ${m.easing}`;
const { spatialFast, spatialDefault, spatialSlow, effectsDefault } = MOTION;

// Status colors: green, amber and red harmonized toward the main color with material-color-utilities (M3 container tones).
// The lip under a status callout mixes the status color into its container.
const STATUS = {
  light: { '--ok': '#006c4b', '--ok-bg': '#80f9c4', '--x-ok-on': '#002114', '--warn': '#8b5000', '--warn-bg': '#ffdcbe', '--x-warn-on': '#2d1600', '--err': '#b51f47', '--err-bg': '#ffd9dc', '--x-err-on': '#400011' },
  dark: { '--ok': '#62dca9', '--ok-bg': '#005138', '--x-ok-on': '#80f9c4', '--warn': '#ffb871', '--warn-bg': '#6a3c00', '--x-warn-on': '#ffdcbe', '--err': '#ffb2bb', '--err-bg': '#910032', '--x-err-on': '#ffd9dc' },
};

// Six panel badges: fill (a ramp gradient) and letter color.
const badges = (list) => Object.fromEntries(list.flatMap(([bg, fg], i) => [[`--x-b${i + 1}`, bg], [`--x-b${i + 1}-fg`, fg]]));
// A gradient down a ramp, light step on top: the face of a raised surface.
const face = (top, bottom, angle = 160) => `linear-gradient(${angle}deg, ${top} 0%, ${bottom} 100%)`;

// ── Cobalt. Each color has a five-step ramp, dark to light (index 2 is the named color). ──
const COB = ['#090e32', '#172458', '#2b438d', '#456bd1', '#517ef2'];  // Deep Cobalt (main)
const LIME = ['#d6fb3f', '#ddfc62', '#e8fd94', '#f6fed4', '#fcfff2'];  // Lime Spark (accent)
const PERI = ['#3f6cff', '#6287ff', '#94adff', '#d4deff', '#f2f5ff'];  // Stellar Periwinkle (complementary)

const COBALT_COMMON = {
  // Hero: Deep Cobalt lit from the top right by its lighter steps, a lime glow low left, and a darker step as the lip.
  '--x-hero-paint': `radial-gradient(560px 360px at 92% 0%, ${COB[3]} 0%, transparent 70%), radial-gradient(520px 320px at 0% 110%, rgba(232, 253, 148, 0.16) 0%, transparent 70%), ${face(COB[2], '#22377a')}`,
  '--x-hero-title': face(LIME[4], LIME[0], 180), '--x-hero-fg': PERI[4], '--x-hero-fg2': PERI[3], '--x-hero-chip': 'rgba(212, 222, 255, 0.5)',
  '--x-shape-a': face(PERI[2], PERI[1]), '--x-shape-b': face(LIME[3], LIME[0]),
  '--x-reply-bg': face(LIME[2], LIME[1], 180), '--x-reply-fg': COB[0], '--x-reply-lip': LIME[0],
};
const COBALT = {
  light: {
    '--bg': PERI[4], '--paper': '#ffffff', '--ink': COB[0], '--ink-2': COB[2], '--ink-3': COB[3],
    '--line': PERI[2], '--line-2': PERI[3], '--fill': PERI[4], '--accent': COB[2], '--accent-bg': PERI[3],
    '--head-bg': COB[2], '--head-fg': LIME[2], ...STATUS.light, ...COBALT_COMMON,
    '--x-bg-paint': `radial-gradient(1100px 620px at 100% -10%, ${PERI[3]} 0%, transparent 65%), radial-gradient(900px 560px at -10% 105%, ${LIME[3]} 0%, transparent 60%), ${PERI[4]}`,
    '--x-card-lip': PERI[3], '--x-card-hl': 'rgba(255, 255, 255, 0)', '--x-hero-lip': COB[1],
    '--x-item': PERI[4], '--x-item-hover': PERI[3], '--x-inset-paint': face(PERI[4], '#ffffff', 180), '--x-high': PERI[3],
    '--x-chip-bg': PERI[4], '--x-chip-lip': PERI[3], '--x-chip-fg': COB[2], '--x-marker': COB[2],
    '--x-tb-bg': face(COB[1], COB[0], 180), '--x-tb-lip': '#05081f', '--x-tb-fg': PERI[3],
    '--x-co-bg': face(PERI[4], PERI[3], 180), '--x-co-lip': PERI[2], '--x-co-fg': COB[0], '--x-co-icon': face(COB[3], COB[2]), '--x-co-glyph': LIME[2],
    ...badges([[face(COB[3], COB[1]), LIME[2]], [face(LIME[3], LIME[0]), COB[1]], [face(PERI[2], PERI[0]), '#ffffff'], [face(COB[2], COB[0]), PERI[2]], [face(PERI[4], PERI[2]), COB[1]], [face(LIME[2], PERI[1]), COB[0]]]),
    '--node-fill': PERI[3], '--node-stroke': PERI[3], '--node-text': COB[0], '--node-shadow': `drop-shadow(0 3px 0 ${PERI[2]})`,
    '--hi-fill': COB[2], '--hi-stroke': COB[2], '--hi-text': LIME[2],
    '--edge-color': PERI[1], '--edge-label': COB[2], '--actor-fill': COB[1], '--actor-stroke': COB[1], '--actor-text': PERI[4],
    '--note-fill': LIME[2], '--note-stroke': LIME[2], '--cluster-fill': '#e8eeff', '--cluster-stroke': '#e8eeff', '--lifeline-color': PERI[2],
    '--series-1': COB[2], '--series-2': PERI[0], '--series-3': '#617218', '--series-4': '#8b5000', '--series-5': '#006c4b', '--series-6': '#b51f47',
  },
  dark: {
    '--bg': COB[0], '--paper': COB[1], '--ink': PERI[4], '--ink-2': PERI[2], '--ink-3': PERI[1],
    '--line': COB[3], '--line-2': COB[2], '--fill': '#213471', '--accent': PERI[2], '--accent-bg': COB[2],
    '--head-bg': PERI[2], '--head-fg': COB[0], ...STATUS.dark, ...COBALT_COMMON,
    '--x-bg-paint': `radial-gradient(1100px 620px at 100% -10%, rgba(69, 107, 209, 0.32) 0%, transparent 65%), radial-gradient(900px 560px at -10% 105%, rgba(214, 251, 63, 0.07) 0%, transparent 60%), ${COB[0]}`,
    '--x-card-lip': '#04071c', '--x-card-hl': 'rgba(148, 173, 255, 0.14)', '--x-hero-lip': '#04071c',
    '--x-item': '#213471', '--x-item-hover': COB[2], '--x-inset-paint': face('#101b48', COB[0], 180), '--x-high': COB[2],
    '--x-chip-bg': '#213471', '--x-chip-lip': COB[0], '--x-chip-fg': PERI[3], '--x-marker': PERI[2],
    '--x-tb-bg': face(COB[3], COB[2], 180), '--x-tb-lip': COB[1], '--x-tb-fg': PERI[4],
    '--x-co-bg': face(COB[2], '#22377a', 180), '--x-co-lip': COB[0], '--x-co-fg': PERI[4], '--x-co-icon': face(LIME[3], LIME[0]), '--x-co-glyph': COB[1],
    ...badges([[face(PERI[2], PERI[1]), COB[0]], [face(LIME[3], LIME[0]), COB[1]], [face(PERI[1], PERI[0]), '#ffffff'], [face(PERI[4], PERI[3]), COB[1]], [face(COB[4], COB[3]), '#ffffff'], [face(LIME[2], PERI[1]), COB[0]]]),
    '--node-fill': COB[2], '--node-stroke': COB[2], '--node-text': PERI[4], '--node-shadow': `drop-shadow(0 3px 0 ${COB[0]})`,
    '--hi-fill': LIME[2], '--hi-stroke': LIME[2], '--hi-text': COB[0],
    '--edge-color': PERI[1], '--edge-label': PERI[2], '--actor-fill': PERI[2], '--actor-stroke': PERI[2], '--actor-text': COB[0],
    '--note-fill': '#3f4c00', '--note-stroke': '#3f4c00', '--cluster-fill': '#0f1840', '--cluster-stroke': '#0f1840', '--lifeline-color': COB[3],
    '--series-1': PERI[2], '--series-2': LIME[2], '--series-3': PERI[1], '--series-4': '#ffb871', '--series-5': '#62dca9', '--series-6': '#ffb2bb',
  },
};

// ── Pop. Hue and Ray ramps sampled from the posts (dark to light); Pop is a family of gradients across its spectrum. ──
const HUE = ['#030303', '#080808', '#0f0f0f', '#171717', '#1c1c1c'];  // Hue (main)
const RAY = ['#e4e4e4', '#e9e9e9', '#f0f0f0', '#f9f9f9', '#fdfdfd'];  // Ray (complementary)
// Pop (accent): the five gradient cards of the post, each a different cut through the spectrum.
const POP = [
  'linear-gradient(115deg, #9643d0 0%, #d05666 38%, #e57358 55%, #f0a265 75%, #eac550 100%)',
  'linear-gradient(115deg, #eac550 0%, #d05666 50%, #9643d0 100%)',
  'linear-gradient(115deg, #f0a265 0%, #e57358 45%, #5d52ce 100%)',
  'linear-gradient(115deg, #d05666 0%, #b5a35e 55%, #8ec75c 100%)',
  'linear-gradient(115deg, #9643d0 0%, #e8687a 50%, #eac550 100%)',
];
const POP_TEXT = 'linear-gradient(100deg, #c27bff 0%, #f06a8a 40%, #f59a5e 70%, #f2d14b 100%)';
const POP_WARM = 'linear-gradient(115deg, #e57358 0%, #f0a265 55%, #f2c94f 100%)';

const POP_COMMON = {
  // Hero: Hue lit by its lighter steps from the top left, a faint Pop glow from the corner where the shapes sit, and the darkest step as the lip.
  '--x-hero-paint': `radial-gradient(520px 360px at 100% 100%, rgba(208, 86, 102, 0.28) 0%, transparent 70%), radial-gradient(700px 420px at 0% 0%, ${HUE[4]} 0%, transparent 70%), ${face(HUE[3], HUE[1])}`,
  '--x-hero-title': POP_TEXT, '--x-hero-fg': RAY[2], '--x-hero-fg2': '#bdbdbd', '--x-hero-chip': 'rgba(240, 240, 240, 0.35)',
  '--x-shape-a': POP[0], '--x-shape-b': face(RAY[4], RAY[0]),
  '--x-reply-bg': POP_WARM, '--x-reply-fg': HUE[2], '--x-reply-lip': '#c06a2c',
};
const POP_PAL = {
  light: {
    '--bg': RAY[2], '--paper': RAY[4], '--ink': HUE[2], '--ink-2': '#4a4a4a', '--ink-3': '#767676',
    '--line': '#cfcfcf', '--line-2': RAY[0], '--fill': RAY[3], '--accent': '#8732c1', '--accent-bg': RAY[1],
    '--head-bg': HUE[2], '--head-fg': RAY[4], ...STATUS.light, ...POP_COMMON,
    '--x-bg-paint': `radial-gradient(1000px 600px at 100% -10%, rgba(150, 67, 208, 0.08) 0%, transparent 60%), radial-gradient(900px 560px at -10% 105%, rgba(234, 197, 80, 0.10) 0%, transparent 60%), ${face(RAY[3], RAY[1], 180)}`,
    '--x-card-lip': RAY[0], '--x-card-hl': 'rgba(255, 255, 255, 0)', '--x-hero-lip': '#000000',
    '--x-item': RAY[2], '--x-item-hover': RAY[0], '--x-inset-paint': face(RAY[3], RAY[4], 180), '--x-high': RAY[1],
    '--x-chip-bg': RAY[2], '--x-chip-lip': RAY[0], '--x-chip-fg': '#4a4a4a', '--x-marker': '#8732c1',
    '--x-tb-bg': face(HUE[4], HUE[1], 180), '--x-tb-lip': '#000000', '--x-tb-fg': RAY[2],
    '--x-co-bg': face(RAY[3], RAY[1], 180), '--x-co-lip': RAY[0], '--x-co-fg': HUE[2], '--x-co-icon': POP[0], '--x-co-glyph': HUE[2],
    ...badges([[POP[0], HUE[2]], [face(HUE[4], HUE[0]), RAY[2]], [POP[2], '#ffffff'], [POP[3], HUE[2]], [POP[1], HUE[2]], [POP[4], HUE[2]]]),
    '--node-fill': RAY[1], '--node-stroke': RAY[1], '--node-text': HUE[2], '--node-shadow': 'drop-shadow(0 3px 0 #d4d4d4)',
    '--hi-fill': '#8732c1', '--hi-stroke': '#8732c1', '--hi-text': '#ffffff',
    '--edge-color': '#8a8a8a', '--edge-label': '#8732c1', '--actor-fill': HUE[2], '--actor-stroke': HUE[2], '--actor-text': RAY[2],
    '--note-fill': '#f3daff', '--note-stroke': '#f3daff', '--cluster-fill': RAY[2], '--cluster-stroke': RAY[2], '--lifeline-color': '#cfcfcf',
    '--series-1': '#8732c1', '--series-2': '#d05666', '--series-3': '#917400', '--series-4': '#196d22', '--series-5': '#e57358', '--series-6': '#5d52ce',
  },
  dark: {
    '--bg': HUE[0], '--paper': HUE[3], '--ink': RAY[2], '--ink-2': '#b5b5b5', '--ink-3': '#8a8a8a',
    '--line': '#3a3a3a', '--line-2': '#262626', '--fill': '#1f1f1f', '--accent': '#daa3ff', '--accent-bg': '#262626',
    '--head-bg': RAY[2], '--head-fg': HUE[2], ...STATUS.dark, ...POP_COMMON,
    '--x-bg-paint': `radial-gradient(1000px 600px at 100% -10%, rgba(150, 67, 208, 0.16) 0%, transparent 60%), radial-gradient(900px 560px at -10% 105%, rgba(229, 115, 88, 0.10) 0%, transparent 60%), ${HUE[0]}`,
    '--x-card-lip': '#000000', '--x-card-hl': 'rgba(255, 255, 255, 0.06)', '--x-hero-lip': '#000000',
    '--x-item': '#222222', '--x-item-hover': '#2c2c2c', '--x-inset-paint': face(HUE[1], HUE[0], 180), '--x-high': '#2c2c2c',
    '--x-chip-bg': '#222222', '--x-chip-lip': HUE[0], '--x-chip-fg': '#cfcfcf', '--x-marker': '#daa3ff',
    '--x-tb-bg': face(RAY[4], RAY[1], 180), '--x-tb-lip': '#9a9a9a', '--x-tb-fg': HUE[2],
    '--x-co-bg': face('#262626', HUE[4], 180), '--x-co-lip': HUE[0], '--x-co-fg': RAY[2], '--x-co-icon': POP[0], '--x-co-glyph': HUE[2],
    ...badges([[POP[0], HUE[2]], [face(RAY[4], RAY[0]), HUE[2]], [POP[2], '#ffffff'], [POP[3], HUE[2]], [POP[1], HUE[2]], [POP[4], HUE[2]]]),
    '--node-fill': '#2c2c2c', '--node-stroke': '#2c2c2c', '--node-text': RAY[2], '--node-shadow': 'drop-shadow(0 3px 0 #000000)',
    '--hi-fill': '#daa3ff', '--hi-stroke': '#daa3ff', '--hi-text': HUE[2],
    '--edge-color': '#8a8a8a', '--edge-label': '#daa3ff', '--actor-fill': RAY[2], '--actor-stroke': RAY[2], '--actor-text': HUE[2],
    '--note-fill': '#6d0aa7', '--note-stroke': '#6d0aa7', '--cluster-fill': '#1a1a1a', '--cluster-stroke': '#1a1a1a', '--lifeline-color': '#3a3a3a',
    '--series-1': '#daa3ff', '--series-2': '#f08a9a', '--series-3': '#f2d14b', '--series-4': '#62dca9', '--series-5': '#f5a56e', '--series-6': '#9e98ff',
  },
};

// One stylesheet for both themes; & is the Cobalt theme's root, and :is() adds the Pop theme's root.
const ROOT = ':is(&, html[data-theme="expressive-pop"])';

// Panel badges: the letter sits in an M3E shape (a different one per panel) and morphs to a circle when the panel is hovered.
const badgeCss = SHAPES.badge.map((b, i) => {
  const n = `${SHAPES.badge.length}n+${i + 1}`;
  return `& .am-panel:nth-of-type(${n}) .am-panel-id { clip-path: path("${b.from}"); background: var(--x-b${i + 1}); color: var(--x-b${i + 1}-fg); }
& .am-panel:nth-of-type(${n}):hover .am-panel-id { clip-path: path("${b.to}"); }
& .am-panel:nth-of-type(${n}) { transition-delay: ${i * 50}ms, ${i * 50}ms, 0s, 0s; }`;
}).join('\n');

const css = `& body { background: var(--x-bg-paint); background-color: var(--bg); font-family: ${GSF}; padding-block-end: 96px; }
& .am-sheet { padding-top: 16px; }

/* Hero: the main color as one large container, with two cropped shapes that morph on hover. */
& .am-head {
  position: relative; isolation: isolate; overflow: hidden; margin: 0 0 28px; min-height: 260px;
  padding: 28px 40px 40px; border-radius: 48px; background: var(--x-hero-paint); color: var(--x-hero-fg);
  box-shadow: 0 8px 0 var(--x-hero-lip);
}
& .am-head > * { max-width: min(68ch, calc(100% - 300px)); }
& .am-head::after, & .am-head::before { content: ""; position: absolute; z-index: -1; transition: clip-path ${ease(spatialSlow)}, rotate ${ease(spatialSlow)}; }
& .am-head::after {
  width: 320px; height: 320px; inset-inline-end: -48px; bottom: -96px; rotate: 8deg;
  background: var(--x-shape-a); clip-path: path("${SHAPES.heroA.from}");
}
& .am-head::before {
  width: 150px; height: 150px; inset-inline-end: 212px; bottom: 120px; rotate: -12deg;
  background: var(--x-shape-b); clip-path: path("${SHAPES.heroB.from}");
}
& .am-head:hover::after { clip-path: path("${SHAPES.heroA.to}"); rotate: 38deg; }
& .am-head:hover::before { clip-path: path("${SHAPES.heroB.to}"); rotate: 33deg; }
@starting-style { & .am-head::after { rotate: -40deg; } & .am-head::before { rotate: 60deg; } }
& .am-colophon { font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: var(--x-hero-fg2); margin-bottom: 20px; }
& .am-head h1 {
  font-family: ${GSF}; font-size: calc(clamp(40px, 5vw, 68px) * var(--am-scale, 1)); line-height: 1.06; font-weight: 680;
  font-variation-settings: "ROND" 100; letter-spacing: -0.02em; max-width: 18ch; width: fit-content;
  background: var(--x-hero-title); -webkit-background-clip: text; background-clip: text; color: transparent;
}
& .am-sub { margin-top: 14px; font-size: calc(22px * var(--am-scale, 1)); line-height: 1.35; font-weight: 450; color: var(--x-hero-fg2); }
& .am-head-meta { margin-top: 18px; gap: 8px; }
& .am-head-meta span {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border-radius: 8px;
  border: 1px solid var(--x-hero-chip); color: var(--x-hero-fg); font-size: calc(14px * var(--am-scale, 1)); font-weight: 500;
}
& .am-head-meta b { font-family: inherit; font-weight: 400; color: var(--x-hero-fg2); }
& .am-intro { margin-top: 20px; font-size: calc(19px * var(--am-scale, 1)); line-height: 1.5; color: var(--x-hero-fg); }
& .am-intro .am-md p { font-size: inherit; line-height: inherit; }

/* Floating toolbar, bottom center. */
& .am-toolbar {
  top: auto; bottom: 20px; inset-inline-end: auto; left: 50%; translate: -50% 0; gap: 4px; padding: 8px; border-radius: 9999px;
  background: var(--x-tb-bg); color: var(--x-tb-fg); box-shadow: 0 4px 0 var(--x-tb-lip), 0 12px 28px rgba(0, 0, 0, 0.22);
}
& body.am-has-reply-bar .am-toolbar { bottom: 88px; }
& .am-btn, & .am-pick {
  min-height: 40px; border: 0; border-radius: 9999px; background: transparent; color: var(--x-tb-fg);
  font: 600 calc(14px * var(--am-scale, 1)) / 20px ${GSF}; transition: border-radius ${ease(spatialFast)}, background-color ${ease(effectsDefault)};
}
& .am-btn { padding: 0 16px; white-space: nowrap; }
& .am-pick { padding-inline: 16px 8px; color: color-mix(in srgb, var(--x-tb-fg) 70%, transparent); }
& .am-pick select { font-weight: 600; color: var(--x-tb-fg); }
& .am-pick option { color: var(--ink); background: var(--paper); }
& .am-btn:hover, & .am-pick:hover { background: color-mix(in srgb, var(--x-tb-fg) 10%, transparent); }
& .am-btn:active { border-radius: 12px; }
/* The filled button stands on a lip in the darker step of its ramp, and presses down into it. */
& .am-toolbar .am-btn--reply, & .am-toolbar .am-btn--reply:hover {
  background: var(--x-reply-bg); color: var(--x-reply-fg); opacity: 1; box-shadow: 0 3px 0 var(--x-reply-lip);
  transition: border-radius ${ease(spatialFast)}, translate ${ease(spatialFast)}, box-shadow ${ease(spatialFast)};
}
& .am-toolbar .am-btn--reply:hover { box-shadow: 0 3px 0 var(--x-reply-lip), inset 0 0 0 40px color-mix(in srgb, var(--x-reply-fg) 8%, transparent); }
& .am-toolbar .am-btn--reply:active { translate: 0 2px; box-shadow: 0 1px 0 var(--x-reply-lip); }

/* Panels: cards on the tinted surface, no border or shadow. */
& .am-grid { gap: 22px 18px; }
& .am-panel {
  border: 0; border-radius: 28px; background: var(--paper); box-shadow: 0 6px 0 var(--x-card-lip), inset 0 1px 0 var(--x-card-hl);
  transition: opacity ${ease(effectsDefault)}, translate ${ease(spatialDefault)}, transform ${ease(spatialDefault)}, box-shadow ${ease(spatialDefault)};
}
/* Hover lifts the card and deepens its lip. */
& .am-panel:hover { transform: translateY(-3px); box-shadow: 0 9px 0 var(--x-card-lip), inset 0 1px 0 var(--x-card-hl); }
@starting-style { & .am-panel { opacity: 0; translate: 0 32px; } }
& .am-panel-head { border: 0; min-height: 0; align-items: center; gap: 14px; padding: 20px 16px 6px 20px; }
& .am-panel-id {
  width: 40px; height: 40px; min-width: 40px; padding: 0; margin: 0; align-self: center;
  font: 700 calc(16px * var(--am-scale, 1)) / 1 ${GSF}; font-variation-settings: "ROND" 100;
  transition: clip-path ${ease(spatialDefault)};
}
${badgeCss}
& .am-panel-head h2 { padding: 0; font-family: ${GSF}; font-size: calc(22px * var(--am-scale, 1)); line-height: 28px; font-weight: 600; letter-spacing: 0; }
& .am-panel-meta {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border-radius: 8px; border: 0;
  background: var(--x-chip-bg); box-shadow: 0 2px 0 var(--x-chip-lip);
  font: 500 calc(13px * var(--am-scale, 1)) / 1 ${GSF}; color: var(--x-chip-fg);
}
& .am-comment-btn { width: 40px; height: 40px; justify-content: center; align-items: center; margin-block: 0; border: 0; border-radius: 9999px; color: var(--ink-2); }
& .am-panel:hover .am-comment-btn, & .am-comment-btn:focus-visible, & .am-comment-btn[aria-expanded="true"] { border-color: transparent; background: color-mix(in srgb, var(--ink) 8%, transparent); }
& .am-panel .am-comment-btn.am-comment-btn--on { background: var(--x-high); color: var(--ink); }
& .am-panel-body { padding: 14px 20px 20px; }

/* Text */
& .am-md p, & .am-md li { font-size: calc(16px * var(--am-scale, 1)); line-height: 1.5; letter-spacing: 0.005em; }
& .am-md li::marker { color: var(--x-marker); font-weight: 700; }
& .am-md h3, & .am-md h4 { font-size: calc(16px * var(--am-scale, 1)); font-weight: 600; }
& .am-md a { color: var(--accent); text-underline-offset: 3px; }
& .am-md :not(pre) > code { background: var(--x-high); border-radius: 6px; padding: 2px 6px; }
& .am-md blockquote { border: 0; border-radius: 16px; background: var(--x-item); padding: 12px 16px; color: var(--ink); }

/* Tables: a connected group. Rows are items with small inner corners and a 2px gap; the group has large outer corners. */
& .am-md table { border-collapse: separate; border-spacing: 0 2px; font-size: calc(15px * var(--am-scale, 1)); }
& .am-md th { border: 0; padding: 4px 16px 8px; font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: var(--ink-2); }
& .am-md td, & .am-md tbody tr:nth-child(even) td { border: 0; background: var(--x-item); padding: 14px 16px; }
& .am-md td { transition: background-color ${ease(effectsDefault)}; }
& .am-md tbody tr:hover td { background: var(--x-item-hover); }
& .am-md tbody td:first-child { border-start-start-radius: 4px; border-end-start-radius: 4px; }
& .am-md tbody td:last-child { border-start-end-radius: 4px; border-end-end-radius: 4px; }
& .am-md tbody tr:first-child td:first-child { border-start-start-radius: 16px; }
& .am-md tbody tr:first-child td:last-child { border-start-end-radius: 16px; }
& .am-md tbody tr:last-child td:first-child { border-end-start-radius: 16px; }
& .am-md tbody tr:last-child td:last-child { border-end-end-radius: 16px; }
& .am-kv { border: 0; gap: 2px; border-radius: 16px; overflow: hidden; }
& .am-kv-cell { border: 0; border-radius: 4px; background: var(--x-item); padding: 12px 16px 14px; }
& .am-kv dt { font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: var(--ink-2); }
& .am-kv dd { font-size: calc(16px * var(--am-scale, 1)); font-weight: 600; }

/* Callouts: tonal containers with a leading M3E shape. */
& .am-callout {
  position: relative; border: 0; border-radius: 20px; padding: 16px 20px; padding-inline-start: 60px; box-shadow: 0 4px 0 var(--x-co-lip);
  background: var(--x-co-bg); color: var(--x-co-fg); --icon: var(--x-co-icon); --glyph-c: var(--x-co-glyph); --glyph: "i"; --shape: path("${SHAPES.callout.note}");
}
& .am-callout::before, & .am-callout::after { position: absolute; inset-inline-start: 18px; top: 14px; width: 28px; height: 28px; }
& .am-callout::before { content: ""; background: var(--icon); clip-path: var(--shape); }
& .am-callout::after { content: var(--glyph); display: grid; place-items: center; color: var(--glyph-c); font: 800 15px/1 ${GSF}; font-variation-settings: "ROND" 100; }
& .am-callout--ok { box-shadow: 0 4px 0 color-mix(in srgb, var(--ok) 35%, var(--ok-bg)); background: var(--ok-bg); color: var(--x-ok-on); --icon: var(--ok); --glyph-c: var(--ok-bg); --glyph: "\\2713"; --shape: path("${SHAPES.callout.ok}"); }
& .am-callout--warn { box-shadow: 0 4px 0 color-mix(in srgb, var(--warn) 35%, var(--warn-bg)); background: var(--warn-bg); color: var(--x-warn-on); --icon: var(--warn); --glyph-c: var(--warn-bg); --glyph: "!"; --shape: path("${SHAPES.callout.warn}"); }
& .am-callout--err { box-shadow: 0 4px 0 color-mix(in srgb, var(--err) 35%, var(--err-bg)); background: var(--err-bg); color: var(--x-err-on); --icon: var(--err); --glyph-c: var(--err-bg); --glyph: "\\00d7"; --shape: path("${SHAPES.callout.err}"); }
& .am-callout-title { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }

/* Diagrams sit in an inset container. */
& .am-panel-body > .am-diagram { background: var(--x-inset-paint); border-radius: 20px; padding: 16px 16px 20px; }
& .am-diagram-expand { border: 0; border-radius: 9999px; width: 40px; height: 40px; background: var(--paper); box-shadow: 0 2px 0 var(--x-card-lip); }

/* Code */
& .am-code { border: 0; border-radius: 16px; background: var(--x-item); }
& .am-codeblock .am-code { border-radius: 0 0 16px 16px; }
& .am-code-head { border: 0; border-radius: 16px 16px 0 0; background: var(--x-high); }
& .am-code-copy { border: 0; border-radius: 9999px; padding: 6px 12px; background: var(--x-tb-bg); color: var(--x-tb-fg); box-shadow: 0 2px 0 var(--x-tb-lip); font-family: ${GSF}; font-weight: 600; transition: border-radius ${ease(spatialFast)}, translate ${ease(spatialFast)}, box-shadow ${ease(spatialFast)}; }
& .am-code-copy:hover { color: var(--x-tb-fg); }
& .am-code-copy:active { border-radius: 8px; translate: 0 2px; box-shadow: 0 0 0 var(--x-tb-lip); }

/* Ask */
& .am-ask { border: 0; border-radius: 20px; background: var(--x-item); padding: 16px 20px 12px; box-shadow: 0 4px 0 var(--x-chip-lip); }
& .am-ask-q { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }
& .am-ask-tag { border: 0; border-radius: 8px; padding: 1px 8px; background: var(--x-reply-bg); color: var(--x-reply-fg); box-shadow: 0 2px 0 var(--x-reply-lip); font-weight: 600; }

/* Timeline */
& .am-tl-when { font-family: ${GSF}; font-weight: 650; color: var(--x-marker); font-variation-settings: "ROND" 100; }
& .am-tl-dot { background: var(--x-marker); border-color: var(--x-marker); }
& .am-tl-title { font-size: calc(15px * var(--am-scale, 1)); font-weight: 600; }

@media (max-width: 760px) {
  & .am-head { padding: 24px 22px 28px; border-radius: 32px; min-height: 0; }
  & .am-head > * { max-width: 100%; }
  & .am-colophon { max-width: calc(100% - 96px); }
  & .am-head::after { scale: 0.42; transform-origin: 100% 0; bottom: auto; top: -40px; inset-inline-end: -40px; }
  & .am-head::before { display: none; }
  & .am-toolbar { bottom: 12px; left: 12px; right: 12px; translate: none; max-width: none; padding: 6px; }
  & .am-pick { font-size: 0; padding-inline: 12px 6px; }
  & .am-pick select { font-size: 14px; }
  & .am-btn { padding: 0 12px; }
}
@media (prefers-reduced-motion: reduce) {
  & .am-head::after, & .am-head::before, & .am-panel, & .am-panel-id, & .am-btn, & .am-pick, & .am-code-copy, & .am-toolbar .am-btn--reply, & .am-md td { transition: none; }
  & .am-panel:hover { transform: none; }
}`.replace(/&/g, ROOT);

const COMMON = {
  '--font-sans': SANS, '--font-mono': MONO, '--radius': '16px', '--shadow': 'none', '--bw': '0px', '--head-font': GSF,
  '--node-width': '0px', '--node-radius': '12px', '--node-shadow': 'none', '--edge-width': '1.6', '--note-width': '0px', '--note-radius': '8px',
};

export const pop = {
  name: 'expressive-pop',
  summary: 'Material 3 Expressive, Hue / Pop / Ray',
  label: { zh: '表现力 Pop', 'zh-Hant': '表現力 Pop', en: 'Expressive Pop', ja: 'エクスプレッシブ Pop', he: 'אקספרסיבי Pop' }, // lang-ok: viewer-facing theme labels
  scope: ['page'],
  font: 'google-sans-flex',
  tokens: { common: COMMON, light: POP_PAL.light, dark: POP_PAL.dark },
};

export default {
  name: 'expressive',
  summary: 'Material 3 Expressive, Cobalt / Lime / Periwinkle',
  label: { zh: '表现力 Cobalt', 'zh-Hant': '表現力 Cobalt', en: 'Expressive Cobalt', ja: 'エクスプレッシブ Cobalt', he: 'אקספרסיבי Cobalt' }, // lang-ok: viewer-facing theme labels
  scope: ['page'],
  font: 'google-sans-flex',
  tokens: { common: COMMON, light: COBALT.light, dark: COBALT.dark },
  css,
};
