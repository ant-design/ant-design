import React from 'react';

function getCheckedValue(children) {
  let checkedValue = null;
  React.Children.forEach(children, (radio) => {
    if (radio.props && radio.props.checked) {
      checkedValue = radio.props.value;
    }
  });
  return checkedValue;
}

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio-group',
      disabled: false,
      onChange() {
      }
    };
  },
  getInitialState() {
    let props = this.props;
    return {
      value: props.value || props.defaultValue || getCheckedValue(props.children)
    };
  },
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || getCheckedValue(nextProps.children)
      });
    }
  },
  onRadioChange(ev) {
    this.setState({
      value: ev.target.value
    });
    this.props.onChange(ev);
  },
  render() {
    const props = this.props;
    const children = React.Children.map(props.children, (radio) => {
      if (radio.props) {
        return React.cloneElement(radio, {
          key: radio.props.value,
          ...radio.props,
          onChange: this.onRadioChange,
          checked: this.state.value === radio.props.value,
          disabled: radio.props.disabled || this.props.disabled,
        });
      }
      return radio;
    });
    return (
      <div className={`${props.prefixCls} ${props.prefixCls}-${props.size}`}>
        {children}
      </div>
    );
  },
});
