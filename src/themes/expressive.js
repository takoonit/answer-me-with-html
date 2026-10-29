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
const STATUS = {
  light: { '--ok': '#006c4b', '--ok-bg': '#80f9c4', '--x-ok-on': '#002114', '--warn': '#8b5000', '--warn-bg': '#ffdcbe', '--x-warn-on': '#2d1600', '--err': '#b51f47', '--err-bg': '#ffd9dc', '--x-err-on': '#400011' },
  dark: { '--ok': '#62dca9', '--ok-bg': '#005138', '--x-ok-on': '#80f9c4', '--warn': '#ffb871', '--warn-bg': '#6a3c00', '--x-warn-on': '#ffdcbe', '--err': '#ffb2bb', '--err-bg': '#910032', '--x-err-on': '#ffd9dc' },
};

// Six panel badges: background and letter color.
const badges = (list) => Object.fromEntries(list.flatMap(([bg, fg], i) => [[`--x-b${i + 1}`, bg], [`--x-b${i + 1}-fg`, fg]]));

// ── Cobalt: Deep Cobalt #2B438D (main), Lime Spark #E8FD94 (accent), Stellar Periwinkle #94ADFF (complementary) ──
const COBALT = {
  light: {
    '--bg': '#e3e7ff', '--paper': '#ffffff', '--ink': '#090e32', '--ink-2': '#2b438d', '--ink-3': '#456bd1',
    '--line': '#94adff', '--line-2': '#d4deff', '--fill': '#f2f5ff', '--accent': '#2b438d', '--accent-bg': '#d4deff',
    '--head-bg': '#2b438d', '--head-fg': '#e8fd94', ...STATUS.light,
    '--x-item': '#f2f5ff', '--x-inset': '#f2f5ff', '--x-high': '#d4deff', '--x-chip-line': '#94adff', '--x-chip-fg': '#2b438d', '--x-marker': '#2b438d',
    '--x-hero-bg': '#2b438d', '--x-hero-title': '#e8fd94', '--x-hero-fg': '#f2f5ff', '--x-hero-fg2': '#d4deff', '--x-hero-chip': 'rgba(212, 222, 255, 0.5)',
    '--x-shape-a': '#94adff', '--x-shape-b': '#e8fd94',
    '--x-tb-bg': '#172458', '--x-tb-fg': '#d4deff', '--x-reply-bg': '#e8fd94', '--x-reply-fg': '#090e32',
    '--x-co-bg': '#d4deff', '--x-co-fg': '#090e32', '--x-co-icon': '#2b438d', '--x-co-glyph': '#e8fd94',
    ...badges([['#2b438d', '#e8fd94'], ['#e8fd94', '#172458'], ['#94adff', '#090e32'], ['#172458', '#94adff'], ['#d4deff', '#2b438d'], ['#3f6cff', '#ffffff']]),
    '--node-fill': '#d4deff', '--node-stroke': '#d4deff', '--node-text': '#090e32', '--hi-fill': '#2b438d', '--hi-stroke': '#2b438d', '--hi-text': '#e8fd94',
    '--edge-color': '#6287ff', '--edge-label': '#2b438d', '--actor-fill': '#172458', '--actor-stroke': '#172458', '--actor-text': '#f2f5ff',
    '--note-fill': '#e8fd94', '--note-stroke': '#e8fd94', '--cluster-fill': '#e3e7ff', '--cluster-stroke': '#e3e7ff', '--lifeline-color': '#94adff',
    '--series-1': '#2b438d', '--series-2': '#3f6cff', '--series-3': '#617218', '--series-4': '#8b5000', '--series-5': '#006c4b', '--series-6': '#b51f47',
  },
  dark: {
    '--bg': '#090e32', '--paper': '#172458', '--ink': '#f2f5ff', '--ink-2': '#94adff', '--ink-3': '#6287ff',
    '--line': '#456bd1', '--line-2': '#2b438d', '--fill': '#213471', '--accent': '#94adff', '--accent-bg': '#2b438d',
    '--head-bg': '#94adff', '--head-fg': '#090e32', ...STATUS.dark,
    '--x-item': '#213471', '--x-inset': '#0f1840', '--x-high': '#2b438d', '--x-chip-line': '#456bd1', '--x-chip-fg': '#d4deff', '--x-marker': '#94adff',
    '--x-hero-bg': '#2b438d', '--x-hero-title': '#e8fd94', '--x-hero-fg': '#f2f5ff', '--x-hero-fg2': '#d4deff', '--x-hero-chip': 'rgba(212, 222, 255, 0.5)',
    '--x-shape-a': '#94adff', '--x-shape-b': '#e8fd94',
    '--x-tb-bg': '#2b438d', '--x-tb-fg': '#f2f5ff', '--x-reply-bg': '#e8fd94', '--x-reply-fg': '#090e32',
    '--x-co-bg': '#2b438d', '--x-co-fg': '#f2f5ff', '--x-co-icon': '#e8fd94', '--x-co-glyph': '#2b438d',
    ...badges([['#94adff', '#090e32'], ['#e8fd94', '#172458'], ['#6287ff', '#090e32'], ['#d4deff', '#172458'], ['#3f6cff', '#ffffff'], ['#e8fd94', '#172458']]),
    '--node-fill': '#2b438d', '--node-stroke': '#2b438d', '--node-text': '#f2f5ff', '--hi-fill': '#e8fd94', '--hi-stroke': '#e8fd94', '--hi-text': '#090e32',
    '--edge-color': '#6287ff', '--edge-label': '#94adff', '--actor-fill': '#94adff', '--actor-stroke': '#94adff', '--actor-text': '#090e32',
    '--note-fill': '#3f4c00', '--note-stroke': '#3f4c00', '--cluster-fill': '#0f1840', '--cluster-stroke': '#0f1840', '--lifeline-color': '#456bd1',
    '--series-1': '#94adff', '--series-2': '#e8fd94', '--series-3': '#6287ff', '--series-4': '#ffb871', '--series-5': '#62dca9', '--series-6': '#ffb2bb',
  },
};

// ── Pop: Hue (near black, main), Pop (gradient, accent), Ray (light gray, complementary). Colors sampled from the posts. ──
const POP = 'linear-gradient(115deg, #9643d0 0%, #d05666 38%, #e57358 55%, #f0a265 75%, #eac550 100%)';
const POP_TEXT = 'linear-gradient(100deg, #c27bff 0%, #f06a8a 40%, #f59a5e 70%, #f2d14b 100%)';
const POP_WARM = 'linear-gradient(115deg, #e57358 0%, #f0a265 55%, #f2c94f 100%)';
const POP_COOL = 'linear-gradient(135deg, #9643d0 0%, #d05666 100%)';
const POP_PAL = {
  light: {
    '--bg': '#f0f0f0', '--paper': '#fdfdfd', '--ink': '#0f0f0f', '--ink-2': '#4a4a4a', '--ink-3': '#767676',
    '--line': '#cfcfcf', '--line-2': '#e4e4e4', '--fill': '#f9f9f9', '--accent': '#8732c1', '--accent-bg': '#e9e9e9',
    '--head-bg': '#0f0f0f', '--head-fg': '#fdfdfd', ...STATUS.light,
    '--x-item': '#f0f0f0', '--x-inset': '#f6f6f6', '--x-high': '#e9e9e9', '--x-chip-line': '#cfcfcf', '--x-chip-fg': '#4a4a4a', '--x-marker': '#8732c1',
    '--x-hero-bg': '#0f0f0f', '--x-hero-title': POP_TEXT, '--x-hero-fg': '#f0f0f0', '--x-hero-fg2': '#bdbdbd', '--x-hero-chip': 'rgba(240, 240, 240, 0.35)',
    '--x-shape-a': POP, '--x-shape-b': '#f0f0f0',
    '--x-tb-bg': '#0f0f0f', '--x-tb-fg': '#f0f0f0', '--x-reply-bg': POP_WARM, '--x-reply-fg': '#0f0f0f',
    '--x-co-bg': '#e9e9e9', '--x-co-fg': '#0f0f0f', '--x-co-icon': POP, '--x-co-glyph': '#0f0f0f',
    ...badges([[POP, '#0f0f0f'], ['#0f0f0f', '#f0f0f0'], [POP_WARM, '#0f0f0f'], ['#e4e4e4', '#0f0f0f'], [POP_COOL, '#ffffff'], ['#0f0f0f', '#f0f0f0']]),
    '--node-fill': '#e9e9e9', '--node-stroke': '#e9e9e9', '--node-text': '#0f0f0f', '--hi-fill': '#8732c1', '--hi-stroke': '#8732c1', '--hi-text': '#ffffff',
    '--edge-color': '#8a8a8a', '--edge-label': '#8732c1', '--actor-fill': '#0f0f0f', '--actor-stroke': '#0f0f0f', '--actor-text': '#f0f0f0',
    '--note-fill': '#f3daff', '--note-stroke': '#f3daff', '--cluster-fill': '#f0f0f0', '--cluster-stroke': '#f0f0f0', '--lifeline-color': '#cfcfcf',
    '--series-1': '#8732c1', '--series-2': '#d05666', '--series-3': '#917400', '--series-4': '#196d22', '--series-5': '#e57358', '--series-6': '#5d52ce',
  },
  dark: {
    '--bg': '#080808', '--paper': '#141414', '--ink': '#f0f0f0', '--ink-2': '#b5b5b5', '--ink-3': '#8a8a8a',
    '--line': '#3a3a3a', '--line-2': '#262626', '--fill': '#1f1f1f', '--accent': '#daa3ff', '--accent-bg': '#262626',
    '--head-bg': '#f0f0f0', '--head-fg': '#0f0f0f', ...STATUS.dark,
    '--x-item': '#222222', '--x-inset': '#0d0d0d', '--x-high': '#2c2c2c', '--x-chip-line': '#3a3a3a', '--x-chip-fg': '#cfcfcf', '--x-marker': '#daa3ff',
    '--x-hero-bg': '#1f1f1f', '--x-hero-title': POP_TEXT, '--x-hero-fg': '#f0f0f0', '--x-hero-fg2': '#bdbdbd', '--x-hero-chip': 'rgba(240, 240, 240, 0.35)',
    '--x-shape-a': POP, '--x-shape-b': '#f0f0f0',
    '--x-tb-bg': '#f0f0f0', '--x-tb-fg': '#0f0f0f', '--x-reply-bg': POP_WARM, '--x-reply-fg': '#0f0f0f',
    '--x-co-bg': '#262626', '--x-co-fg': '#f0f0f0', '--x-co-icon': POP, '--x-co-glyph': '#0f0f0f',
    ...badges([[POP, '#0f0f0f'], ['#f0f0f0', '#0f0f0f'], [POP_WARM, '#0f0f0f'], ['#3a3a3a', '#f0f0f0'], [POP_COOL, '#ffffff'], ['#f0f0f0', '#0f0f0f']]),
    '--node-fill': '#2c2c2c', '--node-stroke': '#2c2c2c', '--node-text': '#f0f0f0', '--hi-fill': '#daa3ff', '--hi-stroke': '#daa3ff', '--hi-text': '#0f0f0f',
    '--edge-color': '#8a8a8a', '--edge-label': '#daa3ff', '--actor-fill': '#f0f0f0', '--actor-stroke': '#f0f0f0', '--actor-text': '#0f0f0f',
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
& .am-panel:nth-of-type(${n}) { transition-delay: ${i * 50}ms; }`;
}).join('\n');

const css = `& body { background: var(--bg); font-family: ${GSF}; padding-block-end: 96px; }
& .am-sheet { padding-top: 16px; }

/* Hero: the main color as one large container, with two cropped shapes that morph on hover. */
& .am-head {
  position: relative; isolation: isolate; overflow: hidden; margin: 0 0 16px; min-height: 260px;
  padding: 28px 40px 40px; border-radius: 48px; background: var(--x-hero-bg); color: var(--x-hero-fg);
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
  background: var(--x-tb-bg); color: var(--x-tb-fg); box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3), 0 6px 10px 4px rgba(0, 0, 0, 0.15);
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
& .am-toolbar .am-btn--reply, & .am-toolbar .am-btn--reply:hover { background: var(--x-reply-bg); color: var(--x-reply-fg); opacity: 1; }
& .am-toolbar .am-btn--reply:hover { box-shadow: inset 0 0 0 40px color-mix(in srgb, var(--x-reply-fg) 8%, transparent); }

/* Panels: cards on the tinted surface, no border or shadow. */
& .am-grid { gap: 16px; }
& .am-panel {
  border: 0; border-radius: 28px; background: var(--paper); box-shadow: none;
  transition: opacity ${ease(effectsDefault)}, translate ${ease(spatialDefault)};
}
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
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border-radius: 8px; border: 1px solid var(--x-chip-line);
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
  position: relative; border: 0; border-radius: 20px; padding: 16px 20px; padding-inline-start: 60px;
  background: var(--x-co-bg); color: var(--x-co-fg); --icon: var(--x-co-icon); --glyph-c: var(--x-co-glyph); --glyph: "i"; --shape: path("${SHAPES.callout.note}");
}
& .am-callout::before, & .am-callout::after { position: absolute; inset-inline-start: 18px; top: 14px; width: 28px; height: 28px; }
& .am-callout::before { content: ""; background: var(--icon); clip-path: var(--shape); }
& .am-callout::after { content: var(--glyph); display: grid; place-items: center; color: var(--glyph-c); font: 800 15px/1 ${GSF}; font-variation-settings: "ROND" 100; }
& .am-callout--ok { background: var(--ok-bg); color: var(--x-ok-on); --icon: var(--ok); --glyph-c: var(--ok-bg); --glyph: "\\2713"; --shape: path("${SHAPES.callout.ok}"); }
& .am-callout--warn { background: var(--warn-bg); color: var(--x-warn-on); --icon: var(--warn); --glyph-c: var(--warn-bg); --glyph: "!"; --shape: path("${SHAPES.callout.warn}"); }
& .am-callout--err { background: var(--err-bg); color: var(--x-err-on); --icon: var(--err); --glyph-c: var(--err-bg); --glyph: "\\00d7"; --shape: path("${SHAPES.callout.err}"); }
& .am-callout-title { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }

/* Diagrams sit in an inset container. */
& .am-panel-body > .am-diagram { background: var(--x-inset); border-radius: 20px; padding: 16px; }
& .am-diagram-expand { border: 0; border-radius: 9999px; width: 40px; height: 40px; background: var(--paper); }

/* Code */
& .am-code { border: 0; border-radius: 16px; background: var(--x-item); }
& .am-codeblock .am-code { border-radius: 0 0 16px 16px; }
& .am-code-head { border: 0; border-radius: 16px 16px 0 0; background: var(--x-high); }
& .am-code-copy { border: 0; border-radius: 9999px; padding: 6px 12px; background: var(--x-tb-bg); color: var(--x-tb-fg); font-family: ${GSF}; font-weight: 600; transition: border-radius ${ease(spatialFast)}; }
& .am-code-copy:hover { color: var(--x-tb-fg); }
& .am-code-copy:active { border-radius: 8px; }

/* Ask */
& .am-ask { border: 0; border-radius: 20px; background: var(--x-item); padding: 16px 20px 12px; }
& .am-ask-q { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }
& .am-ask-tag { border: 0; border-radius: 8px; padding: 1px 8px; background: var(--x-reply-bg); color: var(--x-reply-fg); font-weight: 600; }

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
  & .am-head::after, & .am-head::before, & .am-panel, & .am-panel-id, & .am-btn, & .am-pick, & .am-code-copy { transition: none; }
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
