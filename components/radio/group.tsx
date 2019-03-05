import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';
import Radio from './radio';
import {
  RadioGroupProps,
  RadioGroupState,
  RadioChangeEvent,
  RadioGroupButtonStyle,
} from './interface';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

function getCheckedValue(children: React.ReactNode) {
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

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
  static defaultProps = {
    disabled: false,
    buttonStyle: 'outline' as RadioGroupButtonStyle,
  };

  static childContextTypes = {
    radioGroup: PropTypes.any,
  };

  static getDerivedStateFromProps(nextProps: RadioGroupProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    } else {
      const checkedValue = getCheckedValue(nextProps.children);
      if (checkedValue) {
        return {
          value: checkedValue.value,
        };
      }
    }
    return null;
  }

  constructor(props: RadioGroupProps) {
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
        name: this.props.name,
      },
    };
  }

  shouldComponentUpdate(nextProps: RadioGroupProps, nextState: RadioGroupState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  onRadioChange = (ev: RadioChangeEvent) => {
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
  };

  renderGroup = ({ getPrefixCls }: ConfigConsumerProps) => {
    const props = this.props;
    const { prefixCls: customizePrefixCls, className = '', options, buttonStyle } = props;
    const prefixCls = getPrefixCls('radio', customizePrefixCls);
    const groupPrefixCls = `${prefixCls}-group`;
    const classString = classNames(
      groupPrefixCls,
      `${groupPrefixCls}-${buttonStyle}`,
      {
        [`${groupPrefixCls}-${props.size}`]: props.size,
      },
      className,
    );

    let children: React.ReactChildren[] | React.ReactElement<any>[] | React.ReactNode =
      props.children;

    // 如果存在 options, 优先使用
    if (options && options.length > 0) {
      children = options.map((option, index) => {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          return (
            <Radio
              key={index}
              prefixCls={prefixCls}
              disabled={this.props.disabled}
              value={option}
              checked={this.state.value === option}
            >
              {option}
            </Radio>
          );
        } else {
          // 此处类型自动推导为 { label: string value: string }
          return (
            <Radio
              key={index}
              prefixCls={prefixCls}
              disabled={option.disabled || this.props.disabled}
              value={option.value}
              checked={this.state.value === option.value}
            >
              {option.label}
            </Radio>
          );
        }
      });
    }

    return (
      <div
        className={classString}
        style={props.style}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        id={props.id}
      >
        {children}
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderGroup}</ConfigConsumer>;
  }
}

polyfill(RadioGroup);
export default RadioGroup;
