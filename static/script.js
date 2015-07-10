$(function() {

  // 获取搜索数据
  var searchData = [];
  $('.hidden input').each(function(i, item) {
    var obj = {};
    obj.english = item.value.split(' ')[0];
    obj.chinese = item.value.split(' ')[1];
    obj.value = item.value.toLowerCase().replace(/\s+/g, "");

    searchData.push(obj);
  });

  seajs.config({
    base: 'http://static.alipayobjects.com',
    alias: {
      'jquery': 'jquery/1.7.2/jquery',
      'autocomplete': 'arale-autocomplete/1.4.1/autocomplete'
    }
  });

  seajs.use(['jquery', 'autocomplete'], function($, AutoComplete){
    $(function() {
      var ac = new AutoComplete({
        trigger: '.search-input',
        selectFirst: true,
        submitOnEnter: false,
        dataSource: searchData,
        html: '<strong>{{english}}</strong>&nbsp;<span>{{chinese}}</span>',
        filter: function(data, query) {
          var result = [];
          query = query.toLowerCase().replace(/^\s+|\s+$/g, '');
          if (!query) return result;
          $.each(data, function(index, item) {
            if (new RegExp(query).test(item.value)) {
              result.push(item);
            }
          });
          return result;
        }
      }).render();

      ac.on('itemSelected', function(item) {
        $(ac.get('trigger')).val('正转到 ' + item.english + ' ' + item.chinese).attr('disabled', 'disabled');
        location.href = '/components/' + item.english.toLowerCase();
      });
    });
  });

  $('.component-demos .icon-all').on('click', function() {
    if ($(this).hasClass('expand')) {
      $(this).removeClass('expand');
      $('.code-box .highlight').animate({
        height: 'hide',
        opacity: 0
      }, 150);
    } else {
      $(this).addClass('expand');
      $('.code-box .highlight').animate({
        height: 'show',
        opacity: 1
      }, 150);
    }
  });

  $('.code-box').each(function(i, item) {
    item = $(item);
    item.find('.highlight').appendTo(item);
  });

  $('.code-boxes').on('click', '.collapse', function() {
    var highlightBox = $(this).parent().parent().find('.highlight');
    var codeVisible = highlightBox.is(':visible');
    highlightBox.animate({
      height: codeVisible ? 'hide' : 'show',
      opacity: codeVisible ? 0 : 1
    }, 150);
    if (codeVisible) {
      $(this).parent().parent().removeClass('expand');
    } else {
      $(this).parent().parent().addClass('expand');
    }
  });
    $.easing['jswing'] = $.easing['swing'];
    $.extend($.easing,{
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    });
  var navFunc = {
    navStrArr: [],
    init: function() {
      var self = this;
      self.navBox = $(".nav");
      self.navBar = self.navBox.find(".bar");
      self.navList = self.navBox.find("ul li");
      self.navNum = $(".current").index();
      self.search($(".search"));
      self.navBarAnim();
      self.navResize(null);
      $(window).bind("resize", self.navResize);
      self.navBar.show();
    },
    navResize: function(e) {
      var self = navFunc;
      self.navBar.css("left", self.navList.width() * self.navNum);

      self.navList.eq(self.navNum).find("a").addClass("hover");
    },
    search: function(c) {
      var self = this;
      self.searchBox = c;
      self.searchInput = self.searchBox.find("input[type='text']");
      self.searchBtn = self.searchBox.find("button");
      self.searchInput.focus(function(e) {
        $(this).addClass("focus");
        self.searchBtn.css("left", self.searchBox.width() + 13);
      });
      self.searchInput.blur(function(e) {
        if (!self.searchInput.val()) {
          self.searchBtn.attr("style", "");
          $(this).removeClass("focus");
        }
      });
      self.searchBtn.click(function(e) {
        self.searchBox.find("form").submit();
      });
    },
    navBarAnim: function() {
      var self = this,
        delay;

      function startBarAnim(num) {
        self.navBar.css("left", self.navList.width() * num);
        self.navList.eq(num).find("a").addClass("hover");
      }
      self.navList.bind("mouseenter", function(e) {
        clearTimeout(delay);
        var m = e.currentTarget;
        self.navList.find("a").removeClass("hover");
        self.navBar.addClass("barAnim").css("left", $(m).width() * $(m).index());
      });
      self.navList.bind("mouseleave", function(e) {
        delay = setTimeout(function() {
          startBarAnim(self.navNum);
        }, 500);
      });
    }
  };
  navFunc.init();
  var listFunc = {
    num: 0,
    init: function() {
      var self = this;
      self.listBox = $(".aside-container>ul");
      if (!self.listBox.length) {
        return;
      }
      self.getUrlNum();
      self.listBox.children().eq(self.num).attr("open", true).find("ul").css("display", "block");
      //添加标题事件；
      self.addTitleEvent();
    },
    getUrlNum: function() {
      var self = this,
        url = location.href,
        str = "";
      //console.log(self.listBox.find("a"))
      for (var i = 0; i < self.listBox.find("a").length; i++) {
        var m = self.listBox.find("a").eq(i);
        if (m.attr("href") == "./" || url.indexOf(m.attr("href")) >= 0) {
          self.num = m.parent().parent().parent().index();
        }
      }
    },
    addTitleEvent: function() {
      var self = this;
      var title = self.listBox.find("h4");
      title.bind("click", function(e) {
        var parent = $(this).parent(),
            list=parent.find("ul");
        if (parent.attr("open")) {
          parent.removeAttr("open");
          if (parent.index() == self.num) {
            $(this).addClass("current");
          }
          list.animate({marginTop:-list.height()},400,"easeInOutCirc",function (){
              list.css({"display":"none"})
          })
        } else {
          parent.attr("open", true);
          if (parent.index() == self.num) {
            $(this).removeClass("current");
          }
            list.css({"display":"block","margin-top":-list.height()});
            list.animate({marginTop:0},400,"easeInOutCirc")
        }
        //parent.find("ul").slideToggle(300);
      });
    }
  };
  listFunc.init();
});
