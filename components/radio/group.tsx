import React from 'react';
import classNames from 'classnames';
import Radio from './radio';
import RadioButton from './radioButton';
import PureRenderMixin from 'rc-util/lib/PureRenderMixin';
import assign from 'object-assign';

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
  shouldComponentUpdate(...args) {
    return PureRenderMixin.shouldComponentUpdate.apply(this, args);
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
    const children = !props.children ? [] : React.Children.map(props.children, (radio: any) => {
      if (radio && (radio.type === Radio || radio.type === RadioButton) && radio.props) {
        return React.cloneElement(radio, assign({}, radio.props, {
          onChange: this.onRadioChange,
          checked: this.state.value === radio.props.value,
          disabled: radio.props.disabled || this.props.disabled,
        }));
      }
      return radio;
    });

    const { prefixCls = 'ant-radio-group', className = '' } = props;
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
