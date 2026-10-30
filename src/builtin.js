// A Node built-in module, loaded when the code first needs it. A static import loads the module, and everything it loads in turn, on
// every start of the CLI, even for a command that never calls it: node:child_process, node:net and node:crypto add about 8 ms to each
// am render, which needs none of them unless it opens a browser, checks for an update or prints an am serve link.
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// process.getBuiltinModule is Node 20.16+ and 22.3+; require covers the earlier Node 20 releases.
export const builtin = (name) => process.getBuiltinModule?.(name) ?? require(name);
