var _ = require('lodash');
var ReactTools = require('react-tools');

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
        if (/index$/i.test(a.filename)) {
          a.meta.order = 1;
        }
        if (/index$/i.test(b.filename)) {
          b.meta.order = 1;
        }
        a = a.meta.order || 10;
        b = b.meta.order || 10;
        return parseInt(a, 10) - parseInt(b, 10);
      });
      return ret;
    },
    get_all_category: function(pages) {
      return _.uniq(Object.keys(pages).map(function(key) {
        var item = nico.sdk.post.read(key);
        return item.meta.category;
      }).filter(function(item) {
        return item;
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
      return ret;
    },
    // For Debug
    console: function(target) {
      console.log(target);
    },
    parsePost: function(filepath) {
      return nico.sdk.post.read(filepath);
    },
    jsx: function(content) {
      // 替换 js 代码
      var scriptExp = /(<script>)([\s\S]*?)(<\/script>)/gi;
      var scriptExp2 = /(<script>)([\s\S]*?)(<\/script>)/i;
      content = content.replace(scriptExp, function(replacement) {
        var match = scriptExp2.exec(replacement);
        if (!match) {
          return replacement;
        }
        var code = match[2];
        // 转换 jsx 代码
        if (code.indexOf('/** @jsx React.DOM */') > -1) {
          code = ReactTools.transform(code);
        }
        return match[1] + code + match[3];
      });
      return content;
    }
  };

  return exports;
};
