// Node's own SHA-256 of a string's UTF-8 bytes, as base64, for the CSP hashes of a page's scripts: about 75 KB of script text per
// page, which the plain src/sha256.js takes ~15 ms for on every render. The site's browser bundle has no node:crypto: site/build.mjs
// swaps this file for site/src/native-hash-stub.js, and src/csp.js falls back to the plain version.
import { builtin } from './builtin.js';

export const nativeSha256Base64 = (text) => builtin('node:crypto').createHash('sha256').update(text, 'utf8').digest('base64');
