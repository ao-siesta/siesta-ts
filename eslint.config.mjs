import antfu from '@antfu/eslint-config'
import oli from '@oliver139/eslint-config'

export default antfu(...oli(
  {
    typescript: {
      overrides: {
        'ts/ban-ts-comment': 'off',
        'ts/no-unsafe-function-type': 'off',
      },
    },
  },
  {
    name: 'custom/sort-objects',
    files: ['src/utils/ErrorMessage.ts'],
    rules: {
      'perfectionist/sort-objects': ['error', { type: 'alphabetical' }],
    },
  },
  {
    name: 'custom/sort-arrays',
    files: [
      'src/data/menu/drinks.ts',
      'src/data/menu/dinner.ts',
    ],
    rules: {
      'perfectionist/sort-arrays': ['error', {
        type: 'alphabetical',
        partitionByNewLine: false,
        useConfigurationIf: {
          matchesAstSelector: 'ArrayExpression',
        },
      }],
    },
  },
))
