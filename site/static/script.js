InstantClickChangeFns.push(function() {
  // fix hash id link
  if (window.location.href.indexOf('#') > 0) {
    setTimeout(function() {
      window.location.href = window.location.href;
    }, 0);
  }

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
      this.navBox = $(".nav");
      this.navBar = this.navBox.find(".bar");
      this.navList = this.navBox.find("ul li");
      this.navNum = $(".current").index();
      this.navBarAnim();
      this.highlightCurrentNav();
      $(window).bind("resize", this.highlightCurrentNav);
      this.navBar.show();
    },
    highlightCurrentNav: function(target) {
      target = target || this.navList.eq(this.navNum);
      this.navBar && this.navBar.css({
        left: target.position().left,
        width: target.outerWidth()
      });
    },
    navBarAnim: function() {
      var self = this, delay;
      self.navList.bind("mouseenter", function(e) {
        clearTimeout(delay);
        self.highlightCurrentNav($(e.currentTarget));
      });
      self.navList.bind("mouseleave", function(e) {
        delay = setTimeout(function() {
          self.highlightCurrentNav();
        }, 500);
      });
    }
  };
  navFunc.init();
  var listFunc = {
    num: 0,
    init: function() {
      this.listBox = $(".aside-container>ul");
      if (!this.listBox.length) {
        return;
      }
      this.getUrlNum();
      this.addTitleEvent();
    },
    getUrlNum: function() {
      var self = this,
        url = location.href,
        str = "";
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
