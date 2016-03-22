rm -rf lib dist

npm run babel # generate /lib
atool-build --config webpack.antd.config.js # generate /dist
node scripts/prenpm.js
npm publish $1 $2

rm -rf lib dist
