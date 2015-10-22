npm run babel
rm -rf dist
webpack
node scripts/prenpm.js
npm publish $1 $2
rm -rf lib
rm -rf dist
