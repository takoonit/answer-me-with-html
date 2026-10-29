// Expressive: Material 3 Expressive. One color scheme generated from the brand blue (2025 color spec), tonal containers in place
// of borders and shadows, connected list groups for tables, the M3E shape library with shape morphing, the expressive spring
// motion scheme, and Google Sans Flex (embedded) for text outside diagrams. Diagrams keep --font-sans: their text widths are
// estimated for it (svg/text.js). The scheme, shapes and springs are generated data (expressive-data.js).
import { SANS, MONO } from './fonts.js';
import { SCHEME, CUSTOM, MOTION, SHAPES } from './expressive-data.js';

const GSF = `"Google Sans Flex", ${SANS}`;
const ease = (m) => `${m.ms}ms ${m.easing}`;
const { spatialFast, spatialDefault, spatialSlow, effectsDefault } = MOTION;

// The M3 color roles this theme reads, by mode.
function roles(s, mode) {
  const c = (k) => CUSTOM[k][mode];
  return {
    '--m-p': s.primary, '--m-op': s.onPrimary, '--m-pc': s.primaryContainer, '--m-opc': s.onPrimaryContainer,
    '--m-sc': s.secondaryContainer, '--m-osc': s.onSecondaryContainer,
    '--m-tc': s.tertiaryContainer, '--m-otc': s.onTertiaryContainer,
    '--m-osv': s.onSurfaceVariant, '--m-ov': s.outlineVariant,
    // Items of a connected group, on a card.
    '--m-item': mode === 'light' ? s.surfaceContainerLow : s.surfaceContainerHighest,
    '--m-inset': mode === 'light' ? s.surfaceContainerLow : s.surface,
    '--m-high': s.surfaceContainerHigh,
    '--m-ok-c': c('ok').c, '--m-ok-on': c('ok').on, '--m-warn-c': c('warn').c, '--m-warn-on': c('warn').on, '--m-err-c': c('err').c, '--m-err-on': c('err').on,
  };
}

function tokens(mode) {
  const s = SCHEME[mode];
  const c = (k) => CUSTOM[k][mode];
  const light = mode === 'light';
  return {
    '--bg': light ? s.surfaceContainer : s.surface, '--paper': light ? s.surfaceContainerLowest : s.surfaceContainer,
    '--ink': s.onSurface, '--ink-2': s.onSurfaceVariant, '--ink-3': s.outline,
    '--line': s.outlineVariant, '--line-2': s.surfaceContainerHigh, '--fill': light ? s.surfaceContainerLow : s.surfaceContainerHigh,
    '--accent': s.primary, '--accent-bg': s.secondaryContainer,
    '--ok': c('ok').c, '--ok-bg': c('ok').bg, '--err': c('err').c, '--err-bg': c('err').bg,
    '--warn': c('warn').c, '--warn-bg': c('warn').bg, '--head-bg': s.primary, '--head-fg': s.onPrimary,
    '--node-fill': light ? s.surfaceContainerHigh : s.surfaceContainerHighest, '--node-stroke': light ? s.surfaceContainerHigh : s.surfaceContainerHighest, '--node-text': s.onSurface,
    '--hi-fill': s.primary, '--hi-stroke': s.primary, '--hi-text': s.onPrimary,
    '--edge-color': s.outline, '--edge-label': s.primary,
    '--actor-fill': s.secondaryContainer, '--actor-stroke': s.secondaryContainer, '--actor-text': s.onSecondaryContainer,
    // The 2025 tertiary container is light in both modes; dark notes take a dark tertiary tone so their light text stays readable.
    '--note-fill': light ? s.tertiaryContainer : s.onTertiary, '--note-stroke': light ? s.tertiaryContainer : s.onTertiary,
    '--cluster-fill': light ? s.surfaceContainer : s.surfaceContainerLow, '--cluster-stroke': light ? s.surfaceContainer : s.surfaceContainerLow,
    '--lifeline-color': s.outlineVariant,
    '--series-1': s.primary, '--series-2': s.tertiary, '--series-3': c('ok').c, '--series-4': c('warn').c, '--series-5': s.secondary, '--series-6': s.error,
    ...roles(s, mode),
  };
}

// Panel badges: the letter sits in an M3E shape (a different one per panel) and morphs to a circle when the panel is hovered.
const BADGE_COLORS = [['--m-p', '--m-op'], ['--m-tc', '--m-otc'], ['--m-sc', '--m-osc'], ['--m-pc', '--m-opc'], ['--m-tc', '--m-otc'], ['--m-sc', '--m-osc']];
const badges = SHAPES.badge.map((b, i) => {
  const n = `${SHAPES.badge.length}n+${i + 1}`;
  const [bg, fg] = BADGE_COLORS[i];
  return `& .am-panel:nth-of-type(${n}) .am-panel-id { clip-path: path("${b.from}"); background: var(${bg}); color: var(${fg}); }
& .am-panel:nth-of-type(${n}):hover .am-panel-id { clip-path: path("${b.to}"); }
& .am-panel:nth-of-type(${n}) { transition-delay: ${Math.min(i, 5) * 50}ms; }`;
}).join('\n');

const css = `& body { background: var(--bg); font-family: ${GSF}; padding-block-end: 96px; }
& .am-sheet { padding-top: 16px; }

/* Hero: the header is one primary container with two cropped shapes that morph on hover. */
& .am-head {
  position: relative; isolation: isolate; overflow: hidden; margin: 0 0 16px; min-height: 260px;
  padding: 28px 40px 40px; border-radius: 48px; background: var(--m-pc); color: var(--m-opc);
}
& .am-head > * { max-width: min(68ch, calc(100% - 300px)); }
& .am-head::after, & .am-head::before { content: ""; position: absolute; z-index: -1; transition: clip-path ${ease(spatialSlow)}, rotate ${ease(spatialSlow)}; }
& .am-head::after {
  width: 320px; height: 320px; inset-inline-end: -48px; bottom: -96px; rotate: 8deg;
  background: ${SCHEME.light.primary}; clip-path: path("${SHAPES.heroA.from}");
}
& .am-head::before {
  width: 150px; height: 150px; inset-inline-end: 212px; bottom: 120px; rotate: -12deg;
  background: ${SCHEME.light.tertiaryContainer}; clip-path: path("${SHAPES.heroB.from}");
}
& .am-head:hover::after { clip-path: path("${SHAPES.heroA.to}"); rotate: 38deg; }
& .am-head:hover::before { clip-path: path("${SHAPES.heroB.to}"); rotate: 33deg; }
@starting-style { & .am-head::after { rotate: -40deg; } & .am-head::before { rotate: 60deg; } }
& .am-colophon { font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: inherit; opacity: 0.78; margin-bottom: 20px; }
& .am-head h1 {
  font-family: ${GSF}; font-size: calc(clamp(40px, 5vw, 68px) * var(--am-scale, 1)); line-height: 1.06; font-weight: 640;
  font-variation-settings: "ROND" 100; letter-spacing: -0.02em; color: var(--m-opc); max-width: 18ch;
}
& .am-sub { margin-top: 14px; font-size: calc(22px * var(--am-scale, 1)); line-height: 1.35; font-weight: 450; color: var(--m-opc); }
& .am-head-meta { margin-top: 18px; gap: 8px; }
& .am-head-meta span {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border-radius: 8px;
  border: 1px solid color-mix(in srgb, var(--m-opc) 45%, transparent); color: var(--m-opc); font-size: calc(14px * var(--am-scale, 1)); font-weight: 500;
}
& .am-head-meta b { font-family: inherit; font-weight: 400; color: inherit; opacity: 0.75; }
& .am-intro { margin-top: 20px; font-size: calc(19px * var(--am-scale, 1)); line-height: 1.5; color: var(--m-opc); }
& .am-intro .am-md p { font-size: inherit; line-height: inherit; }

/* Floating toolbar (vibrant), bottom center. */
& .am-toolbar {
  top: auto; bottom: 20px; inset-inline-end: auto; left: 50%; translate: -50% 0; gap: 4px; padding: 8px; border-radius: 9999px;
  background: var(--m-pc); color: var(--m-opc); box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3), 0 6px 10px 4px rgba(0, 0, 0, 0.15);
}
& body.am-has-reply-bar .am-toolbar { bottom: 88px; }
& .am-btn, & .am-pick {
  min-height: 40px; border: 0; border-radius: 9999px; background: transparent; color: var(--m-opc);
  font: 600 calc(14px * var(--am-scale, 1)) / 20px ${GSF}; transition: border-radius ${ease(spatialFast)}, background-color ${ease(effectsDefault)};
}
& .am-btn { padding: 0 16px; }
& .am-pick { padding-inline: 16px 8px; color: color-mix(in srgb, var(--m-opc) 75%, transparent); }
& .am-pick select { font-weight: 600; color: var(--m-opc); }
& .am-btn:hover, & .am-pick:hover { background: color-mix(in srgb, var(--m-opc) 8%, transparent); }
& .am-btn:active { border-radius: 12px; }
/* The toolbar container is a fixed color in both modes, so its filled button uses the light primary in both. */
& .am-toolbar .am-btn--reply { background: ${SCHEME.light.primary}; color: ${SCHEME.light.onPrimary}; }
& .am-toolbar .am-btn--reply:hover { background: color-mix(in srgb, ${SCHEME.light.onPrimary} 8%, ${SCHEME.light.primary}); opacity: 1; }

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
${badges}
& .am-panel-head h2 { padding: 0; font-family: ${GSF}; font-size: calc(22px * var(--am-scale, 1)); line-height: 28px; font-weight: 600; letter-spacing: 0; }
& .am-panel-meta {
  display: inline-flex; align-items: center; min-height: 32px; padding: 0 12px; border-radius: 8px; border: 1px solid var(--m-ov);
  font: 500 calc(13px * var(--am-scale, 1)) / 1 ${GSF}; color: var(--m-osv);
}
& .am-comment-btn { width: 40px; height: 40px; justify-content: center; align-items: center; margin-block: 0; border: 0; border-radius: 9999px; color: var(--m-osv); }
& .am-panel:hover .am-comment-btn, & .am-comment-btn:focus-visible, & .am-comment-btn[aria-expanded="true"] { border-color: transparent; background: color-mix(in srgb, var(--ink) 8%, transparent); }
& .am-panel .am-comment-btn.am-comment-btn--on { background: var(--m-sc); color: var(--m-osc); }
& .am-panel-body { padding: 14px 20px 20px; }

/* Text */
& .am-md p, & .am-md li { font-size: calc(16px * var(--am-scale, 1)); line-height: 1.5; letter-spacing: 0.005em; }
& .am-md li::marker { color: var(--m-p); font-weight: 700; }
& .am-md h3, & .am-md h4 { font-size: calc(16px * var(--am-scale, 1)); font-weight: 600; }
& .am-md a { color: var(--m-p); text-underline-offset: 3px; }
& .am-md :not(pre) > code { background: var(--m-high); border-radius: 6px; padding: 2px 6px; }
& .am-md blockquote { border: 0; border-radius: 16px; background: var(--m-item); padding: 12px 16px; color: var(--ink); }

/* Tables: a connected group. Rows are items with small inner corners and a 2px gap; the group has large outer corners. */
& .am-md table { border-collapse: separate; border-spacing: 0 2px; font-size: calc(15px * var(--am-scale, 1)); }
& .am-md th { border: 0; padding: 4px 16px 8px; font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: var(--m-osv); }
& .am-md td, & .am-md tbody tr:nth-child(even) td { border: 0; background: var(--m-item); padding: 14px 16px; }
& .am-md tbody td:first-child { border-start-start-radius: 4px; border-end-start-radius: 4px; }
& .am-md tbody td:last-child { border-start-end-radius: 4px; border-end-end-radius: 4px; }
& .am-md tbody tr:first-child td:first-child { border-start-start-radius: 16px; }
& .am-md tbody tr:first-child td:last-child { border-start-end-radius: 16px; }
& .am-md tbody tr:last-child td:first-child { border-end-start-radius: 16px; }
& .am-md tbody tr:last-child td:last-child { border-end-end-radius: 16px; }
& .am-kv { border: 0; gap: 2px; border-radius: 16px; overflow: hidden; }
& .am-kv-cell { border: 0; border-radius: 4px; background: var(--m-item); padding: 12px 16px 14px; }
& .am-kv dt { font: 500 calc(12px * var(--am-scale, 1)) / 16px ${GSF}; letter-spacing: 0.04em; color: var(--m-osv); }
& .am-kv dd { font-size: calc(16px * var(--am-scale, 1)); font-weight: 600; }

/* Callouts: tonal containers with a leading M3E shape. */
& .am-callout {
  position: relative; border: 0; border-radius: 20px; padding: 16px 20px; padding-inline-start: 60px;
  background: var(--m-sc); color: var(--m-osc); --icon: var(--m-p); --glyph: "i"; --shape: path("${SHAPES.callout.note}");
}
& .am-callout::before, & .am-callout::after { position: absolute; inset-inline-start: 18px; top: 14px; width: 28px; height: 28px; }
& .am-callout::before { content: ""; background: var(--icon); clip-path: var(--shape); }
& .am-callout::after {
  content: var(--glyph); display: grid; place-items: center; color: var(--cbg, var(--m-sc));
  font: 800 15px/1 ${GSF}; font-variation-settings: "ROND" 100;
}
& .am-callout--ok { background: var(--ok-bg); --cbg: var(--ok-bg); color: var(--m-ok-on); --icon: var(--m-ok-c); --glyph: "\\2713"; --shape: path("${SHAPES.callout.ok}"); }
& .am-callout--warn { background: var(--warn-bg); --cbg: var(--warn-bg); color: var(--m-warn-on); --icon: var(--m-warn-c); --glyph: "!"; --shape: path("${SHAPES.callout.warn}"); }
& .am-callout--err { background: var(--err-bg); --cbg: var(--err-bg); color: var(--m-err-on); --icon: var(--m-err-c); --glyph: "\\00d7"; --shape: path("${SHAPES.callout.err}"); }
& .am-callout-title { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }

/* Diagrams sit in an inset container. */
& .am-panel-body > .am-diagram, & .am-panel-body > figure.am-diagram { background: var(--m-inset); border-radius: 20px; padding: 16px; }
& .am-diagram-expand { border: 0; border-radius: 9999px; width: 40px; height: 40px; background: var(--paper); }

/* Code */
& .am-code { border: 0; border-radius: 16px; background: var(--m-item); }
& .am-codeblock .am-code { border-radius: 0 0 16px 16px; }
& .am-code-head { border: 0; border-radius: 16px 16px 0 0; background: var(--m-high); }
& .am-code-copy { border: 0; border-radius: 9999px; padding: 6px 12px; background: var(--m-sc); color: var(--m-osc); font-family: ${GSF}; font-weight: 600; transition: border-radius ${ease(spatialFast)}; }
& .am-code-copy:active { border-radius: 8px; }

/* Ask */
& .am-ask { border: 0; border-radius: 20px; background: var(--m-item); padding: 16px 20px 12px; }
& .am-ask-q { font-size: calc(16px * var(--am-scale, 1)); font-weight: 650; }
& .am-ask-tag { border: 0; border-radius: 8px; padding: 1px 8px; background: var(--m-tc); color: var(--m-otc); font-weight: 600; }

/* Timeline */
& .am-tl-when { font-family: ${GSF}; font-weight: 650; color: var(--m-p); font-variation-settings: "ROND" 100; }
& .am-tl-dot { background: var(--m-p); border-color: var(--m-p); }
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
}`;

export default {
  name: 'expressive',
  summary: 'Material 3 Expressive',
  label: { zh: '表现力', 'zh-Hant': '表現力', en: 'Expressive', ja: 'エクスプレッシブ', he: 'אקספרסיבי' }, // lang-ok: viewer-facing theme labels
  scope: ['page'],
  font: 'google-sans-flex',
  tokens: {
    common: { '--font-sans': SANS, '--font-mono': MONO, '--radius': '16px', '--shadow': 'none', '--bw': '0px', '--head-font': GSF,
      '--node-width': '0px', '--node-radius': '12px', '--node-shadow': 'none', '--edge-width': '1.6', '--note-width': '0px', '--note-radius': '8px' },
    light: tokens('light'),
    dark: tokens('dark'),
  },
  css,
};
