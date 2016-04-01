rm -rf lib dist

npm run babel # generate /lib
ANTD=PRODUCTION atool-build # generate /dist
node scripts/prenpm.js
npm publish $1 $2

rm -rf lib dist
