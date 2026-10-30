// The warm renderer, server side (see src/warm.js): a background process that keeps the CLI loaded and renders what the entry sends.
// It runs one request at a time, with the caller's environment, working folder and standard input, so a render here prints and writes
// exactly what the same render prints and writes one-shot. It quits after IDLE_MS without a request, or after MAX_RENDERS renders.
import { readFileSync, renameSync, rmSync, writeFileSync, chmodSync } from 'node:fs';
import { createServer, connect } from 'node:net';
import { Readable } from 'node:stream';
import { builtin } from './builtin.js';
import { bundleId } from './warm.js';

const IDLE_MS = 10 * 60_000;
const MAX_RENDERS = 500;
// A request is one JSON line; a draft is text, so this is far above any real one.
const MAX_REQUEST_BYTES = 32 * 1024 * 1024;
// How often the renderer checks that its bundle is still there and unchanged: an update or a deleted copy ends it soon after.
const CHECK_MS = 60_000;

const alive = (socket) => new Promise((done) => {
  const s = connect(socket);
  s.once('connect', () => { s.destroy(); done(true); });
  s.once('error', () => done(false));
});

// Set process.env to `env` in place, and give back a function that restores it. Code that reads process.env directly (a default
// argument, a spawned browser) then sees the caller's environment.
function swapEnv(env) {
  const saved = { ...process.env };
  const apply = (next) => {
    for (const key of Object.keys(process.env)) if (!(key in next)) delete process.env[key];
    Object.assign(process.env, next);
  };
  apply(env);
  return () => apply(saved);
}

function collector() {
  const chunks = [];
  return { write: (s) => { chunks.push(String(s)); return true; }, text: () => chunks.join('') };
}

// main: src/cli.js's main. oldNodeHint: the hint the one-shot entry prints under an internal error.
export async function runWarmServer({ socket, token: tokenFile, main, oldNodeHint }) {
  const token = builtin('node:crypto').randomBytes(32).toString('hex');
  // Half-open: the client ends its side once the request is sent, and the answer still goes back on ours.
  const server = createServer({ allowHalfOpen: true });
  const listen = () => new Promise((done, fail) => {
    server.once('error', fail);
    server.listen(socket, () => { server.off('error', fail); done(); });
  });
  try {
    await listen();
  } catch (e) {
    if (e.code !== 'EADDRINUSE' || (await alive(socket))) return 0; // another renderer already serves this bundle
    rmSync(socket, { force: true }); // a socket left by a renderer that did not exit cleanly
    try {
      await listen();
    } catch {
      return 0;
    }
  }
  chmodSync(socket, 0o600);
  // The token goes in after the socket is ours: two renderers started at once must not leave the token of the one that lost.
  writeFileSync(`${tokenFile}.tmp`, token, { mode: 0o600 });
  renameSync(`${tokenFile}.tmp`, tokenFile);
  // Started: the marker that keeps the entry from starting renderers over and over (src/warm.js) is no longer needed.
  rmSync(tokenFile.replace(/\.token$/, '.starting'), { force: true });

  let renders = 0;
  let idle;
  let queue = Promise.resolve();
  let finish;
  const done = new Promise((resolve) => { finish = resolve; });
  const stop = () => {
    clearTimeout(idle);
    clearInterval(check);
    server.close();
    try {
      if (readFileSync(tokenFile, 'utf8') === token) rmSync(tokenFile, { force: true });
    } catch {
      // Already gone.
    }
    rmSync(socket, { force: true });
    finish(0);
  };
  const touch = () => {
    clearTimeout(idle);
    idle = setTimeout(stop, IDLE_MS);
    idle.unref?.();
  };
  touch();
  const bundleFile = process.argv[1];
  const startedAs = bundleId(bundleFile);
  const check = setInterval(() => {
    let now;
    try {
      now = bundleId(bundleFile);
    } catch {
      // Deleted.
    }
    if (now !== startedAs) stop();
  }, CHECK_MS);
  check.unref?.();
  // Killed (a shutdown, a kill): clean up as on an idle exit, so the next render does not try a socket nobody serves.
  for (const signal of ['SIGTERM', 'SIGINT', 'SIGHUP']) process.once(signal, stop);

  const render = async (req) => {
    if (!Array.isArray(req.argv) || req.argv[0] !== 'render' || typeof req.cwd !== 'string' || !req.env || typeof req.env !== 'object') return { handled: false };
    const restoreEnv = swapEnv(req.env);
    const savedCwd = process.cwd();
    try {
      process.chdir(req.cwd);
    } catch {
      restoreEnv();
      return { handled: false };
    }
    const stdout = collector();
    const stderr = collector();
    let code;
    try {
      code = await main(req.argv, {
        stdout, stderr, env: process.env, cwd: req.cwd, background: true, scriptPath: req.scriptPath,
        stdin: Readable.from(req.stdin === undefined ? [] : [req.stdin]),
      });
    } catch (err) {
      stderr.write(`✗ Internal error: ${err.stack || err}\n`);
      const hint = oldNodeHint?.();
      if (hint) stderr.write(`  ${hint}\n`);
      code = 1;
    } finally {
      process.chdir(savedCwd);
      restoreEnv();
    }
    return { code: code ?? 0, stdout: stdout.text(), stderr: stderr.text() };
  };

  server.on('connection', (conn) => {
    let text = '';
    conn.setEncoding('utf8');
    conn.on('error', () => {});
    conn.on('data', (chunk) => {
      text += chunk;
      if (text.length > MAX_REQUEST_BYTES) conn.destroy();
    });
    conn.on('end', () => {
      queue = queue.then(async () => {
        touch();
        let req;
        try {
          req = JSON.parse(text);
        } catch {
          conn.end(JSON.stringify({ handled: false }));
          return;
        }
        const given = Buffer.from(String(req.token ?? ''));
        const expected = Buffer.from(token);
        if (given.length !== expected.length || !builtin('node:crypto').timingSafeEqual(given, expected)) {
          conn.end(JSON.stringify({ handled: false }));
          return;
        }
        conn.end(JSON.stringify(await render(req)));
        if (++renders >= MAX_RENDERS) stop();
      });
    });
  });
  return done;
}
