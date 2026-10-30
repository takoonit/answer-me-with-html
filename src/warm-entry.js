// The entry the skill runs: scripts/am.mjs (scripts/build.mjs bundles this file, and the CLI into scripts/am-bundle.mjs next to it).
// 1. Node's compile cache: Node 22.1+ keeps the compiled bundle on disk, so a run stops compiling its ~1 MB (about 20 ms). It only
//    covers modules loaded after it is on, which is why this entry is a file of its own.
// 2. A render goes to the warm renderer when one is running (src/warm.js). Otherwise, and for every other command, the bundle runs here.
import module from 'node:module';
import { fileURLToPath } from 'node:url';
import { tryWarm } from './warm.js';

try {
  module.enableCompileCache?.();
} catch {
  // No cache: the bundle is compiled as usual.
}
const bundle = new URL('./am-bundle.mjs', import.meta.url);
const warm = await tryWarm({ argv: process.argv.slice(2), bundleFile: fileURLToPath(bundle), scriptPath: process.argv[1] });
if (!warm.handled) {
  // The draft the warm path already read from standard input: the one-shot render reads it from here (bin/am.js).
  if (warm.stdin !== undefined) globalThis.__amStdin = warm.stdin;
  await import(bundle.href);
}
