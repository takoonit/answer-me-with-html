# Setting up Node.js

Read this when SKILL.md section 2 sends you here: `node` is not found, or `node --version` is older than v20.

The CLI is a single file with no dependencies to install; it needs only Node.js 20 or newer.

1. Tell the user that Node.js 20+ is missing, and show them the exact command that installs the Node.js LTS:
   - macOS: `brew install node`
   - Windows: `winget install OpenJS.NodeJS.LTS`
   - otherwise: nvm (it adds lines to the shell profile)
2. Run the command only after the user agrees.
3. Run `node --version` again.
4. If the user says no, or Node.js is still missing or older than v20, stop and tell them. Produce no page.

Then go back to SKILL.md section 2.
