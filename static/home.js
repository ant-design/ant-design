$(function() {
  var animEndStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var getTransform = function() {
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
    return [style, anim, pers]
  };
  var bannerAnim={
    w:2185,
    h:1062,
    p_w:0,
    p_h:0,
    img:"https://t.alipayobjects.com/images/T1URpfXeXtXXXXXXXX.jpg",
    lineData:[
        {x:225,y:785,w:70,h:70,line:3,color:"#BEC4C8",anim:"from-x-left",rotate:-19,circ:{x:10,y:10,w:50,h:50}},
        {x:870,y:245,w:70,h:70,line:3,color:"#BEC4C8",anim:"from-x-left",circ:{x:10,y:10,w:50,h:50}},
        {x:940,y:455,w:230,h:110,line:3,color:"#6EB4E0",anim:"from-x-right",circ:[{x:20,y:15,w:80,h:80},{x:125,y:15,w:80,h:80}]},
        {x:1160,y:670,w:410,h:110,line:3,color:"#F0776F",anim:"from-y-bottom",circ:[{x:60,y:15,w:80,h:80},{x:165,y:15,w:80,h:80},{x:285,y:15,w:80,h:80}]},
        {x:1285,y:170,w:484,h:110,line:3,color:"#BEC4C8",anim:"from-y-top",circ:[{x:30,y:15,w:80,h:80},{x:145,y:15,w:80,h:80},{x:265,y:15,w:80,h:80},{x:375,y:15,w:80,h:80}]},
        {x:1330,y:520,w:70,h:70,line:3,color:"#F0776F",anim:"from-x-left",circ:{x:10,y:10,w:50,h:50}},
        {x:1435,y:365,w:200,h:190,line:3,color:"#BEC4C8",anim:"from-x-right",circ:[{x:20,y:10,w:75,h:75},{x:110,y:10,w:75,h:75},{x:20,y:100,w:75,h:75},{x:110,y:100,w:75,h:75}]},
        {x:1655,y:325,w:115,h:320,line:3,color:"#F0776F",anim:"from-x-right",circ:[{x:25,y:15,w:75,h:75},{x:35,y:25,w:55,h:55},{x:25,y:115,w:75,h:75},{x:35,y:125,w:55,h:55},{x:25,y:225,w:75,h:75},{x:35,y:235,w:55,h:55}]},
        {x:1680,y:735,w:70,h:70,line:3,color:"#F0776F",anim:"from-y-bottom",circ:{x:10,y:10,w:50,h:50}},
        {x:1845,y:485,w:115,h:410,line:3,color:"#6EB4E0",anim:"from-y-bottom",circ:[{x:25,y:15,w:75,h:75},{x:35,y:25,w:55,h:55},{x:25,y:115,w:75,h:75},{x:35,y:125,w:55,h:55},{x:25,y:215,w:75,h:75},{x:35,y:225,w:55,h:55},{x:25,y:310,w:75,h:75},{x:35,y:320,w:55,h:55}]},
        {x:1865,y:290,w:70,h:70,line:3,color:"#F0776F",anim:"from-y-top",circ:{x:10,y:10,w:50,h:50}},
        {x:1995,y:280,w:230,h:420,line:3,color:"#6EB4E0",anim:"from-x-right",circ:[{x:25,y:30,w:75,h:75},{x:35,y:40,w:55,h:55},{x:25,y:175,w:75,h:75},{x:35,y:185,w:55,h:55},{x:25,y:310,w:75,h:75},{x:35,y:320,w:55,h:55}, {x:130,y:30,w:75,h:75},{x:140,y:40,w:55,h:55},{x:130,y:175,w:75,h:75},{x:140,y:185,w:55,h:55},{x:130,y:310,w:75,h:75},{x:140,y:320,w:55,h:55}]},
    ],
    init: function() {
      var self = this;
      self.box = $(".banner-box");
      self.animBox = $("#bannerAnim");
      self.imgBox = $(".banner-img");
      self.loadImg();

    },
    loadImg: function() {
      var self = this;
      var loadBox = $("<div class='load-box'><em></em></div>").appendTo(self.animBox);
      var img = new Image();
      img.onload = function() {
        loadBox.addClass("load-out").one(animEndStr, function() {
          loadBox.remove();
          self.start();
        });
      };
      img.src = self.img;
    },
    bannerResize: function() {
      var self = bannerAnim;
      self.p_w = self.box.parent().width();
      self.p_h = self.box.parent().height();
      //获取比例；
      var w_s = self.p_w / self.w,
        h_s = self.p_h / self.h;
      var scale = w_s > h_s ? w_s : h_s;
      var tra = getTransform()[0];
      self.animBox.attr("style", "");
      self.imgBox.attr("style", "");
      var boxSty = {
        "width": self.w,
        "height": self.h
      };
      boxSty[tra] = "scale(" + scale + "," + scale + ")";
      self.animBox.css(boxSty);
      var imgSty = {};
      imgSty[tra] = "scale(" + scale + "," + scale + ")";
      self.imgBox.css(imgSty);
      if (w_s > h_s) {
        self.animBox.css("margin-top", (self.p_h - self.h * w_s) / 2);
        self.imgBox.css("margin-top", (self.p_h - self.h * w_s) / 2);
      } else {
        self.animBox.css("margin-left", (self.p_w - self.w * h_s) / 2);
        self.imgBox.css("margin-left", (self.p_w - self.w * h_s) / 2);
      }
    },
    start: function() {
      var self = this;
      var animClass = getTransform()[1] + "-delay";
      var parr = [];
      for (var i = 0; i < self.lineData.length; i++) {
        var mc = $(self.addLine(self.lineData[i])).appendTo(self.animBox);
        var delay = Math.random() * .7;
        parr.push(delay);
        mc.css(animClass, delay + "s");
      }
      var max = parr[0],
        j = 0;
      for (var i = 0; i < parr.length; i++) {
        if (max < parr[i]) {
          max = parr[i];
          j = i;
        }
      }
      //console.log(self.box.find(".delay-mode").eq(j),j);
      self.animBox.find(".delay-mode").eq(j).one(animEndStr, function() {
        self.animBox.addClass("to-img-blur");
        self.imgBox.addClass("from-img-blur").one(animEndStr, function() {
          self.animBox.remove()
        });
      });
      self.bannerResize();
      $(window).bind("resize", self.bannerResize);
    },
    addLine: function(obj) {
      var self = this;
      var transform = getTransform()[0];
      var rotate = obj.rotate ? transform + ":rotate(" + obj.rotate + "deg);" : "";
      var html = "<div class='banner-line-absolute delay-mode " + obj.anim + "' style='width: " + obj.w + "px;height:" + obj.h + "px;border: " + obj.line + "px solid " + obj.color + ";left:" + obj.x + "px;top:" + obj.y + "px;" + rotate + "'>";
      if (obj.circ.length) {
        for (var i = 0; i < obj.circ.length; i++) {
          html += "<div class='banner-line-absolute' style='width: " + obj.circ[i].w + "px;height:" + obj.circ[i].h + "px;border: " + obj.line + "px solid " + obj.color + ";left:" + (obj.circ[i].x - obj.line) + "px;top:" + (obj.circ[i].y - obj.line) + "px;border-radius:" + obj.circ[i].w + "px'></div>"
        }
      } else {
        html += "<div class='banner-line-absolute' style='width: " + obj.circ.w + "px;height:" + obj.circ.h + "px;border: " + obj.line + "px solid " + obj.color + ";left:" + (obj.circ.x - obj.line) + "px;top:" + (obj.circ.y - obj.line) + "px;border-radius:" + obj.circ.w + "px'></div>"
      }
      html += "</div>";
      return html
    }
  };

  $("#main").one(animEndStr, function() {
    bannerAnim.init()
  })

});
