/**
 * Created by jljsj on 15/6/3.
 */
$(function() {
  $.ajaxSetup({
    cache: true
  });
  var loadData = [
    "https://os.alipayobjects.com/rmsportal/PfhNcINWBAnMIWR.js", // easeljs-0.8.0.min.js
    "https://os.alipayobjects.com/rmsportal/nGFyCGHAblMWsYE.js", // TweenMax.min.js
    "/static/home.js",
    "https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"
  ];
  var animEndStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var loadFunc = {
    init: function() {
      var self = this;
      self.body = $("body");
      self.header = $("#header") || $("header");
      self.main = $(".main");
      self.footer = $("#footer") || $("footer");
      self.addLoad()
    },
    addLoad: function() {
      var self = this;
      self.loadBox = $("<div class='load-main-box'>" +
        "<div class='load-box'>" +
        "<em><img src='https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg' width='50' height='50'></em>" +
        "<span>Ant Design</span>" +
        "</div>" +
        "<div class='load-bar'></div>" +
        "</div>").appendTo(".banner-box");
      self.loadBar = self.loadBox.find(".load-bar");
      var loadText = self.loadBox.find("span"),
        str = loadText.text(),
        loadClass = ["yoyo-load0", "yoyo-load1", "yoyo-load2", "yoyo-load3", "yoyo-load4", "yoyo-load5"];
      loadText.empty();

      function c_random(num, arrlen) {
        var arr = [];

        function r(i) {
          var t = Math.round(Math.random() * (num - 1));
          if (t == arr[i - 1]) {
            r(i);
            return
          }
          arr.push(t)
        }
        for (var i = 0; i < arrlen; i++) {
          r(i)
        }
        return arr;
      }
      var tarr = c_random(loadClass.length, str.length);
      for (var i = 0; i < str.length; i++) {
        var t = str[i];
        if (t == " ") {
          t = "&nbsp;"
        }
        var _class = "yoyo-x-left";
        if (i > 0 && i < str.length - 1) {
          _class = loadClass[tarr[i]]
        }
        if (i == str.length - 1) {
          _class = 'yoyo-x-right'
        }
        loadText.append("<p class='" + _class + "'>" + t + "</p>")
      }
      self.load()
    },
    load: function() {
      var self = this,
        num = 0;

      function endLoad() {
        self.loadBox.addClass("load-out").one(animEndStr, function() {
          self.loadBox.remove();
          bannerAnim.init();
        });
      }

      function getLoad() {
        var str = loadData[num];
        if (str.indexOf(".js") >= 0) {
          $.getScript(str.indexOf('http') === 0 ? str : (rootUrl + str), function() {
            num++;
            self.loadBar.css("width", num / loadData.length * 100 + "%");
            if (num >= loadData.length) {
              setTimeout(endLoad, 300);
            } else {
              getLoad();
            }
          })
        } else {
          var img = new Image();
          img.onload = img.onerror = function() {
            num++;
            self.loadBar.css("width", num / loadData.length * 100 + "%");
            if (num >= loadData.length) {
              setTimeout(endLoad, 300);
            } else {
              getLoad();
            }
          };
          img.src = str;
        }
      }
      getLoad();
    }
  };

  $().ready(function() {
    loadFunc.init()
  });
});
