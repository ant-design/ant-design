var buildBranch = require('buildBranch');

buildBranch({
  branch: 'gh-pages',
  folder: '_site'
}, function(err) {
  if(err) {
    throw err;
  }
  console.log('Published!');
});
