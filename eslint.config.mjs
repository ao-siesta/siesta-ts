import antfu from '@antfu/eslint-config'
import oli from '@oliver139/eslint-config'

export default antfu(...oli({
  typescript: {
    overrides: {
      'ts/ban-ts-comment': 'off',
      'ts/no-unsafe-function-type': 'off',
    },
  },
}))
