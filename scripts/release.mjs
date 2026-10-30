// First release step: write the version number into every manifest and rebuild the bundle.
// Usage: npm run release -- 0.4.8
// Then: write highlights.json and changelog/<version>.md, commit, open a PR, merge; the release workflow tags the merge commit and publishes the GitHub Release (see CONTRIBUTING.md).
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('..', import.meta.url);
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('Usage: npm run release -- <x.y.z>');
  process.exit(2);
}

const FILES = [
  'package.json',
  'package-lock.json',
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
];

const current = JSON.parse(readFileSync(new URL('package.json', ROOT), 'utf8')).version;
for (const f of FILES) {
  const url = new URL(f, ROOT);
  const json = JSON.parse(readFileSync(url, 'utf8'));
  const next = bump(json, f);
  writeFileSync(url, `${JSON.stringify(next, null, 2)}\n`);
}
// A font that ships for the first time in this version: write the version into font-list.js, and make every catalog theme that
// names the font require it, so an older CLI skips the theme with "needs Answer me with HTML x.y.z or newer" instead of failing on
// the unknown font. Done before the build, so the bundle carries the version.
const fontList = new URL('src/themes/font-list.js', ROOT);
const { FONTS } = await import(fontList);
const newFonts = Object.keys(FONTS).filter((name) => FONTS[name].since === 'next');
if (newFonts.length) {
  writeFileSync(fontList, readFileSync(fontList, 'utf8').replaceAll("since: 'next'", `since: '${version}'`));
  const dir = new URL('marketplace/themes/', ROOT);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const url = new URL(file, dir);
    const theme = JSON.parse(readFileSync(url, 'utf8'));
    if (!newFonts.includes(theme.font) || theme.requires === version) continue;
    writeFileSync(url, `${JSON.stringify({ ...theme, requires: version }, null, 2)}\n`);
    console.log(`✓ marketplace/themes/${file}: requires ${version} (font ${theme.font})`);
  }
}
execFileSync('npm', ['run', 'build', '--silent'], { cwd: fileURLToPath(ROOT), stdio: 'inherit', shell: process.platform === 'win32' });
console.log(`✓ ${current} → ${version}: ${FILES.length} manifests updated, bundle rebuilt. Next: npm test, then commit and open a PR.`);
// highlights.json is written by hand: the new-version popover shows it to users of older versions (test/highlights.test.js checks it).
const highlights = JSON.parse(readFileSync(new URL('highlights.json', ROOT), 'utf8')).version;
if (highlights !== version) console.log(`! highlights.json still describes ${highlights}: write up to 3 highlights of ${version} in every page language.`);
if (!existsSync(new URL(`changelog/${version}.md`, ROOT))) console.log(`! changelog/${version}.md is missing: write the release notes (first line <!-- release ${version} YYYY-MM-DD -->, English, a --- line, Chinese).`);

// Change only this project's version fields in each file; returns a new object.
function bump(json, file) {
  if (file === 'package-lock.json') {
    return { ...json, version, packages: { ...json.packages, '': { ...json.packages[''], version } } };
  }
  if (file.endsWith('marketplace.json')) {
    return { ...json, plugins: json.plugins.map((p) => ({ ...p, version })) };
  }
  return { ...json, version };
}
