import React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import RadioButton from './radioButton';

function getCheckedValue(children) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

export default class RadioGroup extends React.Component {
  static defaultProps = {
    prefixCls: 'ant-radio-group',
    disabled: false,
    onChange() {
    },
  }
  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }
    this.state = {
      value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        this.setState({
          value: checkedValue.value,
        });
      }
    }
  }
  onRadioChange = (ev) => {
    if (!('value' in this.props)) {
      this.setState({
        value: ev.target.value,
      });
    }
    this.props.onChange(ev);
  }
  render() {
    const props = this.props;
    const children = React.Children.map(props.children, (radio) => {
      if (radio && (radio.type === Radio || radio.type === RadioButton) && radio.props) {
        const keyProps = {};
        if (!('key' in radio) && typeof radio.props.value === 'string') {
          keyProps.key = radio.props.value;
        }
        return React.cloneElement(radio, {
          ...keyProps,
          ...radio.props,
          onChange: this.onRadioChange,
          checked: this.state.value === radio.props.value,
          disabled: radio.props.disabled || this.props.disabled,
        });
      }
      return radio;
    });
    const classString = classNames({
      [props.prefixCls]: true,
      [`${props.prefixCls}-${props.size}`]: props.size,
    });
    return <div className={classString} style={props.style}>{children}</div>;
  }
}
