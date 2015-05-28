$(function () {
    var animEndStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var getTransform = function () {
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
    var C=createjs||{},T=TweenMax||{};
    var bannerAnim = {
        w: 2185,
        h: 1062,
        p_w: 0,
        p_h: 0,
        img: "https://t.alipayobjects.com/images/T1URpfXeXtXXXXXXXX.jpg",
        stage: null,
        Canvas: null,
        lineData:[
            {x:225,y:785,line:3,color:"#BEC4C8",w:70,h:70,rotate:-19,circ:{x:10,y:10,r:50}},
            {x:870,y:245,w:70,h:70,line:3,color:"#BEC4C8",circ:{x:10,y:10,r:50}},
            {x:940,y:455,w:230,h:110,line:3,color:"#6EB4E0",circ:[{x:20,y:15,r:80},{x:125,y:15,r:80}]},
            {x:1160,y:670,w:410,h:110,line:3,color:"#F0776F",circ:[{x:60,y:15,r:80},{x:165,y:15,r:80},{x:285,y:15,r:80}]},
            {x:1285,y:170,w:484,h:110,line:3,color:"#BEC4C8",circ:[{x:30,y:15,r:80},{x:145,y:15,r:80},{x:265,y:15,r:80},{x:375,y:15,r:80}]},
            {x:1330,y:520,w:70,h:70,line:3,color:"#F0776F",circ:{x:10,y:10,r:50}},
            {x:1435,y:365,w:200,h:190,line:3,color:"#BEC4C8",circ:[{x:20,y:10,r:75},{x:110,y:10,r:75},{x:20,y:100,r:75},{x:110,y:100,r:75}]},
            {x:1655,y:325,w:115,h:320,line:3,color:"#F0776F",circ:[{x:25,y:15,r:75},{x:35,y:25,r:55},{x:25,y:115,r:75},{x:35,y:125,r:55},{x:25,y:225,r:75},{x:35,y:235,r:55}]},
            {x:1680,y:735,w:70,h:70,line:3,color:"#F0776F",circ:{x:10,y:10,r:50}},
            {x:1845,y:485,w:115,h:410,line:3,color:"#6EB4E0",circ:[{x:25,y:15,r:75},{x:35,y:25,r:55},{x:25,y:115,r:75},{x:35,y:125,r:55},{x:25,y:215,r:75},{x:35,y:225,r:55},{x:25,y:310,r:75},{x:35,y:320,r:55}]},
            {x:1865,y:290,w:70,h:70,line:3,color:"#F0776F",circ:{x:10,y:10,r:50}},
            {x:1995,y:280,w:230,h:420,line:3,color:"#6EB4E0",circ:[{x:25,y:30,r:75},{x:35,y:40,r:55},{x:25,y:175,r:75},{x:35,y:185,r:55},{x:25,y:310,r:75},{x:35,y:320,r:55}, {x:130,y:30,r:75},{x:140,y:40,r:55},{x:130,y:175,r:75},{x:140,y:185,r:55},{x:130,y:310,r:75},{x:140,y:320,r:55}]},
        ],
        init: function () {
            var self = this;
            self.box = $(".banner-box");
            self.animBox = $("#bannerAnim");
            self.imgBox = $(".banner-img");
            self.txtBox=$(".banner-entry");
            //创建canvas;
            self.Canvas = $("<canvas id='myC' style='display:block'></canvas>").appendTo(self.animBox); //document.createElement('canvas');
            self.Canvas[0].width = self.w;
            self.Canvas[0].height = self.h;
            self.stage = new C.Stage('myC');

            C.Ticker.setFPS(30);
            C.Ticker.useRAF = true;
            C.Ticker.addEventListener("tick", self.stage);
            C.Touch.enable(self.stage, true); //单指触摸

            self.bannerResize();
            $(window).bind("resize", self.bannerResize);


            self.loadImg();
        },
        loadImg: function () {
            var self = this;
            var loadBox = $("<div class='load-box'><em><img src='https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg' width='50' height='50'></em>" +
            "</div>").appendTo(self.box);
            var img = new Image();
            img.onload = function () {
                loadBox.addClass("load-out").one(animEndStr, function () {
                    loadBox.remove();
                    self.start();
                });
            };
            img.src = self.img;
        },
        bannerResize: function () {
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
        start: function () {
            var self = this;
            //self.addBg();
            //setTimeout(self.addLine,500);
            self.addLine()

        },
        glowLine:function (line,w,h,color){
            w=w||0,h=h||0;
            var r=w/2||h/2;
            var glBox=new C.Container();
            var Line=new C.Shape();
            var glow=new C.Shape();
            glBox.addChild(glow);
           glBox.addChild(Line);
            glow.alpha=.3
            var blurFilter = new C.BlurFilter(3, 3, 10);
            glow.filters = [blurFilter];
            var bounds = blurFilter.getBounds();
            if(w){
                Line.graphics.ss(line,"round").rs([color,"#2d2d2d"],[0,1],r,h,0,r,h,r).mt(0,0).lt(w,h);
                glow.graphics.ss(line+4,"round").rs([color,"#2d2d2d"],[0,1],r,h,0,r,h,r).mt(0,0).lt(w,h);
                glow.cache(bounds.x, bounds.y-2, w+bounds.width, line+bounds.height);
            }else{
                Line.graphics.ss(line,"round").rs([color,"#2d2d2d"],[0,1],w,r,0,w,r,r).mt(0,0).lt(w,h);
                glow.graphics.ss(line+4,"round").rs([color,"#2d2d2d"],[0,1],w,r,0,w,r,r).mt(0,0).lt(w,h);
                glow.cache(bounds.x-2, bounds.y, line+bounds.width, h+bounds.height);
            }
            return glBox;
        },
        /*addBg:function (){
            var self=this;
            self.bgBox=new C.Container();
            self.stage.addChild(self.bgBox);
            var colorArr=["#ccc","#999","#666","#000"];
            for(var i=0;i<4;i++){
                var colorMc=new C.Shape();
                colorMc.graphics.f(colorArr[i]).dr(0,0,self.w,self.h);
                self.bgBox.addChild(colorMc);
                //T.from(colorMc,.6,{delay:.1*i,x:-self.w,alpha:0,ease:Power2.easeOut})
            }
        },*/
        endTween:function (){
            var self=bannerAnim;
            T.to(self.animBox,.5,{alpha:0,onComplete:function (){
                self.animBox.remove();
                self.textTween();
            }});
            //T.to(self.imgBox,.5,{alpha:1})
            self.imgBox.css("opacity",1)
        },
        textTween:function (){
            var self=this;
            self.txtBox.removeClass("fn-hide");
            for(var i=0;i<self.txtBox.children().length;i++){
                var mc=self.txtBox.children().eq(i);
                T.from(mc,.5,{delay:.15*i,alpha:0,y:"80",onComplete:function (mc){
                    mc.removeAttr("style");
                },onCompleteParams:[mc]})
            }
        },
        addLine:function (){
            var self=bannerAnim;
            var a_lineBox=[],end_num=0;
            function addLine(i,j,lineBox){
                var t=new C.Shape();
                if(j%2){
                    t.graphics.s(self.lineData[i].color).ss(self.lineData[i].line-2).mt(0,0).lt(0,self.lineData[i].h);
                    var at=Math.floor(j/2);
                    t.x=self.lineData[i].w*at
                }else{
                    t.graphics.s(self.lineData[i].color).ss(self.lineData[i].line-2).mt(0,0).lt(self.lineData[i].w,0);
                    var at=j/2;
                    t.y=self.lineData[i].h*at;
                }
                lineBox.addChild(t);
                T.from(t,.5,{alpha:0})
            }
            function addCirc(i,lineBox){
                end_num++;
                if(self.lineData[i].circ.length>0){
                    for(var j=0;j<self.lineData[i].circ.length;j++){
                        var circ=new C.Shape();
                        circ.graphics.s(self.lineData[i].color).ss(self.lineData[i].line-2).dc(self.lineData[i].circ[j].x+self.lineData[i].circ[j].r/2,self.lineData[i].circ[j].y+self.lineData[i].circ[j].r/2,self.lineData[i].circ[j].r/2);
                        lineBox.addChild(circ);
                        T.from(circ,.5,{alpha:0})
                    }
                }
                else{
                    var circ=new C.Shape();
                    circ.graphics.s(self.lineData[i].color).ss(self.lineData[i].line-2).dc(self.lineData[i].circ.x+self.lineData[i].circ.r/2,self.lineData[i].circ.y+self.lineData[i].circ.r/2,self.lineData[i].circ.r/2);
                    lineBox.addChild(circ);
                    T.from(circ,.5,{alpha:0})
                }
                if(end_num>=self.lineData.length){
                    setTimeout(self.endTween,500)
                }
            }
            function tween(line,obj,i,j,lineBox,arr){
                var t=obj;
                t.alpha=0;
                t.scale=2;
                t.ease=Power1.easeOut;
                //t.onComplete=addLine;
                //t.onCompleteParams=[i,j,lineBox];
                T.to(line,.5,t);
                addLine(i,j,lineBox);
                arr.push(j);
                a_lineBox[i]=arr;
                if(a_lineBox[i].length>=4){
                    addCirc(i,lineBox)
                }
            }
            for(var i=0;i<self.lineData.length;i++){
                var lineBox=new C.Container();
                self.stage.addChild(lineBox);
                lineBox.x=self.lineData[i].x;
                lineBox.y=self.lineData[i].y;
                lineBox.rotation=self.lineData[i].rotate;
                var arr=[]
                //画外壳方形
                for(var j=0;j<4;j++){
                    var line,ma=Math.ceil(Math.random()*2-1),
                        tweenobj;
                    if(j%2){
                        tweenobj=ma?self.lineData[i].h*2:-self.lineData[i].h*2;
                        line=self.glowLine(self.lineData[i].line,0,self.lineData[i].h,self.lineData[i].color);
                        var t=Math.floor(j/2);
                        line.x=self.lineData[i].w*t;
                        T.from(line,.5,{alpha:0,y:tweenobj,scale:0,delay:j *.1+Math.random()*i *.1,ease:Power1.easeIn,onComplete:tween,onCompleteParams:[line,{y:-tweenobj},i,j,lineBox,arr]});
                    }else{
                        tweenobj=ma?self.lineData[i].w*2:-self.lineData[i].w*2;
                        line=self.glowLine(self.lineData[i].line,self.lineData[i].w,0,self.lineData[i].color);
                        var t=j/2;
                        line.y=self.lineData[i].h*t;
                        T.from(line,.5,{alpha:0,x:tweenobj,scale:0,delay:j *.1+Math.random() *i *.1,ease:Power1.easeIn,onComplete:tween,onCompleteParams:[line,{x:-tweenobj},i,j,lineBox,arr]});
                    }
                    lineBox.addChild(line)
                }

            }
        }
    };
    bannerAnim.init()

});
