// The warm renderer, client side. A one-shot `am render` spends ~100 ms starting Node, loading the CLI and warming its code up; the
// render itself takes 2-10 ms. So the entry (scripts/am.mjs, built from src/warm-entry.js) sends a render to a background process that
// stays loaded (src/warm-server.js) and prints what it answers: about 40 ms in all. It never needs the warm process: when there is none,
// it starts one for the next render and renders this one itself, as before.
//
// Safety: the socket and its token sit in the private temporary folder of this user (src/home.js checks it is a real 0700 directory
// owned by the user), and a request must carry the token. The socket name includes the bundle's size and time, so a renderer from
// before an update is never asked; it quits when idle. AM_NO_WARM=1 turns the whole thing off, and so does CI. Windows renders one-shot: a named pipe
// would need its own access rules.
import { lstatSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { connect } from 'node:net';
import { join } from 'node:path';
import { checkedTempHome } from './home.js';
import { builtin } from './builtin.js';

// A warm render that takes longer than this is abandoned and rendered one-shot instead.
const ANSWER_TIMEOUT_MS = 30_000;
// After asking for a renderer to start, do not ask again for a while: one that cannot start must not cost every render a spawn.
const START_BACKOFF_MS = 30_000;

// A short hash of a path (FNV-1a): two installs of the same version get a renderer each.
const pathHash = (text) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 0x01000193);
  return (h >>> 0).toString(36);
};

// The id of a bundle: its path, size and time, and the Node.js major version. The renderer checks it too (src/warm-server.js).
export function bundleId(bundleFile) {
  const { size, mtimeMs } = statSync(bundleFile);
  return `${pathHash(bundleFile)}-${size.toString(36)}-${Math.floor(mtimeMs).toString(36)}-${process.versions.node.split('.')[0]}`;
}

// The socket, token and start marker of the renderer for this bundle, in <private temp folder>/warm/. Throws when the folder is unsafe.
export function warmPaths(bundleFile) {
  const id = bundleId(bundleFile);
  const dir = join(checkedTempHome({ create: true }), 'warm');
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  const info = lstatSync(dir);
  if (!info.isDirectory() || (process.getuid && (info.uid !== process.getuid() || (info.mode & 0o077) !== 0))) throw new Error(`${dir} is not private`);
  return { dir, socket: join(dir, `${id}.sock`), token: join(dir, `${id}.token`), starting: join(dir, `${id}.starting`) };
}

// Ask a renderer to start, for the next render. Detached: this render does not wait for it.
function startServer(bundleFile, paths, scriptPath) {
  try {
    if (Date.now() - statSync(paths.starting).mtimeMs < START_BACKOFF_MS) return;
  } catch {
    // No marker: never started, or cleaned up.
  }
  try {
    writeFileSync(paths.starting, '', { mode: 0o600 });
    builtin('node:child_process').spawn(process.execPath, [bundleFile, '__warm-server', paths.socket, paths.token, scriptPath], { detached: true, stdio: 'ignore' }).unref();
  } catch {
    // The renderer is an optimization: a failure to start it changes nothing for this render.
  }
}

const readAll = (stream) => new Promise((done, fail) => {
  const chunks = [];
  stream.on('data', (c) => chunks.push(c));
  stream.on('end', () => done(Buffer.concat(chunks).toString('utf8')));
  stream.on('error', fail);
});

// Render through the warm renderer. Resolves { handled: true } when it printed the answer and set the exit code, or { handled: false, stdin }
// when the caller must render one-shot; stdin is the draft text already read from standard input, if any, which the caller must use.
export async function tryWarm({ argv, bundleFile, scriptPath, env = process.env }) {
  // CI: a run is short and its renders few, so a renderer would only outlive the job.
  if (process.platform === 'win32' || env.AM_NO_WARM || env.CI || argv[0] !== 'render') return { handled: false };
  let paths;
  let token;
  try {
    paths = warmPaths(bundleFile);
  } catch {
    return { handled: false };
  }
  try {
    token = readFileSync(paths.token, 'utf8');
  } catch {
    startServer(bundleFile, paths, scriptPath);
    return { handled: false };
  }
  const socket = await new Promise((done) => {
    const s = connect(paths.socket);
    s.once('connect', () => done(s));
    s.once('error', () => done(null));
  });
  if (!socket) {
    startServer(bundleFile, paths, scriptPath);
    return { handled: false };
  }
  // Read the draft from standard input only now, and only when the command reads it (`render -`): an open stdin that never ends
  // must not hang a render that takes its draft from a file.
  const stdin = argv.includes('-') ? await readAll(process.stdin) : undefined;
  const answer = await new Promise((done) => {
    let text = '';
    const timer = setTimeout(() => { socket.destroy(); done(null); }, ANSWER_TIMEOUT_MS);
    socket.setEncoding('utf8');
    socket.on('data', (chunk) => { text += chunk; });
    socket.on('error', () => {});
    socket.on('close', () => {
      clearTimeout(timer);
      try {
        done(JSON.parse(text));
      } catch {
        done(null);
      }
    });
    socket.end(`${JSON.stringify({ token, argv, cwd: process.cwd(), env, stdin, scriptPath })}\n`);
  });
  if (!answer || typeof answer.code !== 'number') return { handled: false, stdin };
  if (answer.stdout) process.stdout.write(answer.stdout);
  if (answer.stderr) process.stderr.write(answer.stderr);
  process.exitCode = answer.code;
  return { handled: true };
}
