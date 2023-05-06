module.exports = {
  env: {
    browser: true,
    es2022: true, // Vuetify recommended
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vuejs-accessibility/recommended',
    'plugin:vuetify/base',
    'plugin:yaml/recommended',
    '@vue/eslint-config-prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    createDefaultProgram: true,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    extraFileExtensions: '.vue',
  },
  plugins: ['import', 'tsdoc', 'vue'],
  rules: {
    'require-jsdoc': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/array-type': [
      'error',
      { default: 'array', readonly: 'array' },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'import/default': 'off',
    'import/no-default-export': 'off', // Fix for Vuetify
    'import/no-named-as-default': 'off', // Fix for Vuetify
    'import/no-named-as-default-member': 'off', // Fix for Vuetify
    'tsdoc/syntax': 'warn',
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],
    'vue/multi-word-component-names': 'off',
    'vue/no-template-shadow': 'off', // for Vuetify tooltip fix
    'vuetify/no-deprecated-components': 'warn', // for Vuetify Labs Fix (v-data-tables etc.)
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
    },
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        map: [
          ['@', './src'],
          ['~', './node_modules'],
        ],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
      },
    },
    vite: {
      configPath: './vite.config.ts',
    },
  },
};
