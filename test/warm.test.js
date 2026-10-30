import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { connect } from 'node:net';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { warmPaths } from '../src/warm.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

// Ask the renderer directly, as src/warm.js does: one JSON line in, one JSON answer back.
const ask = (socket, request) => new Promise((done, fail) => {
  const s = connect(socket);
  let text = '';
  s.setEncoding('utf8');
  s.on('data', (c) => { text += c; });
  s.on('error', fail);
  s.on('close', () => {
    try {
      done(JSON.parse(text));
    } catch {
      fail(new Error(`not a JSON answer: ${JSON.stringify(text)}`));
    }
  });
  s.end(`${JSON.stringify(request)}\n`);
});

const until = async (check, ms = 15_000) => {
  for (const end = Date.now() + ms; Date.now() < end; await new Promise((r) => setTimeout(r, 50))) if (check()) return true;
  return false;
};

// The warm renderer (src/warm.js, src/warm-server.js) must print and write exactly what a one-shot render does.
test('warm: a render through the warm renderer matches the one-shot render', { skip: process.platform === 'win32' && 'no Unix sockets' }, async () => {
  const dir = mkdtempSync(join(tmpdir(), 'am-warm-'));
  // The warm folder lives in the temporary folder: point it at this test's own, so no other renderer answers.
  const env = { ...process.env, TMPDIR: dir, AM_HOME: join(dir, 'home'), AM_NO_OPEN: '1' };
  delete env.CI;
  delete env.AM_NO_WARM;
  let server;
  try {
    cpSync(join(ROOT, 'skills/answer-me-with-html'), join(dir, 'skill'), { recursive: true });
    const cli = join(dir, 'skill/scripts/am.mjs');
    const bundle = join(dir, 'skill/scripts/am-bundle.mjs');
    const savedTmp = process.env.TMPDIR;
    process.env.TMPDIR = dir;
    let paths;
    try {
      paths = warmPaths(bundle);
    } finally {
      if (savedTmp === undefined) delete process.env.TMPDIR;
      else process.env.TMPDIR = savedTmp;
    }
    const draft = join(dir, 'draft.md');
    writeFileSync(draft, '---\ntitle: Warm\n---\n## A\n```flow\nA -> B\n```\n');
    const out = join(dir, 'out.html');
    const run = (args, extra = {}, input) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8', cwd: dir, env: { ...env, ...extra }, input });

    const once = run(['render', 'draft.md', '-o', out], { AM_NO_WARM: '1' });
    assert.equal(once.status, 0, once.stderr);
    const page = readFileSync(out, 'utf8');
    rmSync(out);

    server = spawn(process.execPath, [bundle, '__warm-server', paths.socket, paths.token, cli], { env, stdio: 'ignore' });
    assert.ok(await until(() => existsSync(paths.token)), 'the renderer writes its token');
    const token = readFileSync(paths.token, 'utf8');

    const answer = await ask(paths.socket, { token, argv: ['render', 'draft.md', '-o', out], cwd: dir, env, scriptPath: cli });
    assert.equal(answer.code, 0, answer.stderr);
    assert.equal(answer.stdout, once.stdout);
    assert.equal(readFileSync(out, 'utf8'), page);
    rmSync(out);

    const refused = await ask(paths.socket, { token: 'x'.repeat(token.length), argv: ['render', 'draft.md', '-o', out], cwd: dir, env, scriptPath: cli });
    assert.deepEqual(refused, { handled: false }, 'a request without the token is refused');
    assert.ok(!existsSync(out));

    const warm = run(['render', 'draft.md', '-o', out]);
    assert.equal(warm.status, 0, warm.stderr);
    assert.equal(warm.stdout, once.stdout);
    assert.equal(readFileSync(out, 'utf8'), page);

    const input = '## Piped\nFrom standard input.\n';
    const piped = run(['render', '-', '-o', join(dir, 'piped.html')], {}, input);
    const pipedOnce = run(['render', '-', '-o', join(dir, 'piped-once.html')], { AM_NO_WARM: '1' }, input);
    assert.equal(piped.status, 0, piped.stderr);
    assert.equal(readFileSync(join(dir, 'piped.html'), 'utf8'), readFileSync(join(dir, 'piped-once.html'), 'utf8'));

    const missing = run(['render', 'nope.md', '-o', out]);
    const missingOnce = run(['render', 'nope.md', '-o', out], { AM_NO_WARM: '1' });
    assert.equal(missing.status, missingOnce.status);
    assert.equal(missing.stderr, missingOnce.stderr);

    server.kill('SIGTERM');
    assert.ok(await until(() => !existsSync(paths.socket) && !existsSync(paths.token)), 'a stopped renderer removes its socket and token');
  } finally {
    server?.kill('SIGKILL');
    rmSync(dir, { recursive: true, force: true });
  }
});
