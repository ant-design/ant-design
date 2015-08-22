window['css-animation'] = require('css-animation');
window['react-router'] = require('react-router');
window['react-router']['HashHistory'] = require('react-router/lib/HashHistory');
var antd = require('antd');

var $ = require('jquery');
var React = require('react');

$(function () {
// auto complete for components
  var Select = antd.Select;
  var Option = Select.Option;
  // 获取搜索数据
  var searchData = window.ANT_COMPONENTS;

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
      location.pathname = '/components/' + value.replace(/([a-z])([A-Z])/g, function (m, m1, m2) {
        return m1 + '-' + m2;
      }).toLowerCase();
    },

    filterOption(input, option) {
      return option.props.sData.title.toLowerCase().indexOf(input.toLowerCase()) !== -1 || option.props.sData.desc.indexOf(input) !== -1;
    },

    render() {
      return <Select combobox style={{width: 260}}
        onSelect={this.handleSelect}
        optionLabelProp="text"
        dropdownClassName="autoComplete"
        dropdownMenuStyle={{maxHeight: 200, overflow: 'auto'}}
        searchPlaceholder="搜索组件..."
        filterOption={this.filterOption}>{this.getOptions()}</Select>;
    }
  });

  React.render(<AutoComplete/>, document.getElementById('autoComplete'));
});

module.exports = antd;
