/**
 * Created by jljsj on 15/6/24.
 */
$(function() {
  var $S = function(typename) {
    if (typename.indexOf("<") >= 0) {
      var node = $(typename);
      var node_m = $(document.createElementNS("http://www.w3.org/2000/svg", node[0].tagName.toLowerCase()));
      //var node_b=typename.replace(/<[^\s]*|[>,/>]*/gi,"");
      for (var i = 0; i < node[0].attributes.length; i++) {
        node_m.attr(node[0].attributes[i].name, node[0].attributes[i].value);
      }
      node_m.html(node.html());
      return node_m
    }
    return $(document.createElementNS("http://www.w3.org/2000/svg", typename))
  };
  var SVG = (function() {
    var s_node = function(s) {
      if (s) {
        this.node = $S(s);
      }
    };
    var n = s_node.prototype = {
      _x: 0,
      _y: 0,
      _scaleX: 1,
      _scaleY: 1,
      _rotation: 0,
      _skewX: 0,
      _skewY: 0,
      set id(id) {
        this.attr("id", id)
      },
      get id() {
        return this.attr("id")
      },
      set x(x) {
        this.setTransform(x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY);
      },
      get x() {
        return this._x
      },
      set y(y) {
        this.setTransform(this._x, y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY);
      },
      get y() {
        return this._y
      },
      set scale(x) {
        this.setTransform(this._x, this._y, x, x, this._rotation, this._skewX, this._skewY);
      },
      get scale() {
        return this._scaleX == this._scaleY ? this._scaleX : {
          scaleX: this._scaleX,
          scaleY: this._scaleY
        }
      },
      set scaleX(x) {
        this.setTransform(this._x, this._y, x, this._scaleY, this._rotation, this._skewX, this._skewY);
      },
      get scaleX() {
        return this._scaleX
      },
      set scaleY(y) {
        this.setTransform(this._x, this._y, this._scaleX, y, this._rotation, this._skewX, this._skewY);
      },
      get scaleY() {
        return this._scaleY
      },
      set rotation(r) {
        this.setTransform(this._x, this._y, this._scaleX, this._scaleY, r, this._skewX, this._skewY);
      },
      get rotation() {
        return this._rotation
      },
      set skewX(x) {
        this.setTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, x, this._skewY);
      },
      get skewX() {
        return this._skewX
      },
      set skewY(y) {
        this.setTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, y);
      },
      get skewY() {
        return this._skewY
      },
      set alpha(a) {
        this.attr("opacity", a.toString())
      },
      get alpha() {
        return Number(this.attr("opacity")) >= 0 ? Number(this.attr("opacity")) : 1
      },
      set mouseEnabled(Bool) {
        if (Bool) {
          this.attr("cursor", "pointer")
        }
      },
      get mouseEnabled() {
        return !!this.attr("cursor");
      }
    };
    n.attr = function(o, d) {
      return d ? this.node.attr(o, d) : this.node.attr(o)
    };
    n.css = function(o, d) {
      return d ? this.node.css(o, d) : this.node.css(o);
    };
    n.children = function() {
      return this.node.children()
    };
    n.find = function(s) {
      return this.node.find(s);
    };
    n.addEventListener = function(event, func) {
      return this.node.bind(event, func);
    };
    n.bind = function(event, func) {
      return this.node.bind(event, func);
    };
    n.setTransform = function(x, y, scaleX, scaleY, rotation, skewX, skewY) {
      var x = x || 0,
        y = y || 0,
        scaleX = scaleX >= 0 ? scaleX : 1,
        scaleY = scaleY >= 0 ? scaleY : 1,
        rotation = rotation || 0,
        skewX = skewX || 0,
        skewY = skewY || 0;
      this._x = x, this._y = y, this._scaleX = scaleX, this._scaleY = scaleY,
        this._rotation = rotation, this._skewX = skewX, this._skewY = skewY;
      var DEG_TO_RAD = Math.PI / 180;
      var Matrix = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0,
        initialize: function(a, b, c, d, tx, ty) {
          var a1 = this.a;
          var b1 = this.b;
          var c1 = this.c;
          var d1 = this.d;
          this.a = a * a1 + b * c1;
          this.b = a * b1 + b * d1;
          this.c = c * a1 + d * c1;
          this.d = c * b1 + d * d1;
          this.tx = tx * a1 + ty * c1 + this.tx;
          this.ty = tx * b1 + ty * d1 + this.ty;
          return this
        }
      };
      if (rotation % 360) {
        var r = rotation * DEG_TO_RAD;
        var cos = Math.cos(r);
        var sin = Math.sin(r);
      } else {
        cos = 1;
        sin = 0;
      }
      var t = Matrix;
      if (skewX || skewY) {
        skewX = skewX * DEG_TO_RAD || 0;
        skewY = skewY * DEG_TO_RAD || 0;
        t.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        t.initialize(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
      } else {
        t.initialize(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
      }
      var val = "matrix(" + t.a + "," + t.b + "," + t.c + "," + t.d + "," + t.tx + "," + t.ty + ")";
      this.attr("transform", val)
    };
    n.addChild = function(elem) {
      if (elem.node) this.node.append(elem.node);
      else this.node.append(elem);
    };
    n.clear = function(index) {
      if (index >= 0) {
        this.node.children().eq(index).remove();
        return
      }
      return this.node.children().remove();
    };
    n.setFilter = function(dom) {
      this.attr("filter", "url(#" + dom.attr("id") + ")")
    };
    n.setClipPath = function(dom) {
      this.attr("clip-path", "url(#" + dom.attr("id") + ")");
    };
    var SectorStr = function(point, r, angle, startAngle, inr) {
      angle = (Math.abs(angle) > 360) ? 360 : angle;
      var flag = angle > 180 ? 1 : 0;
      startAngle = startAngle * Math.PI / 180;
      var str = ""; //"M"+point.x+" "+point.y;
      str += " M" + (point.x + r * Math.cos(startAngle)) + " " + (point.y + r * Math.sin(startAngle))
      var angleA, cx, cy;
      if (angle >= 360) {
        angleA = angle / 2;
        angleA = angleA * Math.PI / 180;
        angleA = angleA + startAngle;
        for (var i = 0; i < 2; i++) {
          cx = point.x + r * Math.cos(angleA + i * Math.PI);
          cy = point.y + r * Math.sin(angleA + i * Math.PI);
          str += "A" + r + " " + r + " 0 1 1 " + cx + " " + cy;
        }
        str += " Z";
        return str;
      }
      angle = angle * Math.PI / 180;
      angleA = angle + startAngle;

      cx = point.x + r * Math.cos(angleA);
      cy = point.y + r * Math.sin(angleA);
      str += "A" + r + " " + r + " 0 " + flag + " 1 " + cx + " " + cy;
      if (angle < Math.PI * 2) {
        str += " L" + point.x + " " + point.y
      }
      //画内圆；
      if (inr) {
        cx = point.x + inr * Math.cos(angleA);
        cy = point.y + inr * Math.sin(angleA);
        str += "L" + cx + " " + cy;
        cx = point.x + inr * Math.cos(startAngle);
        cy = point.y + inr * Math.sin(startAngle);
        str += "A" + inr + " " + inr + " 0 " + flag + " 0 " + cx + " " + cy;
      }
      str += " Z";
      return str;
    };
    var Sprite = function(s) {
      if (s) {
        this.node = $S(s);
      }
    };
    var sp = Sprite.prototype = new s_node();

    sp.drawRect = function(obj) {
      var t = new SVG.Sprite("rect");
      t.attr(obj).appendTo(this.node);
      return t
    };
    sp.drawCirc = function(obj) {
      var t = new SVG.Sprite("circle");
      t.attr(obj).appendTo(this.node);
      return t
    };
    sp.drawPolygon = function(obj) {
      var t = new SVG.Sprite("polygon");
      t.attr(obj).appendTo(this.node);
      return t
    };
    sp.drawPath = function(obj) {
      var t = new SVG.Sprite("path");
      t.attr(obj).appendTo(this.node);
      return t
    };
    sp.drawEllipse = function(obj) {
      var t = new SVG.Sprite("ellipse");
      t.attr(obj).appendTo(this.node);
      return t
    };
    sp.drawSector = function(point, r, angle, startAngle, color, line, lineColor) {
      var str = SectorStr(point, r, angle, startAngle, 1);
      var m = $S("path").attr("fill", color);
      if (line) {
        m.attr({
          stroke: lineColor,
          "stroke-width": line
        });
      }
      m.attr("d", str).appendTo(this.node);
      return m
    };
    sp.drawAnnular = function(point, r, inr, angle, startAngle, color, line, lineColor) {
      var str = SectorStr(point, r, angle, startAngle, inr);
      var m = $S("path").attr("fill", color);
      if (line) {
        m.attr({
          stroke: lineColor,
          "stroke-width": line
        });
      }
      m.attr("d", str).appendTo(this.node);
      return m
    };

    function svg(id) {
      this.initialize(id);
    }

    var s = svg.prototype = new Sprite();
    s.initialize = function(id) {
      this.node = $S("svg");
      this.attr({
        "width": "100%",
        "height": "100%"
      });
      this.defs = new Sprite("defs");
      this.addChild(this.defs);
      if (id)
        $(id).append(this.node);
      else
        return this;
    };
    var filter = {
      blur: function(x, y) {
        if (x == null) {
          x = 2;
        }
        var def = y == null ? x : [x, y];
        var t = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        t.setAttribute("stdDeviation", def);
        var filter = $S("filter");
        filter.attr({
          x: "-50%",
          y: "-50%",
          "width": "200%",
          "height": "200%"
        });
        filter.append(t);
        Object.defineProperty(filter, "id", {
          get: function() {
            return filter.attr("id");
          },
          set: function(id) {
            filter.attr("id", id);
          }
        });
        return filter
      },
      goo: function(blur) {
        var t = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
        t.setAttribute("in", "SourceGraphic");
        t.setAttribute("stdDeviation", blur);
        t.setAttribute("result", "blur");
        var matrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
        matrix.setAttribute("in", "blur");
        matrix.setAttribute("mode", "matrix");
        matrix.setAttribute("values", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6");
        matrix.setAttribute("result", "goo");
        var com = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
        com.setAttribute("in", "SourceGraphic");
        com.setAttribute("in2", "goo");
        com.setAttribute("operator", "atop");
        var filter = $S("filter");
        filter.append([t, matrix, com]);
        return filter
      },
      mask: function(tb, obj) {
        var t = $S(tb);
        t.attr(obj);
        var cp = $S("clipPath");
        cp.append(t);
        Object.defineProperty(cp, "id", {
          get: function() {
            return cp.attr("id");
          },
          set: function(id) {
            cp.attr("id", id);
          }
        });
        //var cp=document.createElementNS("http://www.w3.org/2000/svg","clipPath");//$S("clippath");
        //cp.appendChild(t[0]);
        //Object.defineProperty(cp,"id",{
        //    get:function (){
        //        return cp.getAttribute("id");
        //    },
        //    set:function (id){
        //        cp.setAttribute("id",id);
        //    }
        //});
        return cp;
      }
    };
    var text = function(_text, _data) {
      this.node = $S("text");
      this.node.text(_text);
      if (_data) {
        this.node.attr(_data);
      }
    };
    var t = text.prototype = new s_node;
    t.tspan = function(_text, _data) {
      this.node = $S("tspan");
      this.node.text(_text);
      if (_data) {
        this.node.attr(_data);
      }
    };
    var ts = t.tspan.prototype = new s_node();

    svg.SectorStr = SectorStr;
    svg.filter = filter;
    svg.Sprite = Sprite;
    svg.Text = text;
    svg.Text.tSpan = t.tspan;
    return svg
  }());
  var Point = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };
  var T = TweenMax;
  var _playBox = function(svg, startFunc, pauseFunc) {
    var playBox = new SVG.Sprite("g");
    playBox.mouseEnabled = true;

    playBox.drawRect({
      width: "100%",
      height: "100%",
      fill: "rgba(0,0,0,.35)"
    });
    var playBtn = new SVG.Sprite("g");
    playBox.addChild(playBtn);
    playBtn.drawCirc({
      r: 30,
      fill: "rgba(255,255,255,1)"
    });

    var playPoints = {
      play: "M-10 -15 L15 0 L-10 15 L-10 0Z M-10 -15 L15 0 L-10 15 L-10 0Z",
      pause: "M-12 -15 L-3 -15 L-3 15 L-12 15Z M3 -15 L12 -15 L12 15 L3 15Z"
    };
    var shanjiao = playBtn.drawPath({
      d: playPoints.play,
      fill: "#999"
    });
    var bBool = false;
    var animate_p3 = function(p, _arr) {
      var a_arr = [];
      for (var i = 0; i < _arr.length; i++) {
        a_arr.push(_arr[i].x, _arr[i].y)
      }
      for (var i = 0; i < a_arr.length; i++) {
        if (i == 0 || i == 8) {
          a_arr[i] = "M" + a_arr[i];
        } else if (i == 2 || i == 4 || i == 6 || i == 12 || i == 14) {
          a_arr[i] = "L" + a_arr[i];
        } else if (i == 7 || i == 15) {
          a_arr[i] = a_arr[i] + "Z";
        }
      }
      p.attr({
        d: a_arr.join().replace(/,/g, " ")
      });

    };

    function twennBtn(p, arr, c_arr) {
      for (var i = 0; i < arr.length; i++) {
        T.killTweensOf(arr[i]);
        T.to(arr[i], .6, {
          x: c_arr[i].x,
          y: c_arr[i].y,
          delay: Math.random() * .2,
          onUpdate: animate_p3,
          onUpdateParams: [p, arr],
          ease: Elastic.easeOut
        })
      }
    }

    playBox.addEventListener("click", function(e) {
      var _a = playPoints.play.replace(/[MLZ]/g, "").split(" ");
      var _b = playPoints.pause.replace(/[MLZ]/g, "").split(" ");
      var _arr = [],
        _barr = [];
      for (var i = 0; i < _a.length; i += 2) {
        var a = {},
          b = {};
        a.x = _a[i];
        a.y = _a[i + 1];
        b.x = _b[i];
        b.y = _b[i + 1];
        _arr.push(a);
        _barr.push(b);
      }
      if (!bBool) {
        twennBtn(shanjiao, _arr, _barr);
        T.to(playBox, .5, {
          delay: .3,
          alpha: 0,
          onComplete: startFunc
        });
        bBool = true;
      } else {
        twennBtn(shanjiao, _barr, _arr);
        T.to(playBox, .5, {
          alpha: 1,
          onStart: pauseFunc
        });
        bBool = false
      }
    });

    function resize() {
      playBtn.x = svg.node.width() / 2;
      playBtn.y = svg.node.height() / 2;
    }

    resize();
    $(window).bind("resize", resize);
    return playBox;
  };
  var newMotion = function(id, obj) {
    if (!id || !obj) {
      throw new Error("数据错误");
    }
    var self = this;
    self.box = $(id);
    self.box.css({
      "width": 800
    });
    if (self.box.width() < 500) {
      self.box.css("height", 600);
    } else {
      self.box.css("height", 300)
    }
    self.data = obj;
    self.svg = new SVG(id);
    self.svg.css("background-color", "#f3f3f3");
    self.w = self.box.width();
    self.h = self.box.height();
    self.tweenArr = [];
    self.t_time = .5;
    self.d_time = .5;
    self.tweenAllTime = self.t_time * 2 + self.d_time;

    self.addElement();

    function resize(e) {
      self.windowResize(self)
    }

    resize();
    $(window).bind("resize", resize);
  };
  var nm = newMotion.prototype = {};
  nm.windowResize = function(self) {
    var s = self.box.parent().width() / 800 > 1 ? 1 : self.box.parent().width() / 800;
    self.box.css({
      "transform": "scale(" + s + ")",
      "transform-origin": "0 0"
    });
  };
  nm.addElement = function() {
    var self = this;
    //绘制坐标系统；
    self.coords = new SVG.Sprite("g");
    self.svg.addChild(self.coords);
    var coordsStr = "M80 50 L80 250 L480 250";
    self.coords.drawPath({
      d: coordsStr,
      fill: "none",
      "stroke-width": 2,
      stroke: "#d9d9d9"
    });
    var timerTxt = new SVG.Text("timer", {
      fill: "#999"
    });
    self.coords.addChild(timerTxt);
    timerTxt.x = 240;
    timerTxt.y = 275;
    var yaxis = new SVG.Text("Y-axis", {
      fill: "#999"
    });
    yaxis.width = 20;
    yaxis.x = 20;
    yaxis.y = 150;
    self.coords.addChild(yaxis);
    //动画示例元素；
    self.tweenMc = new SVG.Sprite("g");
    if (self.data.mask) {
      var mask = new SVG.filter.mask("rect", {
        width: 260,
        height: 200
      });
      mask.id = "mask";
      self.svg.defs.addChild(mask);
      self.tweenMc.setClipPath(mask);
    }

    self.svg.addChild(self.tweenMc);
    self.tweenMc.x = 500;
    self.tweenMc.y = 50;
    //坐标线；
    /**
     * 以三次贝塞尔曲线
     * 时间长4秒
     * －分三段－
     * linear
     * .5－－.5－－.5
     */
    var c_w = 340,
      c_h = 180,
      c_x = 100,
      c_y = 250,
      ct_y = 70,
      t_w = c_w * (self.t_time / self.tweenAllTime),
      tt_w = t_w + c_x,
      d_w = (self.t_time + self.d_time) / self.tweenAllTime;

    for (var i = 0; i < self.data.lineData.length; i++) {
      var tb = new SVG.Sprite("g");
      self.coords.addChild(tb);
      var str = "M80 250";
      var open = self.data.lineData[i].open || self.data.lineData[i].openEaseName || "Linear";
      /*if (open.length !== 4 && open.length !== 0 && typeof open !== 'string') {
       throw new Error(open + "数据错误");
       }*/
      if (typeof open !== 'string' && open.length !== 0 && open.length === 4) {
        str += "L100 250" + "C" + (open[0] * t_w + c_x) + "," + (c_y - open[1] * c_h) + " " + (open[2] * t_w + c_x) + "," + (c_y - open[3] * c_h) + " " + tt_w + "," + ct_y
      } else if (typeof open === 'string') {
        var _ease = EaseLookup.find(open);
        if (_ease) {
          str += 'L100 250';
          for (var ii = 0; ii < t_w; ii++) {
            var at = _ease.getRatio(ii / t_w); //延用grennsock的缓运。。
            //console.log(1-Tween.Bounce.easeOut(ii,100,-100,t_w)/100,at);
            str += 'L' + (c_x + ii) + "," + (c_y - c_h * at);
          }
        } else {
          if (open !== 'null') {
            str += "L100 250" + "L" + tt_w + "," + ct_y;
          } else {
            str += "M100 250";
          }
        }
      }
      tb.drawPath({
        d: str,
        fill: "none",
        "stroke-width": 2,
        stroke: self.data.lineData[i].stroke || "#999",
        "stroke-dasharray": "0 100%"
      });

      var e_x = c_w * d_w + c_x;
      str = "M" + tt_w + "," + ct_y + "L" + e_x + "," + ct_y;
      tb.drawPath({
        d: str,
        fill: "none",
        "stroke-width": 2,
        stroke: self.data.lineData[i].stroke || "#999",
        "stroke-dasharray": "0 100%"
      });
      var end = self.data.lineData[i].end || self.data.lineData[i].endEaseName || "Linear";

      str = "M" + e_x + "," + ct_y;
      if (typeof open !== 'string' && end.length !== 0 && end.length === 4) {
        str += "C" + (end[0] * t_w + e_x) + "," + (end[1] * c_h + ct_y) + " " + (end[2] * t_w + e_x) + "," + (end[3] * c_h + ct_y) + " " + (c_w + c_x) + "," + c_y + "L" + (c_w + c_x + 20) + "," + c_y
      } else if (typeof end === 'string') {
        var e_ease = EaseLookup.find(end);
        if (e_ease) {
          for (var eii = 0; eii < t_w; eii++) {
            var eat = e_ease.getRatio(eii / t_w);
            str += 'L' + (e_x + eii) + "," + (c_h * eat + ct_y);
          }
          str += "L" + (c_w + c_x + 20) + "," + c_y;
        } else {
          //str += "L" + (c_w + c_x ) + "," + c_y + "L" + (c_w + c_x + 20) + "," + c_y;
          if (end !== "null") {
            str += "L" + (c_w + c_x) + "," + c_y + "L" + (c_w + c_x + 20) + "," + c_y;
          } else {
            str += "L" + e_x + "," + ct_y;
          }
        }
      }
      tb.drawPath({
        d: str,
        fill: "none",
        "stroke-width": 2,
        stroke: self.data.lineData[i].stroke || "#999",
        "stroke-dasharray": "0 100%"
      });

      //元素插入盒子里；
      var circ = new SVG.Sprite("circle");
      circ.attr({
        "r": 10,
        fill: "none",
        "stroke-width": 6,
        stroke: self.data.lineData[i].stroke || "#999"
      });
      self.tweenMc.addChild(circ);
      if (self.data.exposure == "left" || !self.data.exposure) {
        circ.x = self.data.mask ? -20 : 20;
        circ.y = 50 + i * 110; //self.data.mask?240:180;
      } else if (self.data.exposure == "top") {
        circ.x = 100 + i * 100; //self.data.mask?-20:20;
        circ.y = self.data.mask ? -20 : 20;
      } else if (self.data.exposure == "right") {
        circ.x = self.data.mask ? 280 : 220;
        circ.y = 50 + i * 110; //self.data.mask?240:180;
      } else {
        circ.x = 100 + i * 100; //self.data.mask?-20:20;
        circ.y = self.data.mask ? 240 : 180;
      }

    }

    //建播放按钮；
    self.playBox = _playBox(self.svg, function() {
      self.start(self);
    }, function() {
      self.pause(self);
    });
    self.svg.addChild(self.playBox);
  };
  nm.pause = function(self) {
    for (var i = 0; i < self.tweenArr.length; i++) {
      var tl = self.tweenArr[i];
      tl.pause();
    }
  };
  nm.resume = function(self) {
    for (var i = 0; i < self.tweenArr.length; i++) {
      var tl = self.tweenArr[i];
      tl.resume();
    }
  };
  nm.start = function(self) {
    if (self.tweenArr.length) {
      self.resume(self);
      return
    }
    var lineBox = self.coords.find("g");
    for (var i = 0; i < lineBox.length; i++) {
      var m = lineBox.eq(i);
      var tl = new TimelineMax({
        repeat: -1,
        repeatDelay: 1
      });
      self.tweenArr.push(tl);
      for (var ii = 0; ii < m.find("path").length; ii++) {
        var p = m.find("path").eq(ii);
        var lineLength = p[0].getTotalLength();
        var time = 1,
          _ease = Power2.easeInOut;

        if (ii == 0) {
          time = self.t_time;
          //_ease = EaseLookup.find(self.data.lineData[i].openEaseName);
        } else if (ii == 1) {
          time = self.d_time;
          //_ease = Power0.easeNone;
        } else {
          time = self.t_time;
          //_ease = EaseLookup.find(self.data.lineData[i].endEaseName);
        }
        /*if (!self.data.lineData[i].open.length) {
         _ease = Linear.easeNone;
         }*/
        tl.add(T.to(p, time, {
          "stroke-dasharray": lineLength + " 100%",
          ease: Linear.easeNone
        }));
        //tl.to(p,time,{"stroke-dasharray":"100% 100%",ease: Power2.easeInOut})
      }
      //circ动画
      var ctl = new TimelineMax({
        repeat: -1,
        repeatDelay: 1
      });
      var ciric = self.tweenMc.children().eq(i);

      var oease = EaseLookup.find(self.data.lineData[i].openEaseName) || Linear.easeNone,
        eease = EaseLookup.find(self.data.lineData[i].endEaseName) || Linear.easeNone;
      //console.log(self.data.lineData[i].open,oease,eease,i);
      //if(self.data.lineData[i].openEaseName=="Bounce.easeOut")
      if (self.data.lineData[i].openEaseName && self.data.lineData[i].openEaseName.indexOf("Bounce") >= 0) {
        if (self.data.lineData[i].openEaseName.indexOf("InOut") >= 0) {
          oease = Bounce.easeInOut
        } else if (self.data.lineData[i].openEaseName.indexOf("In") >= 0) {
          oease = Bounce.easeIn
        } else {
          oease = Bounce.easeOut
        }
      }
      var cx = {},
        _x = {};
      if (self.data.exposure == "left" || !self.data.exposure) {
        _x = {
          x: 240
        };
        cx = {
          x: self.data.mask ? -20 : 20
        };
      } else if (self.data.exposure == "top") {
        _x = {
          y: 180
        };
        cx = {
          y: self.data.mask ? -20 : 20
        };
      } else if (self.data.exposure == "right") {
        _x = {
          x: 20
        };
        cx = {
          x: self.data.mask ? 280 : 220
        };
      } else {
        _x = {
          y: 20
        };
        cx = {
          y: self.data.mask ? 240 : 180
        };
      }
      if (self.data.lineData[i].openEaseName === "null" && self.data.lineData[i].endEaseName === "null") {
        var t = cx;
        cx = {};
        cx.startAt = t;
        cx.delay = self.d_time;
        var tt = _x;
        _x = {};
        _x.startAt = tt;
      } else if (self.data.lineData[i].openEaseName === "null") {
        var tt = _x;
        _x = {};
        _x.startAt = tt;
        cx.ease = eease, cx.delay = self.d_time;
      } else if (self.data.lineData[i].endEaseName === "null") {
        var t = cx;
        cx = {};
        cx.startAt = t;
        cx.delay = self.d_time;
        _x.ease = oease;
      } else {
        _x.ease = oease, cx.ease = eease, cx.delay = self.d_time;
      }
      ctl.to(ciric, self.t_time, _x).to(ciric, self.t_time, cx);
      self.tweenArr.push(ctl);
    }
  };
  window.Motion = newMotion;

  var motionVideo = {
    video: ['https://t.alipayobjects.com/images/rmsweb/T1yHhhXfxkXXXXXXXX.webm', 'https://t.alipayobjects.com/images/rmsweb/T12I8gXexdXXXXXXXX.webm', 'https://t.alipayobjects.com/images/rmsweb/T1br0gXghtXXXXXXXX.webm', 'https://t.alipayobjects.com/images/rmsweb/T14q0hXbBdXXXXXXXX.webm'],
    videoMp4: ['https://t.alipayobjects.com/images/rmsweb/T15IXhXlXbXXXXXXXX.mp4', 'https://t.alipayobjects.com/images/rmsweb/T1e0hgXcpdXXXXXXXX.mp4', 'https://t.alipayobjects.com/images/rmsweb/T1lcRgXb4gXXXXXXXX.mp4', 'https://t.alipayobjects.com/images/T1qWNhXkpeXXXXXXXX.mp4'],
    init: function() {
      var self = this;
      self.videoBox = $(".video-player");
      $('<video preload loop></video>').appendTo(self.videoBox);
      for (var i = 0; i < self.videoBox.length; i++) {
        var svg = new SVG();
        self.videoBox.eq(i).append(svg.node);
        var video = self.videoBox.eq(i).find("video");
        if (video[0].canPlayType('video/webm; codecs="vp8.0, vorbis"')) {
          $('<source src="' + self.video[i] + '" type="video/webm">').appendTo(video);
        } else {
          $('<source src="' + self.videoMp4[i] + '" type="video/mp4">').appendTo(video);
        }
        video.css({
          "width": "100%"
        });
        video.append(svg);
        svg.css({
          "position": "absolute",
          "top": 0,
          "left": 0
        });
        var playBox = _playBox(svg);
        svg.addChild(playBox);
        playBox.addEventListener("click", function(e) {
          var m = $(this),
            video = m.parent().parent().find("video");
          var bool = m.attr("play");
          if (bool) {
            this.setTimeout = null;
            video[0].pause();
            m.removeAttr("play")
          } else {
            this.setTimeout = setTimeout(function() {
              video[0].play();
            }, 500);

            m.attr("play", "true")
          }
        })
      }
    }
  };
  window.Motion.motionVideo = motionVideo;
});
