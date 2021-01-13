import * as React from 'react';
import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import CheckboxGroup, { GroupContext } from './Group';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import devWarning from '../_util/devWarning';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  filled?: boolean;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

class Checkbox extends React.PureComponent<CheckboxProps, {}> {
  static Group: typeof CheckboxGroup;

  static __ANT_CHECKBOX = true;

  static defaultProps = {
    indeterminate: false,
  };

  static contextType = GroupContext;

  context: any;

  private rcCheckbox: any;

  componentDidMount() {
    const { value } = this.props;
    this.context?.registerValue(value);

    devWarning(
      'checked' in this.props || this.context || !('value' in this.props),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?',
    );
  }

  componentDidUpdate({ value: prevValue }: CheckboxProps) {
    const { value } = this.props;
    if (value !== prevValue) {
      this.context?.cancelValue(prevValue);
      this.context?.registerValue(value);
    }
  }

  componentWillUnmount() {
    const { value } = this.props;
    this.context?.cancelValue(value);
  }

  saveCheckbox = (node: any) => {
    this.rcCheckbox = node;
  };

  focus() {
    this.rcCheckbox.focus();
  }

  blur() {
    this.rcCheckbox.blur();
  }

  renderCheckbox = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props, context } = this;
    const {
      prefixCls: customizePrefixCls,
      className,
      children,
      indeterminate,
      style,
      onMouseEnter,
      onMouseLeave,
      ...restProps
    } = props;
    const checkboxGroup = context;
    const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
    const checkboxProps: CheckboxProps = { ...restProps };
    if (checkboxGroup) {
      checkboxProps.onChange = (...args) => {
        if (restProps.onChange) {
          restProps.onChange(...args);
        }
        checkboxGroup.toggleOption({ label: children, value: props.value });
      };
      checkboxProps.name = checkboxGroup.name;
      checkboxProps.checked = checkboxGroup.value.indexOf(props.value) !== -1;
      checkboxProps.disabled = props.disabled || checkboxGroup.disabled;
    }
    const classString = classNames(
      {
        [`${prefixCls}-wrapper`]: true,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
        [`${prefixCls}-wrapper-disabled`]: checkboxProps.disabled,
      },
      className,
    );
    const checkboxClass = classNames({
      [`${prefixCls}-indeterminate`]: indeterminate,
      [`${prefixCls}-filled`]: checkboxProps.filled,
    });
    return (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label
        className={classString}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          ref={this.saveCheckbox}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCheckbox}</ConfigConsumer>;
  }
}

export default Checkbox;
