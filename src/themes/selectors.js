// The selectors a theme's decoration css (the `css` field of a theme file, after the leading &) may target.
// This list is a compatibility contract: base.css keeps every class named here, so a theme file written against it
// keeps working in later versions (CONTRIBUTING.md, "Theme compatibility"). Add to it freely; never remove or rename an entry.
// test/theme-files.test.js checks that every class in the list exists in base.css.
export const THEME_SELECTORS = Object.freeze([
  // The page head: title, intro and the line of meta tags.
  '.am-head', '.am-head h1', '.am-head-meta', '.am-intro',
  // A panel: the head (ID, title, meta) and the body that holds the components.
  '.am-panel', '.am-panel--bare', '.am-panel-head', '.am-panel-head h2', '.am-panel-id', '.am-panel-meta', '.am-panel-body',
  // Prose, callouts and key-value tables.
  '.am-md', '.am-callout', '.am-callout--ok', '.am-callout--warn', '.am-callout--err', '.am-callout-title', '.am-kv',
  // The panel comment button (inside the panel head) and its "has a comment" state, so it stays visible on a dark or coloured head.
  '.am-comment-btn', '.am-comment-btn--on',
  // The drawing frame and its rulers (blueprint).
  '.am-frame', '.am-ruler',
  // More of the page head: the generator line and the subtitle.
  '.am-colophon', '.am-sub',
  // The toolbar: its buttons, the filled Reply button and the theme and mode lists; the body class while the reply bar is open.
  '.am-toolbar', '.am-btn', '.am-btn--reply', '.am-pick', '.am-has-reply-bar',
  // The panel grid and the cells of a key-value table.
  '.am-grid', '.am-kv-cell',
  // Code blocks: the block, its title row, the copy button and the code itself.
  '.am-codeblock', '.am-code-head', '.am-code-copy', '.am-code',
  // Ask: the decision box and its "suggested" tag.
  '.am-ask', '.am-ask-tag',
]);
