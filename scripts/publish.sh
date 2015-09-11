npm run babel
rm -rf dist
webpack --config webpack.config.production.js
node scripts/prenpm.js
npm publish
rm -rf lib
rm -rf dist
