var React = require('react');
var Radio = require('rc-radio');

var AntRadioGroup = React.createClass({
  getDefaultProps: function () {
    return {
      prefixCls: 'rc-radio-group'
    };
  },
  getInitialState: function () {
    var value = null;
    this.props.children.forEach(function (radio) {
      if (radio.props && radio.props.checked) {
        value = radio.props.value;
      }
      return false;
    });
    return {
      selectedValue: value
    };
  },
  render: function () {
    var self = this;
    var props = self.props;
    var children = props.children.map(function (radio) {
      if (radio.props) {
        return <label>
          <Radio {...radio.props}
            onChange={self.onRadioChange}
            checked = {self.state.selectedValue === radio.props.value}
            children={null}
          />
        {radio.props.children}
        </label>;
      }
      return radio;
    });
    return (
      <div className={props.prefixCls}>
                {children}
      </div>
    );
  },
  onRadioChange: function (ev) {
    this.setState({
      selectedValue: ev.target.value
    });
    this.props.onChange(ev);
  }
});

module.exports = AntRadioGroup;

