var buildBranch = require('buildBranch');

buildBranch({
  branch: 'gh-pages',
  folder: '_site'
}, function(err) {
  if(err) {
    throw err;
  }
  console.log('Site has been published to http://ant.design');
});
