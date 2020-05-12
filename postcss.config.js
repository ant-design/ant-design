/**
 * Configure `postcss`, which we use to prepare an optimized CSS file
 * for distribution.
 */
const cssnano = require('cssnano');

module.exports = {
  plugins: [cssnano({ preset: 'default' })],
};
