var _ = require('lodash');

module.exports = function(nico) {
  var exports = {};
  var Categories = {};
  var Posts = [];

  function getAllPosts(pages) {
    if (Posts && Posts.length > 0) {
      return Posts;
    }
    Object.keys(pages).map(function(key) {
      Posts.push(pages[key]);
    });
    return Posts;
  }

  exports.reader = function(post) {
    var filepath = post.meta.filepath.toLowerCase();
    if (filepath.indexOf('components') === 0) {
      post.template = post.meta.template = 'component';
    } else {
      post.template = post.meta.template = (post.meta.template || 'page');
    }
    if (filepath === 'readme.md') {
      post.filename = post.meta.filename = 'index';
      post.template = post.meta.template = 'home';
    }
    if (filepath.indexOf('/demo/') > 0) {
      post.template = post.meta.template = 'code';
    }
    return post;
  };

  exports.filters = {
    find_category: function(posts, cats) {
      if (typeof cats === 'string') {
        cats = [cats];
      }
      var ret = [];
      getAllPosts(posts).forEach(function(post) {
        if (cats.indexOf(post.meta.category) >= 0) {
          ret.push(post);
        }
      });
      ret = ret.sort(function(a, b) {
        a = a.meta.order || 10;
        b = b.meta.order || 10;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },
    get_categories: function(posts, post) {
      var rootDirectory = post.directory.split('/')[0];
      var categories = Categories[rootDirectory] || _.uniq(getAllPosts(posts).map(function(item) {
        if (item.directory.split('/')[0] === post.directory.split('/')[0]) {
          return item.meta.category;
        }
      })).filter(function(n){ return n != undefined });
      categories = categories.sort(function(a, b) {
        return a.length - b.length;
      })
      Categories[rootDirectory] = categories;
      return categories;
    },
    find_demo_in_component: function(pages, directory) {
      var ret = [];
      getAllPosts(pages).forEach(function(post) {
        if (post.filepath.indexOf(directory + '/demo/') === 0) {
          ret.push(post);
        }
      });
      ret = ret.sort(function(a, b) {
        if (/index$/i.test(a.filename)) {
          a.meta.order = 1;
        }
        if (/index$/i.test(b.filename)) {
          b.meta.order = 1;
        }
        a = a.meta.order || 100;
        b = b.meta.order || 100;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },
    // For Debug
    console: function(target) {
      console.log(target);
    },
    parsePost: function(filepath) {
      return nico.sdk.post.read(filepath);
    },
    odd: function(items) {
      return items.filter(function(item, i) {
        return (i+1)%2 === 1;
      });
    },
    even: function(items) {
      return items.filter(function(item, i) {
        return (i+1)%2 === 0;
      });
    },
    rootDirectoryIs: function(directory, rootDirectory) {
      return directory.split('/')[0] === rootDirectory;
    }
  };

  return exports;
};
