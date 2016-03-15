require('../style/index.less');
require('../site/static/style.less');
require('../site/static/tomorrow.less');

window['css-animation'] = require('css-animation');
window['react-router'] = require('react-router');
window['rc-form'] = require('rc-form');
window.CopyToClipboard = require('react-copy-to-clipboard');
var antd = require('../index');
var React = require('react');
var ReactDOM = require('react-dom');
var semver = require('semver');
window.antd = antd;
window.React = React;
window.ReactDOM = ReactDOM;
window['object-assign'] = require('object-assign');
window['classnames'] = require('classnames');
window['reqwest'] = require('reqwest');
window['jsonp'] = require('jsonp');
window['querystring'] = require('querystring');
window['Values'] = require('values.js');
window['InstantClick'] = require('instantclick');
require('./home')();

function camelize(str) {
  return str.replace(/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
}

window.require = function (path) {
  var result = window;
  var namespaces = path.split('/');
  namespaces.forEach(function (key, i) {
    if (i === 2) {
      key = camelize(key);
    }
    if (key !== 'lib') {
      if (result[key]) {
        result = result[key];
      } else {
        throw 'There should not have modules here: ' + path;
      }
    }
  });
  return result;
};

antd.DatePicker.locale = {
  en_US: require('../components/date-picker/locale/en_US'),
  zh_CN: require('../components/date-picker/locale/zh_CN'),
};

antd.Calendar.locale = {
  en_US: require('../components/calendar/locale/en_US'),
  zh_CN: require('../components/calendar/locale/zh_CN'),
};

antd.Pagination.locale = {
  en_US: require('../components/pagination/locale/en_US'),
  zh_CN: require('../components/pagination/locale/zh_CN'),
};

InstantClickChangeFns.push(function () {
  // auto complete for components
  var Select = antd.Select;
  var Option = Select.Option;
  // 获取搜索数据
  var searchData = window.ANT_COMPONENTS.sort(function (a, b) {
    return a.title.localeCompare(b.title);
  });

  var AutoComplete = React.createClass({
    getOptions() {
      return searchData.map(function (s) {
        return <Option sData={s} key={s.title} text={'跳转到 ' + s.title}>
          <strong>{s.title}</strong>
          &nbsp;
          <span className="ant-component-decs">{s.desc}</span>
        </Option>;
      });
    },

    handleSelect(value) {
      location.href = rootUrl + '/components/' + value.replace(/([a-z])([A-Z])/g, function (m, m1, m2) {
          return m1 + '-' + m2;
        }).toLowerCase() + '/';
    },

    filterOption(input, option) {
      return option.props.sData.title.toLowerCase().indexOf(input.toLowerCase()) !== -1 || option.props.sData.desc.indexOf(input) !== -1;
    },

    render() {
      return <Select combobox style={{width: '100%'}}
                     onSelect={this.handleSelect}
                     optionLabelProp="text"
                     dropdownClassName="autoComplete"
                     searchPlaceholder="搜索组件..."
                     filterOption={this.filterOption}>{this.getOptions()}</Select>;
    }
  });

  ReactDOM.render(<AutoComplete/>, document.getElementById('autoComplete'));
});

InstantClickChangeFns.push(function () {
  var Select = antd.Select;
  var Option = Select.Option;
  var versionsHistory = {
    '0.9.x': '09x.ant.design',
    '0.10.x': '010x.ant.design',
    '0.11.x': '011x.ant.design',
  };
  versionsHistory[antdVersion.latest] =
    versionsHistory[antdVersion.latest] || 'ant.design';
  var versions = Object.keys(versionsHistory).sort(function (a, b) {
    return semver.lt(a.replace('.x', '.0'), b.replace('.x', '.0'));
  });
  var options = versions.map(function (version) {
    var link = versionsHistory[version];
    return <Option key={version} value={version}>{version}</Option>;
  });

  function onChange(value) {
    if (versionsHistory[value]) {
      location.href = location.href.replace(location.host, versionsHistory[value]);
    }
  }

  ReactDOM.render(
    <Select defaultValue={antdVersion.latest} size="small"
            dropdownMatchSelectWidth={false}
            onChange={onChange}>{options}</Select>
    , document.getElementById('versions-select'));
});

window.BrowserDemo = React.createClass({
  render() {
    return (
      <article className="window-frame focus">
        <header className="top-bar">
          <div className="controls">
            <div className="control close"></div>
            <div className="control minify"></div>
            <div className="control expand"></div>
          </div>
          <input className="address-bar" defaultValue="http://www.example.com"/>
        </header>
        <section className="window-content">
          {this.props.children}
        </section>
      </article>
    );
  }
});

const { Modal, Carousel } = antd;
const PriviewImg = React.createClass({
  getInitialState() {
    return {
      visible: false,
      current: 0,
    };
  },
  showImageModal() {
    this.setState({
      visible: true
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  handleImgChange(current) {
    this.setState({current});
  },
  render() {
    const goodCls = this.props.good ? 'good' : '';
    const badCls = this.props.bad ? 'bad' : '';
    const imgsPack = this.props.imgsPack || [{
        src: this.props.src,
        alt: this.props.alt,
      }];
    const imgStyle = {};
    if (this.props.noPadding) {
      imgStyle.padding = '0';
      imgStyle.background = 'none';
    }
    const current = this.state.current;
    const arrows = imgsPack.length > 1;
    const createMarkup = () => {
      return {__html: this.props.description}
    };

    let node = <img src={this.props.src} onClick={this.showImageModal} style={imgStyle} alt="Sample Picture" />;
    if (this.props.type === 'video') {
      node = (
        <video preload loop style={imgStyle}>
          <source src={this.props.src} type="video/mp4" />
        </video>
      );
    }

    return (
      <div className="preview-image-box" style={{ width: this.props.width }}>
        <div className={`preview-image-wrapper ${this.props.type} ${goodCls} ${badCls}`}>
          {node}
        </div>
        <div className="preview-image-title">{this.props.alt}</div>
        <div className="preview-image-description" dangerouslySetInnerHTML={createMarkup()}/>
        <Modal className="image-modal" width="960" visible={this.state.visible} onCancel={this.handleCancel} footer=""
               title="">
          <Carousel afterChange={this.handleImgChange} adaptiveHeight arrows={arrows}>
            {
              imgsPack.map((img, i) =>
                <div key={i}>
                  <div className="image-modal-container">
                    <img src={img.src}/>
                  </div>
                </div>
              )
            }
          </Carousel>
          <div className="preview-image-title">{imgsPack[current].alt}</div>
        </Modal>
      </div>
    );
  }
});

InstantClickChangeFns.push(function () {
  const previewImageBoxes = $('.preview-img').parent();
  previewImageBoxes.each(function (i, box) {
    box = $(box);
    let priviewImgs = [];
    const priviewImgNodes = box.find('.preview-img');

    // 判断是否要做成图片集合
    // 指定了封面图片就是
    let coverImg;
    priviewImgNodes.each(function (i, img) {
      if (img.hasAttribute('as-cover')) {
        coverImg = img;
        return false;
      }
    });

    if (coverImg) {
      const imgs = [];
      priviewImgNodes.each((i, img) => imgs.push(img));
      priviewImgs = <PriviewImg src={coverImg.src} alt={coverImg.alt} imgsPack={imgs}/>;
    } else {
      priviewImgNodes.each(function (i, img) {
        priviewImgs.push(
          <PriviewImg key={i} src={img.src} width={100.0/priviewImgNodes.length + '%'} alt={img.alt}
                      noPadding={img.hasAttribute('noPadding')}
                      description={img.getAttribute('description')}
                      type={img.getAttribute('type')}
                      good={!!img.hasAttribute('good')} bad={!!img.hasAttribute('bad')}/>
        );
      });
    }

    // 计算宽度
    let width = '';
    if (priviewImgs.length === 1) {
      width = priviewImgNodes[0].getAttribute('width') || '';
    } else if (coverImg) {
      width = coverImg.getAttribute('width');
    }
    if (width && width.indexOf('%') < 0 && width !== 'auto') {
      width += 'px';
    }

    let mountNode = $('<div class="preview-image-boxes cleafix ' + (coverImg ? 'pack' : '') + '" style="width: ' + width + '"></div>')[0];
    box.replaceWith(mountNode);
    ReactDOM.render(<span>{priviewImgs}</span>, mountNode);
  });
});

InstantClickChangeFns.push(function() {
  // fix hash id link
  if (window.location.href.indexOf('#') > 0) {
    setTimeout(function() {
      window.location.href = window.location.href;
    }, 30);
  }

  $('.component-demos .icon-all').off('click');
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

  $('.code-boxes').off('click');
  $('.code-boxes').on('click', '.collapse', function() {
    var highlightBox = $(this).parent().parent().find('.highlight');
    var codeVisible = highlightBox.is(':visible');
    highlightBox.animate({
      height: codeVisible ? 'hide' : 'show',
      opacity: codeVisible ? 0 : 1
    }, 150);
    if (codeVisible) {
      $(this).parent().parent().removeClass('expand');
    } else {
      $(this).parent().parent().addClass('expand');
    }
  });

  function hashChange() {
    $('.demos-anchor a').removeClass('current');
    $('.demos-anchor a[href="' + decodeURI(location.hash) + '"]').addClass('current');
  }

  hashChange();

  // 高亮侧边演示菜单
  $(window).off('hashchange');
  $(window).on('hashchange', hashChange);

  // 移动 API 文档到演示下方
  $('.markdown #api').nextAll().andSelf().appendTo('.api-container');

  // 滚动时固定锚点、高亮当前项
  if ($('.demos-anchor')[0]) {
    var doc = $(document);
    var tocTop = $('.toc').offset().top;
    function onScroll() {
      var top = doc.scrollTop();
      if (top >= tocTop) {
        $('.toc').addClass('sticky');
      } else {
        $('.toc').removeClass('sticky');
      }
    }
    onScroll();
    $(window).off('scroll');
    $(window).on('scroll', onScroll);
  }

  // 添加上一页下一页
  if ($('.aside-container li > a').length > 0) {
    var links = $('.aside-container li > a');
    var currentLinkIndex = -1;
    links.each(function(i, item) {
      if ($(item).parent().hasClass('current')) {
        currentLinkIndex = i;
      }
    });
    var prevNextNavNode = $('<div class="prev-next-nav"></div>');
    var prevLink = links[currentLinkIndex - 1];
    var nextLink = links[currentLinkIndex + 1];
    if (prevLink) {
      var prevLinkNavNode = $('<a class="prev-page" href="' + prevLink.href + '">' + prevLink.innerHTML + '</a>');
      if (prevLink.className.indexOf('nav-link-disabled') >= 0) {
        prevLinkNavNode.attr('disabled', true);
      }
      prevNextNavNode.append(prevLinkNavNode);
    } else {
      prevNextNavNode.append('<span class="prev-page"></span>');
    }
    if (nextLink) {
      var nextLinkNavNode = $('<a class="next-page" href="' + nextLink.href + '">' + nextLink.innerHTML + '</a>');
      if (nextLink.className.indexOf('nav-link-disabled') >= 0) {
        nextLinkNavNode.attr('disabled', true);
      }
      prevNextNavNode.append(nextLinkNavNode);
    } else {
      prevNextNavNode.append('<span class="next-page"></span>');
    }
    prevNextNavNode.appendTo('.main-container');
  }

  var navMenu = $('.nav');
  $('.nav-phone-icon').click(function() {
    navMenu.removeClass('nav-hide').addClass('nav-show');
  });

  $('body').on('click touchstart', function (e) {
    if (e.target !== $('.nav-phone-icon')[0] &&
        !navMenu[0].contains(e.target) &&
        navMenu.hasClass('nav-show')) {
      navMenu.removeClass('nav-show').addClass('nav-hide');
    }
  });

  $.easing['jswing'] = $.easing['swing'];
  $.extend($.easing,{
    easeInCirc: function (x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    }
  });

  var navFunc = {
    navStrArr: [],
    init: function() {
      if (this.navBar) {
        return;
      }
      this.navBox = $(".nav");
      this.navBar = this.navBox.find(".bar");
      this.navList = this.navBox.find("ul li");
      this.navNum = $(".current").index();
      this.navBarAnim();
      this.highlightCurrentNav();
      $(window).bind("resize", this.highlightCurrentNav);
      this.navBar.show();
    },
    highlightCurrentNav: function(target) {
      target = target || this.navList.eq(this.navNum);
      this.navBar && this.navBar.css({
        left: target.position().left,
        width: target.outerWidth()
      });
    },
    navBarAnim: function() {
      var self = this, delay;
      self.navList.bind("mouseenter", function(e) {
        clearTimeout(delay);
        self.highlightCurrentNav($(e.currentTarget));
      });
      self.navList.bind("mouseleave", function(e) {
        delay = setTimeout(function() {
          self.highlightCurrentNav();
        }, 500);
      });
    }
  };
  navFunc.init();
  var listFunc = {
    num: 0,
    init: function() {
      this.listBox = $(".aside-container>ul");
      if (!this.listBox.length) {
        return;
      }
      this.getUrlNum();
      this.addTitleEvent();
    },
    getUrlNum: function() {
      var self = this,
        url = location.href,
        str = "";
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
        var parent = $(this).parent(),
          list=parent.find("ul");
        if (parent.attr("open")) {
          parent.removeAttr("open");
          if (parent.index() == self.num) {
            $(this).addClass("current");
          }
          list.animate({marginTop:-list.height()},400,"easeInOutCirc",function (){
            list.css({"display":"none"})
          })
        } else {
          parent.attr("open", true);
          if (parent.index() == self.num) {
            $(this).removeClass("current");
          }
          list.css({"display":"block","margin-top":-list.height()});
          list.animate({marginTop:0},400,"easeInOutCirc")
        }
      });
    }
  };
  listFunc.init();
});

antd.version = require('../package.json').version;
module.exports = antd;
