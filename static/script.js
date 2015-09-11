InstantClickChangeFns.push(function() {
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

  // 移动 API 文档到演示下方
  $('.markdown #api').nextAll().andSelf().appendTo('.api-container');

  $('.nav-phone-icon').click(function() {
    $(this).prev().toggle();
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
      });
    }
  };
  listFunc.init();
});
