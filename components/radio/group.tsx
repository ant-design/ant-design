import React, { PropTypes } from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

function getCheckedValue(children) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio: any) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

export interface RadioGroupProps {
  prefixCls?: string;
  className?: string;
  /** 选项变化时的回调函数*/
  onChange?: React.FormEventHandler<any>;
  /** 用于设置当前选中的值*/
  value?: string | number;
  /** 默认选中的值*/
  defaultValue?: string | number;
  /**  大小，只对按钮样式生效*/
  size?: 'large' | 'default' | 'small';
  style?: React.CSSProperties;
  disabled?: boolean;
  onMouseEnter?: React.FormEventHandler<any>;
  onMouseLeave?: React.FormEventHandler<any>;
}

export default class RadioGroup extends React.Component<RadioGroupProps, any> {
  static defaultProps = {
    disabled: false,
  };

  static childContextTypes = {
    radioGroup: PropTypes.any,
  };

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

  getChildContext() {
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: this.props.disabled,
      },
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

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) ||
           !shallowEqual(this.state, nextState) ||
           !shallowEqual(this.context.group, nextContext.group);
  }

  onRadioChange = (ev) => {
    const lastValue = this.state.value;
    const { value } = ev.target;
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }

    const onChange = this.props.onChange;
    if (onChange && value !== lastValue) {
      onChange(ev);
    }
  }
  render() {
    const props = this.props;
    const { prefixCls = 'ant-radio-group', className = '', children } = props;
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${props.size}`]: props.size,
    }, className);
    return (
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {children}
      </div>
    );
  }
}
