//  @ts-check

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  arrowParens: 'always',
  tailwindStylesheet: './src/styles/index.css',
  tailwindAttributes: ['className'],
  tailwindFunctions: ['clsx', 'cva', 'cn'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
