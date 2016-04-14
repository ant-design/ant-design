/* eslint strict: 0 */
'use strict';

const ghPages = require('gh-pages');
const path = require('path');
ghPages.publish(path.join(process.cwd(), '_site'), {
  depth: 1,
  logger(message) {
    console.log(message);
  }
}, (err) => {
  if (err) {
    throw err;
  }
  console.log('Site has been published to http://ant.design 🎉');
});
