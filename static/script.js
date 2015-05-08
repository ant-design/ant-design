/**
 * Created by jljsj on 15/5/4.
 */
(function($) {

  var animEndStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var testlink = "/";
  window.getTransform = function() {
    var style = "transform",
      anim = "animation",
      pers = "perspective";
    var i, prefix = ['webkit', 'moz', 'ms', 'o'],
      htmlStyle = $("html")[0].style;
    if (!"transform" in htmlStyle) {
      for (i in prefix) {
        style = "-" + prefix[i] + "-transform";
        if (style in htmlStyle) break;
      }
    }
    if (!"animation" in htmlStyle) {
      for (i in prefix) {
        anim = "-" + prefix[i] + "-animation";
        if (anim in htmlStyle) break;
      }
    }
    if (!"perspective" in htmlStyle) {
      for (i in prefix) {
        pers = "-" + prefix[i] + "-perspective";
        if (pers in htmlStyle) break;
      }
    }
    return [style, anim, pers];
  };

  var homeFunc = {
    navStrArr: [],
    mainElementArr: [
      ["js/ant-home.js?bannerAnim"],
      [],
      ["js/ant-list-nav.js?listFunc", "images/banner.jpg?r=12345"],
      [],
      [],
      []
    ],
    navNum: 0,
    callStr: [],
    init: function() {
      var self = this;
      self.navBox = $(".nav");
      self.navBar = self.navBox.find(".bar");
      self.navList = self.navBox.find("ul li");
      for (var i = 0; i < self.navList.length; i++) {
        var linkStr = self.navList.eq(i).find("a").attr("href").replace(".html", "").replace(/.*#/, "/").split("/")[0];
        linkStr = linkStr == "" ? "index" : linkStr;
        self.navStrArr.push(linkStr);
      }
      self.mainBox = $(".main");
      self.search($(".search"));
      self.getUrl();
      self.navBarAnim();
      self.historyState();
      self.navResize(null);
      $(window).bind("resize", self.homeResize);
    },
    navResize: function(e) {
      var self = homeFunc;
      self.navBar.css("left", self.navList.width() * self.navNum);
      self.navList.eq(self.navNum).find("a").addClass("hover");
    },
    getUrl: function() {
      var self = this;
      var url = location.href;
      var urlArr = url.split("/");
      var links = "/";
      for (var i = 3; i < urlArr.length; i++) {
        if (i >= urlArr.length - 1) {
          links += urlArr[i];
        } else {
          links += urlArr[i] + "/";
        }
      }
      if (links !== testlink && links !== "/" && links !== testlink + "index") {
        if (links.indexOf("#") >= 0) {
          links = links.replace(/^#/g, "/");
          History.pushState(null, document.title ? document.title : "Ant Design", links);
        }
        self.LoadPage(links);
        //$("#main").css("opacity",0);
      }
      for (var i = 0; i < self.navStrArr.length; i++) {
        if (links.indexOf(self.navStrArr[i]) >= 0) {
          self.navNum = i;
          break;
        }
      }
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
        self.navBar.css("left", $(m).width() * $(m).index());
      });
      self.navList.bind("mouseleave", function(e) {
        delay = setTimeout(function() {
          startBarAnim(self.navNum);
        }, 500);
      });
      self.navList.click(function(e) {
        e.preventDefault();
        var mc = $(e.currentTarget);
        if (!self.loadBool && location.href.indexOf(self.navStrArr[mc.index()]) < 0) {
          History.pushState(null, document.title ? document.title : "Ant Design", testlink + self.navStrArr[mc.index()]);
        }
      });
    },
    historyState: function() {
      var self = this;
      History.Adapter.bind(window, 'statechange', function() {
        var State = History.getState();
        //算self.navNum;
        for (var i = 0; i < self.navStrArr.length; i++) {
          if (State.hash == "/" || State.hash == testlink || !State.hash) {
            self.navNum = 0;
            break;
          }
          if (State.hash.indexOf(self.navStrArr[i]) >= 0) {
            self.navNum = i;
            break;
          }
        }
        self.LoadPage(State.hash);
      });
    },
    LoadPage: function(hash) {
      var self = homeFunc;
      var loading = $("<div class='load-main-box'><div class='load-box'><em></em></div></div>").appendTo($("body"));
      self.loadBool = true;
      $.ajax({
        url: hash,
        global: false,
        type: "GET",
        success: function(data) {
          //判断内页还是导航上点的。
          var linkStr = self.navStrArr[self.navNum];
          var str = hash.split(linkStr)[1];
          var contentId = $("#" + linkStr);
          if (!str || str == "/" || contentId.length <= 0) {
            self.Loading(self.mainElementArr[self.navNum], function() {
              $(".load-main-box").addClass("alpha-out").one(animEndStr, function() {
                this.remove();
                self.loadBool = false;
                $("#main").addClass("alpha-out").one(animEndStr, function() {
                  this.remove();
                  var main = $(data).find("#main").addClass("no-delay").appendTo(self.mainBox);
                  main.one(animEndStr, function() {
                    if (self.callStr.length > 0) {
                      for (var i = 0; i < self.callStr.length; i++) {
                        eval(self.callStr[i] + ".init()");
                      }
                    }
                  });
                });
              });
            });
          } else {
            $(".load-main-box").remove();
            self.loadBool = false;
            $(contentId).addClass("alpha-out").one(animEndStr, function() {
              this.remove();
              var content = $(data).find("#" + linkStr).addClass("no-delay").appendTo($("#main"));
            });
          }
          document.title = document.title ? document.title : "Ant Design";
        },
        error: function(XMLHttpRequest, textStatus, thrownError) {
          location.href = testlink + "/404.html";
        }
      });
    },
    Loading: function(obj, call, callData) {
      var num = 0;
      if (obj.length <= 0) {
        if (typeof call === 'function') {
          call(callData);
          return;
        }
      }
      homeFunc.callStr = [];
      for (var i = 0; i < obj.length; i++) {
        var url = obj[i];
        if (url.indexOf(".js") >= 0) {
          if (url.split("?")[1]) homeFunc.callStr.push(url.split("?")[1]);
          url = url.split("?")[0];
          var isBool = false,
            body = $("body");
          for (var j = 0; j < body.children().length; j++) {
            var m = body.children().eq(j);
            if (m[0].nodeName == "SCRIPT") {
              var u = url.replace(/[.js]*$/, ""),
                mat = m.attr("src").replace(testlink, "").replace(/[.js]*$/, "");
              if (u.indexOf(mat) >= 0 || mat.indexOf(u) > 0) {
                isBool = true;
                break;
              }
            }
          }
          if (!isBool)
            $("<script src=" + (testlink + url) + "></script>").appendTo($("body"));
          num++;
          if (num >= obj.length) {
            if (typeof call === 'function') {
              call(callData);
            }
          }
        } else {
          var img = new Image();
          img.onload = img.onerror = function() {
            num++;
            if (num >= obj.length) {
              if (typeof call === 'function') {
                call(callData);
              }
            }
          };
          img.src = testlink + url;
        }
      }
    }
  };
  window.homeFunc = homeFunc;

  $().ready(function() {
    homeFunc.init();
  });

})(jQuery);
