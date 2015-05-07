exports.reader = function(post) {
  var filename = post.meta.filepath.toLowerCase();
  if (post.meta.filepath.indexOf('components') >= 0) {
    post.template = post.meta.template = 'component';
  } else {
    post.template = post.meta.template = (post.meta.template || 'page');
  }
  if (!post.meta.category) {
    post.meta.category = post.meta.directory;
  }
  return post;
};
