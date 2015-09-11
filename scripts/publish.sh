npm run babel
rm -rf dist
webpack --config webpack.config.production.js
node scripts/prenpm.js
npm publish $1 $2
rm -rf lib
rm -rf dist
