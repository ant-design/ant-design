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

require('../style/index.less');
window['css-animation'] = require('css-animation');
window['react-router'] = require('react-router');
window['rc-form'] = require('rc-form');
window.CopyToClipboard = require('react-copy-to-clipboard');
var antd = require('../index');
var React = require('react');
var ReactDOM = require('react-dom');
var semver = require('semver');
window.antd = antd;
window.React = window.react = React;
window.ReactDOM = ReactDOM;
window['object-assign'] = require('object-assign');
window['classnames'] = require('classnames');
window['reqwest'] = require('reqwest');
require('./home')();

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
    '0.9.2': '09x.ant.design',
    '0.10.4': '010x.ant.design'
  };
  versionsHistory[antdVersion.latest] =
    versionsHistory[antdVersion.latest] || 'ant.design';
  var versions = Object.keys(versionsHistory).sort(function (a, b) {
    return semver.lt(a, b);
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
    return (
      <div className="preview-image-box" style={{ width: this.props.width }}>
        <div className={`preview-image-wrapper ${goodCls} ${badCls}`}>
          <img src={this.props.src} onClick={this.showImageModal} style={imgStyle} alt="Sample Picture"/>
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
                      noPadding={img.hasAttribute('noPadding')} description={img.getAttribute('description')}
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

antd.version = require('../package.json').version;
module.exports = antd;
