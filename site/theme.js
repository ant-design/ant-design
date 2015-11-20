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
      if (!rootDirectory && post.filename.indexOf('CHANGELOG') < 0) {
        return;
      }
      var directories = [rootDirectory];
      // docs 和 components 放在同一页
      if (rootDirectory === 'docs' || rootDirectory === 'components' ||
          post.filename.indexOf('CHANGELOG') >= 0) {
        directories = ['docs', 'components'];
      }
      var cacheKey = directories.join('-');
      var categories;
      if (Categories[cacheKey]) {
        categories = Categories[cacheKey];
      } else {
        categories = {};
        _.uniq(getAllPosts(posts).forEach(function(item) {
          var itemDirectory = item.directory.split('/')[0];
          var cat = item.meta.category;
          if (!cat) {
            return;
          }
          if (directories.indexOf(itemDirectory) >= 0 ||
              item.filename.indexOf('CHANGELOG') >= 0) {
            item.filename = item.filename.toLowerCase();
            categories[cat] = categories[cat] || [];
            categories[cat].push(item);
          }
        }));
        categories = Object.keys(categories).map(function(cat) {
          return {
            name: cat,
            pages: categories[cat]
          };
        });
        // React 的分类排序
        categories = categories.sort(function(a, b) {
          var cats = ['React', 'Components'];
          a = cats.indexOf(a.name);
          b = cats.indexOf(b.name);
          return a - b;
        });
        // 设计的分类排序
        categories = categories.sort(function(a, b) {
          var cats = ['风格', '动画', '模式', '资源'];
          a = cats.indexOf(a.name);
          b = cats.indexOf(b.name);
          return a - b;
        });
      }
      Categories[cacheKey] = categories;
      return categories;
    },
    find_demo_in_component: function(pages, directory) {
      var ret = [];
      getAllPosts(pages).forEach(function(post) {
        if (post.filepath.indexOf(directory + '/demo/') === 0 && !post.meta.hidden) {
          ret.push(post);
        }
      });
      var hasOnly;
      ret.forEach(function(post) {
        if (post.meta.only) {
          hasOnly = true;
        }
      });
      if (hasOnly) {
        ret = ret.filter(function(post) {
          return post.meta.only;
        });
      }
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
    rootDirectoryIn: function(directory, rootDirectories) {
      return rootDirectories.indexOf(directory.split('/')[0]) >= 0;
    },
    removeCodeBoxIdPrefix: function(id) {
      return id.split('-').slice(2).join('-');
    },
    splitComponentsByType: function(pages, category) {
      if (category !== 'Components') {
        return pages.sort(function(a, b) {
          a = a.meta.order || 100;
          b = b.meta.order || 100;
          return parseInt(a, 10) - parseInt(b, 10);
        });
      }
      // 加入组件的类别分隔符
      var tempResult = _.sortBy(pages, function(p) {
        var types = ['基本', '表单', '展示', '导航', '其他'];
        return types.indexOf(p.meta.type || '其他');
      });
      var lastType, result = [];
      tempResult.forEach(function(p) {
        if (p.meta.type !== lastType) {
          result.push({
            name: p.meta.type || '其他',
            divider: true
          });
          lastType = p.meta.type;
        }
        result.push(p);
      });
      return result;
    },
    add_anchor: function(content) {
      for (var i = 1; i <= 6; i++) {
        var reg = new RegExp('(<h' + i + '\\sid="(.*?)">.*?)(<\/h' + i + '>)', 'g');
        content = content.replace(reg, '$1<a href="#$2" class="anchor">#</a> $3');
      }
      return content;
    }
  };

  return exports;
};
