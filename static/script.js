$(function() {
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
    highlightBox.animate({
      height: highlightBox.is(':visible') ? 'hide' : 'show',
      opacity: highlightBox.is(':visible') ? 0 : 1
    }, 150);
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
        var parent = $(this).parent();
        if (parent.attr("open")) {
          parent.removeAttr("open");
          if (parent.index() == self.num) {
            $(this).addClass("current");
          }
        } else {
          parent.attr("open", true);
          if (parent.index() == self.num) {
            $(this).removeClass("current");
          }
        }
        parent.find("ul").slideToggle(300);
      });
    }
  };
  listFunc.init();
});
