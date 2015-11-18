/**
 * Created by jljsj on 15/9/16.
 */
var TweenMax = TweenMax, Motion = Motion;
$(function () {
  var needData = [
    "https://os.alipayobjects.com/rmsportal/nGFyCGHAblMWsYE.js",  // TweenMax.min.js
    "/static/motion.js"
  ];
  var loadFunc = {
    num: 0,
    numSub: function (_callback) {
      this.num++;
      if (this.num >= needData.length) {
        if (typeof _callback === 'function') {
          _callback();
        }
      } else {
        this.getLoad(_callback);
      }
    },
    getLoad: function (_callback) {
      var self = this, str = needData[self.num];
      if (str.indexOf(".js") >= 0) {
        if ((str.indexOf('nGFyCGHAblMWsYE') >= 0 && TweenMax) || (str.indexOf('motion.js') >= 0 && Motion)) {
          self.numSub(_callback)
        } else {
          $.getScript(str.indexOf('http') === 0 ? str : (rootUrl + str), function() {
            self.numSub(_callback)
          })
        }
      }
    }
  };
  var callback = function () {
      Motion.motionVideo.init()
    },
    scripts = document.getElementsByTagName("script"),
    urlData = [];
  for (var i = 0; i < scripts.length; i++) {
    var sc = scripts[i].src, str = sc.split('?')[1];
    if (sc.indexOf('motionDemoLoad.js') >= 0 && str) {
      var d = str.split('&');
      urlData = d.map(function (s) {
        return {name: s.split('=')[0], param: s.split('=')[1]};
      });
    }
  }
  urlData.map(function (m) {
    if (m.param === 'easing') {
      callback = function () {
        new Motion("#J-Linear", {
          lineData: [{stroke: "#f2666c"}, {
            stroke: "#71B5DE",
            openEaseName: "easeInOutQuad",
            endEaseName: "easeInOutQuad"
          }], mask: false
        });
        new Motion("#J-Symmetric", {
          lineData: [
            {openEaseName: "easeInOutQuad", endEaseName: "null", stroke: "#f2666c"},
            {stroke: "#71B5DE", openEaseName: "easeInOutCubic", endEaseName: "easeInOutCubic"}],
          mask: false, exposure: "top"
        });
        new Motion("#J-Entry", {
          lineData: [
            {openEaseName: "easeOutQuad", endEaseName: "easeOutQuad", stroke: "#f2666c"},
            {stroke: "#71B5DE", openEaseName: "easeOutCubic", endEaseName: "easeInCubic"}],
          mask: true, exposure: "bottom"
        });
        new Motion("#J-Back", {
          lineData: [
            {openEaseName: "easeOutBounce", endEaseName: "easeOutElastic", stroke: "#70f266"},
            {stroke: "#71B5DE", openEaseName: "easeOutBack", endEaseName: "easeInOutBack"}],
          mask: false, exposure: "top"
        });
      }
    }
  });
  loadFunc.getLoad(callback);
});
