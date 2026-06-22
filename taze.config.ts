import { defineConfig } from 'taze'

export default defineConfig({
  interactive: true,
  exclude: [
    'pnpm',
  ],
  force: true,
  write: true,
  ignoreOtherWorkspaces: true,
  depFields: {
    overrides: false,
  },
  packageMode: {
    '@types/node': 'minor',
    typescript: 'minor',
  },
})
