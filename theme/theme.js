var _ = require('lodash');

module.exports = function(nico) {
  var exports = {};

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
    find_category: function(pages, cat) {
      var ret = [];
      Object.keys(pages).forEach(function(key) {
        var item = nico.sdk.post.read(key);
        if (item.meta.category === cat) {
          ret.push(item);
        }
      });
      ret = ret.sort(function(a, b) {
        a = a.meta.order || 10;
        b = b.meta.order || 10;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },
    get_components_categories: function(pages) {
      return _.uniq(Object.keys(pages).map(function(key) {
        var item = nico.sdk.post.read(key);
        if (item.meta.template !== 'component') {
          return;
        }
        return item.meta.category;
      }));
    },
    find_demo_in_component: function(pages, directory) {
      var ret = [];
      Object.keys(pages).forEach(function(key) {
        var page = pages[key];
        if (key.indexOf(directory + '/demo/') === 0) {
          ret.push(page);
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
    }
  };

  return exports;
};
