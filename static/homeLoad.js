/**
 * Created by jljsj on 15/6/3.
 */
$(function () {
    var loadData = ["/static/easeljs-0.8.0.min.js", "/static/TweenMax.min.js", "/static/home.js", "https://t.alipayobjects.com/images/T1CFtgXb0jXXXXXXXX.jpg"];
    var animEndStr = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var loadFunc={
        init:function(){
            var self=this;
            self.body=$("body");
            self.header=$("#header")||$("header");
            self.main=$(".main");
            self.footer=$("#footer")||$("footer");
            self.footer.css("opacity",0);
            self.addLoad()
        },
        addLoad:function (){
            var self=this;
            self.loadBox=$("<div class='load-main-box'>" +
            "<div class='load-box'>" +
            "<em><img src='https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg' width='50' height='50'></em>" +
            "<span>Ant Design</span>" +
            "</div>" +
            "<div class='load-bar'></div>" +
            "</div>").appendTo(self.body);
            self.loadBar=self.loadBox.find(".load-bar");
            var loadText=self.loadBox.find("span"),
                str=loadText.text(),
                loadClass=["yoyo-load0","yoyo-load1","yoyo-load2","yoyo-load3","yoyo-load4","yoyo-load5"];
            loadText.empty();
            function c_random(num,arrlen){
                var arr=[];
                function r(i){
                    var t=Math.round(Math.random()*(num-1));
                    if(t==arr[i-1]){
                        r(i);
                        return
                    }
                    arr.push(t)
                }
                for(var i=0;i<arrlen;i++){
                    r(i)
                }
                return arr;
            }
            var tarr=c_random(loadClass.length,str.length);
            for(var i=0;i<str.length;i++){
                var t=str[i];
                if(t==" "){
                    t="&nbsp;"
                }
                var _class="yoyo-x-left";
                if(i>0&&i<str.length-1){
                    _class=loadClass[tarr[i]]
                }
                if(i==str.length-1){
                    _class='yoyo-x-right'
                }
                loadText.append("<p class='"+_class+"'>"+t+"</p>")
            }
            self.load()
        },
        load:function (){
            var self=this,lArr=[],num= 0,tNum=0;
            function getJS(){
                for(var i=0;i<lArr.length;i++){
                    var str=lArr[i];
                    if(tNum>=lArr.length){
                        self.loadBox.addClass("load-out").one(animEndStr, function () {
                            self.loadBox.remove();
                            $("<script src=" + str + "></script>").appendTo($("body"));
                        });
                    }else{
                        $("<script src=" + str + "></script>").appendTo($("body"));
                    }
                    tNum++;
                    self.loadBar.css("width",tNum/loadData.length*100+"%");
                }
            }
            for(var i=0;i<loadData.length;i++){
                var str=loadData[i];
                if (str.indexOf(".js") >= 0) {
                    lArr.push(str);
                    num++;
                    if (num >= loadData.length) {
                        setTimeout(getJS,500);
                    }
                }else{
                    var img = new Image();
                    img.onload = img.onerror = function () {
                        num++;
                        tNum++;
                        self.loadBar.css("width",tNum/loadData.length*100+"%");
                        if (num >= loadData.length) {
                            setTimeout(getJS,500);
                        }
                    };
                    img.src = str;
                }
            }
        }
    };
    $().ready(function (){
        loadFunc.init()
    });

});
