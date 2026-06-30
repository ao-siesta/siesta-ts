import { defineConfig } from 'tsdown'
import { StaleGuardRecorder } from 'tsdown-stale-guard'
import AutoImport from 'unplugin-auto-import/rolldown'

const AutoImportOptions = {
  dirs: [
    './src/types/',
    './src/utils/',
  ],
}

export default defineConfig({
  entry: [
    'src/index.ts',
    // 'src/cli.ts',
  ],
  dts: true,
  shims: true,
  format: ['esm'],
  exports: true,
  plugins: [
    AutoImport(AutoImportOptions),
    StaleGuardRecorder(),
  ],
})
