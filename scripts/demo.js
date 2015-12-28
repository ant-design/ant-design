function camelize(str) {
  return str.replace (/(?:^|[-_])(\w)/g, function (_, c) {
    return c ? c.toUpperCase () : '';
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

module.exports = antd;
