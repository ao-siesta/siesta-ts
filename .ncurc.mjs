import { defineConfig } from 'npm-check-updates'

export default defineConfig({
  format: 'group',
  upgrade: true,
  interactive: true,
  cooldown: 7,
  reject: [
    'pnpm',
  ],
  target: (name) => {
    const minor = [
      '@types/node',
      'typescript',
    ]

    return minor.includes(name) ? 'minor' : 'latest'
  },
})
