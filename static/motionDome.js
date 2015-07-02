/**
 * Created by jljsj on 15/6/30.
 */
$(function (){
    var animBtnDome={
        animStr:'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        init:function() {
            var self=this;
            self.body=$("body");
            self.btn=$(".ant-btn-ripple");
            //$(".ant-btn-lq").bind("click",function (le){
            //    le.stopPropagation();
            //});

            //涟漪效果
            self.btn.bind("mousedown",function (e){
                //console.log(e)
                //var _x= e.offsetX,_y= e.offsetY;
                var __x=$(this).offset().left,__y=$(this).offset().top,
                    _x= e.pageX-__x,_y= e.pageY-__y;
                var lq=$("<em class='ant-btn-lq'></em>").prependTo(this);
                var _w=this.offsetWidth,_h=this.offsetHeight;
                lq.removeAttr("style").css({width:_w,height:_w,"border-radius":_w/2,left:_x-_w/2,top:_y-_w/2});
                if($(this).attr("class").indexOf("ant-btn-primary")>=0||$(this).attr("class").indexOf("ant-btn-ghost")>=0){
                    lq.css("background-color","#fff");
                }else{
                    lq.css("background-color","#999");
                }
                var s=0;
                //if(_h>=_w){
                //    s=_y/_h*2<1?2-_y/_h*2:_y/_h*2;
                //}

                var _sx=_x/_w* 2,_sy=_y/_h*2;
                if(_sx>1&&_sy>1){
                    s=_sx>_sy?_sx:_sy;
                }else if(_sx>1||_sy>1){
                    _sx=_sx<1?2-_sx:_sx;
                    _sy=_sy<1?2-_sy:_sy;
                    s=_sx>_sy?_sx:_sy;
                }else {
                    s=2-_sx>2-_sy?2-_sx:2-_sy;
                }
                s=s+.3;
                lq.css("transform","scale("+s+")")

            });
            function mousee_up(e){
                var lq=$(this).find(".ant-btn-lq");
                lq.delay(300).animate({opacity:0},300,function (){
                    lq.remove();
                })
            }
            self.btn.bind("mouseout",mousee_up);
            self.btn.bind("mouseup",mousee_up);

            //加载按钮
            self.loadBtn=$(".ant-btn-load");
            self.loadBtn.bind("click",function (e){
                var m=$(this);
                m.find("text").css({"opacity":"0","transform": "scale(2)"});
                m.find("span").css({"opacity":1,"transform": "scale(1)"});
                setTimeout(function (){
                    m.find("text").removeAttr("style");
                    m.find("span").removeAttr("style")
                },4000)
            });

            //替换
            function reqClass(m,_class,call){
                if(m.attr("class").indexOf(_class+"-open")>=0){
                    m.removeClass(_class+"-open").addClass(_class+"-close").one(self.animStr,function (){
                        m.removeClass(_class+"-close");
                        if(typeof call=="function"){
                            call()
                        }
                    })
                }else{
                    m.addClass(_class+"-open");
                }
            }

            //icon的下拉演示
            self.listTip=$(".ant-btn-listtip");
            self.listTip.bind("click",function (e){
                var m=$(this);
                var tip=$("#"+m.attr("data-id"));
                reqClass(tip,"scale");

                tip.css({left: m.position().left-tip.width()+ m.outerWidth()-2,top: m.position().top+m.outerHeight()+12})
            });

            //dropdown演示的事件
            self.dropdown=$(".ant-dropdown-wrap");
            self.dropdown.find(".ant-btn-menu").bind("click",function (e){
                var m=$(this),p= m.parent(),d= p.find(".ant-dropdown"),
                    con= d.find(".ant-dropdown-con"),str="margin-top";
                d.css({"display":"block","margin-top":2});
                reqClass(con,str,function (){
                    if(con.attr("class").indexOf('margin-top')<0){
                        d.css({"display":"none"})
                    }

                });

            })
        }
    };
    animBtnDome.init()

});