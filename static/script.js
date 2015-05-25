$(function() {
  $('.component-demos .icon-all').on('click', function() {
    slideToggleCode('.code-box');
  });

  $('.code-box').each(function(i, item) {
    item = $(item);
    item.find('.highlight').appendTo(item);
  });

  $('.code-boxes').on('click', '.collapse', function() {
    slideToggleCode($(this).parent().parent());
  });

  function slideToggleCode(item) {
    $(item).find('.highlight').slideToggle(150);
    item.toggleClass('code-box-expand');
  }
    var navFunc={
        navStrArr: [],
        init:function (){
            var self=this;
            self.navBox = $(".nav");
            self.navBar = self.navBox.find(".bar");
            self.navList = self.navBox.find("ul li");
            for(var i=0;i<self.navList.length;i++){
                var linkStr=self.navList.eq(i).find("a").attr("href")//.replace(".html","").replace(/.*#/, "/").split("/")[0];
                linkStr=linkStr==""?"index":linkStr;
                self.navStrArr.push(linkStr)
            }
            self.search($(".search"));
            self.getUrl();
            self.navBarAnim();
            self.navResize(null);
            $(window).bind("resize", self.navResize);
        },
        navResize: function (e) {
            var self = navFunc;
            self.navBar.css("left", self.navList.width() * self.navNum)//.addClass("barAnim");

            self.navList.eq(self.navNum).find("a").addClass("hover");
        },
        getUrl: function () {
            var self=this;
            var url = location.href;
            var urlArr=url.split("/");
            var links="/";
            for(var i=3;i<urlArr.length;i++){
                if(i>=urlArr.length-1){
                    links+=urlArr[i]
                }else{
                    links+=urlArr[i]+"/"
                }
            }
            for (var i = 0; i < self.navStrArr.length; i++) {
                if(links=="/"){
                    self.navNum=0;
                    break;
                }
                if ((self.navStrArr[i].indexOf(links)>=0||links.indexOf(self.navStrArr[i])>=0)&&i!==0) {
                    self.navNum = i;
                    break;
                }
            }
        },
        search: function (c) {
            var self = this;
            self.searchBox = c;
            self.searchInput = self.searchBox.find("input[type='text']");
            self.searchBtn = self.searchBox.find("button");
            self.searchInput.focus(function (e) {
                $(this).addClass("focus");
                self.searchBtn.css("left", self.searchBox.width() + 13);
            });
            self.searchInput.blur(function (e) {
                if (!self.searchInput.val()) {
                    self.searchBtn.attr("style", "");
                    $(this).removeClass("focus");
                }
            });
            self.searchBtn.click(function (e) {
                self.searchBox.find("form").submit();
            })
        },
        navBarAnim: function () {
            var self = this,delay;
            function startBarAnim(num) {
                self.navBar.css("left", self.navList.width() * num);
                self.navList.eq(num).find("a").addClass("hover");
            }
            self.navList.bind("mouseenter", function (e) {
                clearTimeout(delay);
                var m = e.currentTarget;
                self.navList.find("a").removeClass("hover");
                self.navBar.addClass("barAnim").css("left", $(m).width() * $(m).index())
            });
            self.navList.bind("mouseleave", function (e) {
                delay = setTimeout(function () {
                    startBarAnim(self.navNum)
                }, 500);
            });
        }
    };
    navFunc.init()
});
