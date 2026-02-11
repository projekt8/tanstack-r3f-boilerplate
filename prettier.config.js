//  @ts-check

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tailwindStylesheet: './src/styles/index.css',
  tailwindAttributes: ['className'],
  tailwindFunctions: ['clsx', 'cva', 'cn'],
  plugins: ['prettier-plugin-tailwindcss'],
}

export default config
