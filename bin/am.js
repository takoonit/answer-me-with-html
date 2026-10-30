#!/usr/bin/env node
import { main, oldNodeHint } from '../src/cli.js';
import { builtin } from '../src/builtin.js';

// background: allow the background check for a new version (not triggered when tests call main directly).
// __amStdin: the draft the entry (src/warm-entry.js) already read from standard input before it fell back to this one-shot render.
const stdin = globalThis.__amStdin === undefined ? undefined : builtin('node:stream').Readable.from([globalThis.__amStdin]);
main(process.argv.slice(2), { background: true, scriptPath: process.argv[1], ...(stdin && { stdin }) }).then(
  (code) => { process.exitCode = code; },
  (err) => {
    process.stderr.write(`✗ Internal error: ${err.stack || err}\n`);
    const hint = oldNodeHint();
    if (hint) process.stderr.write(`  ${hint}\n`);
    process.exitCode = 1;
  },
);
