import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'public/**',
      '_backup_monorepo_checkpoint/**',
      '_old_portfolio_source/**',
      'postman/**',
      'recommendations.postman_collection.json',
    ],
  },
]
