module.exports = {
  root: true,
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'global-strict': 0,
  },
  ignorePatterns: ['webpack*.js'],
};
