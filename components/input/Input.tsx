import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Password from './Password';
import { Omit, LiteralUnion } from '../_util/type';
import ClearableLabeledInput, { hasPrefixSuffix } from './ClearableLabeledInput';
import { ConfigConsumer, ConfigConsumerProps, DirectionType } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import devWarning from '../_util/devWarning';

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'type'> {
  prefixCls?: string;
  size?: SizeType;
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#%3Cinput%3E_types
  type?: LiteralUnion<
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week',
    string
  >;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  bordered?: boolean;
}

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

export const hasMaxLength = (val?: number) => typeof val !== 'undefined' && +val >= 0;
// fix #27612 将value转为数组进行截取，解决 '😂'.length === 2 等emoji表情导致的截取乱码的问题
// fix:#28733 maxlength can't constraint the value set by script, so we need to do it by hand
export function truncateValue<T>(maxLength: number, value: T) {
  const val = fixControlledValue(value) as string;
  return hasMaxLength(maxLength) ? [...val].slice(0, maxLength).join('') : val;
}

export function resolveOnChange(
  target: HTMLInputElement | HTMLTextAreaElement,
  e:
    | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    | React.MouseEvent<HTMLElement, MouseEvent>,
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
) {
  if (onChange) {
    let event = e;
    if (e.type === 'click') {
      // click clear icon
      event = Object.create(e);
      event.target = target;
      event.currentTarget = target;
      const originalInputValue = target.value;
      // change target ref value cause e.target.value should be '' when clear input
      target.value = '';
      onChange(event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      // reset target ref value
      target.value = originalInputValue;
      return;
    }
    onChange(event as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  }
}

export function getInputClassName(
  prefixCls: string,
  bordered: boolean,
  size?: SizeType,
  disabled?: boolean,
  direction?: DirectionType,
) {
  return classNames(prefixCls, {
    [`${prefixCls}-sm`]: size === 'small',
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-disabled`]: disabled,
    [`${prefixCls}-rtl`]: direction === 'rtl',
    [`${prefixCls}-borderless`]: !bordered,
  });
}

export function triggerFocus(
  element?: HTMLInputElement | HTMLTextAreaElement,
  option?: InputFocusOptions,
) {
  if (!element) return;

  element.focus(option);

  // Selection content
  const { cursor } = option || {};
  if (cursor) {
    const len = element.value.length;

    switch (cursor) {
      case 'start':
        element.setSelectionRange(0, 0);
        break;

      case 'end':
        element.setSelectionRange(len, len);
        break;

      default:
        element.setSelectionRange(0, len);
    }
  }
}

export interface InputState {
  value: any;
  focused: boolean;
  /** `value` from prev props */
  prevValue: any;
  inputLock: boolean;
}

class Input extends React.Component<InputProps, InputState> {
  static Group: typeof Group;

  static Search: typeof Search;

  static TextArea: typeof TextArea;

  static Password: typeof Password;

  static defaultProps = {
    type: 'text',
  };

  input: HTMLInputElement;

  clearableInput: ClearableLabeledInput;

  removePasswordTimeout: number;

  direction: DirectionType = 'ltr';

  constructor(props: InputProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
      focused: false,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value,
      // eslint-disable-next-line react/no-unused-state
      inputLock: false,
    };
  }

  static getDerivedStateFromProps(nextProps: InputProps, { prevValue, inputLock }: InputState) {
    const { maxLength, value } = nextProps;
    const newState: Partial<InputState> = { prevValue: value };
    if (nextProps.value !== undefined || prevValue !== nextProps.value) {
      if (!inputLock && hasMaxLength(maxLength)) {
        newState.value = truncateValue(Number(maxLength), value);
      }
    }
    return newState;
  }

  componentDidMount() {
    this.clearPasswordValueAttribute();
  }

  // Since polyfill `getSnapshotBeforeUpdate` need work with `componentDidUpdate`.
  // We keep an empty function here.
  componentDidUpdate() {}

  getSnapshotBeforeUpdate(prevProps: InputProps) {
    if (hasPrefixSuffix(prevProps) !== hasPrefixSuffix(this.props)) {
      devWarning(
        this.input !== document.activeElement,
        'Input',
        `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
      );
    }
    return null;
  }

  componentWillUnmount() {
    if (this.removePasswordTimeout) {
      clearTimeout(this.removePasswordTimeout);
    }
  }

  focus = (option?: InputFocusOptions) => {
    triggerFocus(this.input, option);
  };

  blur() {
    this.input.blur();
  }

  setSelectionRange(start: number, end: number, direction?: 'forward' | 'backward' | 'none') {
    this.input.setSelectionRange(start, end, direction);
  }

  select() {
    this.input.select();
  }

  saveClearableInput = (input: ClearableLabeledInput) => {
    this.clearableInput = input;
  };

  saveInput = (input: HTMLInputElement) => {
    this.input = input;
  };

  onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    const { onFocus } = this.props;
    this.setState({ focused: true }, this.clearPasswordValueAttribute);
    if (onFocus) {
      onFocus(e);
    }
  };

  onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    const { onBlur } = this.props;
    this.setState({ focused: false }, this.clearPasswordValueAttribute);
    if (onBlur) {
      onBlur(e);
    }
  };

  setValue(value: string, callback?: () => void) {
    if (this.props.value === undefined) {
      this.setState({ value }, callback);
    } else {
      callback?.();
    }
  }

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue('', () => {
      this.focus();
    });
    resolveOnChange(this.input, e, this.props.onChange);
  };

  renderInput = (
    prefixCls: string,
    size: SizeType | undefined,
    bordered: boolean,
    input: ConfigConsumerProps['input'] = {},
  ) => {
    const { className, addonBefore, addonAfter, size: customizeSize, disabled } = this.props;
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(this.props as InputProps & { inputType: any }, [
      'prefixCls',
      'onPressEnter',
      'addonBefore',
      'addonAfter',
      'prefix',
      'suffix',
      'allowClear',
      // Input elements must be either controlled or uncontrolled,
      // specify either the value prop, or the defaultValue prop, but not both.
      'defaultValue',
      'size',
      'inputType',
      'bordered',
    ]);
    return (
      <input
        autoComplete={input.autoComplete}
        {...otherProps}
        onInput={this.handleInput}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.handleKeyDown}
        onCompositionStart={this.handleCompositionStart}
        onCompositionEnd={this.handleCompositionEnd}
        className={classNames(
          getInputClassName(prefixCls, bordered, customizeSize || size, disabled, this.direction),
          {
            [className!]: className && !addonBefore && !addonAfter,
          },
        )}
        ref={this.saveInput}
      />
    );
  };

  clearPasswordValueAttribute = () => {
    // https://github.com/ant-design/ant-design/issues/20541
    this.removePasswordTimeout = setTimeout(() => {
      if (
        this.input &&
        this.input.getAttribute('type') === 'password' &&
        this.input.hasAttribute('value')
      ) {
        this.input.removeAttribute('value');
      }
    });
  };

  handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, this.clearPasswordValueAttribute);
    resolveOnChange(this.input, e, this.props.onChange);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  handleCompositionStart = () => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ inputLock: true });
  };

  handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    const { maxLength } = this.props;
    const { value } = this.state;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ inputLock: false });
    e.data = hasMaxLength(maxLength) ? e.data.slice(0, maxLength! - value.length) : e.data;
  };

  renderComponent = ({ getPrefixCls, direction, input }: ConfigConsumerProps) => {
    const { focused, value } = this.state;
    const { prefixCls: customizePrefixCls, bordered = true } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    this.direction = direction;

    return (
      <SizeContext.Consumer>
        {size => (
          <ClearableLabeledInput
            size={size}
            {...this.props}
            prefixCls={prefixCls}
            inputType="input"
            // value={truncateValue(Number(maxLength), value)}
            value={value}
            element={this.renderInput(prefixCls, size, bordered, input)}
            handleReset={this.handleReset}
            ref={this.saveClearableInput}
            direction={direction}
            focused={focused}
            triggerFocus={this.focus}
            bordered={bordered}
          />
        )}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderComponent}</ConfigConsumer>;
  }
}

export default Input;
