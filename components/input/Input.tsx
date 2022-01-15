import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import type Group from './Group';
import type Search from './Search';
import type TextArea from './TextArea';
import type Password from './Password';
import { LiteralUnion } from '../_util/type';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigConsumer, ConfigConsumerProps, DirectionType } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import devWarning from '../_util/devWarning';
import { getInputClassName, hasPrefixSuffix } from './utils';

export interface InputFocusOptions extends FocusOptions {
  cursor?: 'start' | 'end' | 'all';
}

export interface ShowCountProps {
  formatter: (args: { count: number; maxLength?: number }) => React.ReactNode;
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
  showCount?: boolean | ShowCountProps;
  bordered?: boolean;
  htmlSize?: number;
}

export function fixControlledValue<T>(value: T) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return String(value);
}

export function resolveOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  target: E,
  e:
    | React.ChangeEvent<E>
    | React.MouseEvent<HTMLElement, MouseEvent>
    | React.CompositionEvent<HTMLElement>,
  onChange: undefined | ((event: React.ChangeEvent<E>) => void),
  targetValue?: string,
) {
  if (!onChange) {
    return;
  }
  let event = e;

  if (e.type === 'click') {
    // Clone a new target for event.
    // Avoid the following usage, the setQuery method gets the original value.
    //
    // const [query, setQuery] = React.useState('');
    // <Input
    //   allowClear
    //   value={query}
    //   onChange={(e)=> {
    //     setQuery((prevStatus) => e.target.value);
    //   }}
    // />

    const currentTarget = target.cloneNode(true) as E;

    // click clear icon
    event = Object.create(e, {
      target: { value: currentTarget },
      currentTarget: { value: currentTarget },
    });

    currentTarget.value = '';
    onChange(event as React.ChangeEvent<E>);
    return;
  }

  // Trigger by composition event, this means we need force change the input value
  if (targetValue !== undefined) {
    event = Object.create(e, {
      target: { value: target },
      currentTarget: { value: target },
    });

    target.value = targetValue;
    onChange(event as React.ChangeEvent<E>);
    return;
  }
  onChange(event as React.ChangeEvent<E>);
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
}

class Input extends React.Component<InputProps, InputState> {
  static Group: typeof Group;

  static Search: typeof Search;

  static TextArea: typeof TextArea;

  static Password: typeof Password;

  static defaultProps = {
    type: 'text',
  };

  input!: HTMLInputElement;

  clearableInput!: ClearableLabeledInput;

  removePasswordTimeout: any;

  direction: DirectionType = 'ltr';

  constructor(props: InputProps) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
      focused: false,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value,
    };
  }

  static getDerivedStateFromProps(nextProps: InputProps, { prevValue }: InputState) {
    const newState: Partial<InputState> = { prevValue: nextProps.value };
    if (nextProps.value !== undefined || prevValue !== nextProps.value) {
      newState.value = nextProps.value;
    }
    if (nextProps.disabled) {
      newState.focused = false;
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
    onFocus?.(e);
  };

  onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    const { onBlur } = this.props;
    this.setState({ focused: false }, this.clearPasswordValueAttribute);
    onBlur?.(e);
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
    const {
      className,
      addonBefore,
      addonAfter,
      size: customizeSize,
      disabled,
      htmlSize,
    } = this.props;
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
      'htmlSize',
      'showCount',
    ]);
    return (
      <input
        autoComplete={input.autoComplete}
        {...otherProps}
        onChange={this.handleChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.handleKeyDown}
        className={classNames(
          getInputClassName(prefixCls, bordered, customizeSize || size, disabled, this.direction),
          {
            [className!]: className && !addonBefore && !addonAfter,
          },
        )}
        ref={this.saveInput}
        size={htmlSize}
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

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value, this.clearPasswordValueAttribute);
    resolveOnChange(this.input, e, this.props.onChange);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };

  renderShowCountSuffix = (prefixCls: string) => {
    const { value } = this.state;
    const { maxLength, suffix, showCount } = this.props;
    // Max length value
    const hasMaxLength = Number(maxLength) > 0;

    if (suffix || showCount) {
      const valueLength = [...fixControlledValue(value)].length;
      let dataCount = null;
      if (typeof showCount === 'object') {
        dataCount = showCount.formatter({ count: valueLength, maxLength });
      } else {
        dataCount = `${valueLength}${hasMaxLength ? ` / ${maxLength}` : ''}`;
      }
      return (
        <>
          {!!showCount && (
            <span
              className={classNames(`${prefixCls}-show-count-suffix`, {
                [`${prefixCls}-show-count-has-suffix`]: !!suffix,
              })}
            >
              {dataCount}
            </span>
          )}
          {suffix}
        </>
      );
    }
    return null;
  };

  renderComponent = ({ getPrefixCls, direction, input }: ConfigConsumerProps) => {
    const { value, focused } = this.state;
    const { prefixCls: customizePrefixCls, bordered = true } = this.props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    this.direction = direction;

    const showCountSuffix = this.renderShowCountSuffix(prefixCls);

    return (
      <SizeContext.Consumer>
        {size => (
          <ClearableLabeledInput
            size={size}
            {...this.props}
            prefixCls={prefixCls}
            inputType="input"
            value={fixControlledValue(value)}
            element={this.renderInput(prefixCls, size, bordered, input)}
            handleReset={this.handleReset}
            ref={this.saveClearableInput}
            direction={direction}
            focused={focused}
            triggerFocus={this.focus}
            bordered={bordered}
            suffix={showCountSuffix}
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
