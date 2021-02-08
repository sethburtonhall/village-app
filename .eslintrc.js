module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'import/order': ['error', {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
      groups: ['builtin', 'external', 'internal'],
      'newlines-between': 'always-and-inside-groups',
      pathGroups: [{
        group: 'external',
        pattern: 'react',
        position: 'before',
      }],
      pathGroupsExcludedImportTypes: ['react'],
    }],
    'jsx-a11y/anchor-is-valid': ['error', {
      aspects: ['invalidHref', 'preferButton'],
      components: ['Link'],
      specialLink: ['hrefLeft', 'hrefRight'],
    }],
    'jsx-a11y/interactive-supports-focus': ['error', {
      tabbable: ['button', 'checkbox', 'link', 'searchbox', 'spinbutton', 'switch', 'textbox'],
    }],
    'react/jsx-filename-extension': [1, {
      extensions: ['.js', '.jsx'],
    }],
    'react/jsx-props-no-spreading': 'off',
  },
};
