import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import Group from './Group';
import Search from './Search';
import TextArea from './TextArea';
import Password from './Password';
import { Omit, LiteralUnion } from '../_util/type';
import ClearableLabeledInput, {
  hasPrefixSuffix,
  ClearableLabeledInputRef,
} from './ClearableLabeledInput';
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

export function resolveOnChange(
  target: HTMLInputElement | HTMLTextAreaElement,
  e:
    | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    | React.MouseEvent<HTMLElement, MouseEvent>,
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
) {
  if (!onChange) {
    return;
  }
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

const renderInput = (
  ref: React.LegacyRef<HTMLInputElement> | undefined,
  prefixCls: string,
  contextSize: SizeType | undefined,
  bordered: boolean,
  input: ConfigConsumerProps['input'] = {},
  direction: DirectionType,
  onBlur: React.FocusEventHandler<HTMLInputElement>,
  onFocus: React.FocusEventHandler<HTMLInputElement>,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>,
  parentProps: InputProps,
) => {
  const { className, addonBefore, addonAfter, size: customizeSize, disabled } = parentProps;
  // Fix https://fb.me/react-unknown-prop
  const otherProps = omit(parentProps as InputProps & { inputType: any }, [
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
  const inputClassName = classNames(
    getInputClassName(prefixCls, bordered, customizeSize || contextSize, disabled, direction),
    {
      [className!]: className && !addonBefore && !addonAfter,
    },
  );

  return (
    <input
      autoComplete={input.autoComplete}
      {...otherProps}
      ref={ref}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={inputClassName}
    />
  );
};

interface SetSelectionRangeFun {
  (start: number, end: number, SelectDirection?: 'forward' | 'backward' | 'none'): void;
}
export interface InputRef {
  input: HTMLInputElement | null;
  clearableInput: ClearableLabeledInputRef | null;
  blur: () => void;
  focus: (option?: InputFocusOptions) => void;
  select: () => void;
  setSelectionRange: SetSelectionRangeFun;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<InputRef>> {
  Group: typeof Group;
  Search: typeof Search;
  TextArea: typeof TextArea;
  Password: typeof Password;
}

const Input = React.forwardRef((props, ref) => {
  const propsValue = typeof props.value === 'undefined' ? props.defaultValue : props.value;
  const [value, originSetValue] = React.useState<any>(propsValue);
  const [focused, setFocused] = React.useState(false);
  /** `value` from prev props */
  const [prevValue, setPrevValue] = React.useState<any>(props.value);

  const input = React.useRef<HTMLInputElement>(null);
  const clearableInput = React.useRef<ClearableLabeledInputRef>(null);

  const direction = React.useRef<DirectionType>('ltr');
  const removePasswordTimeout = React.useRef<any>();

  const valueChangeTaskQueue = React.useRef<(() => void)[]>([]);

  const nextHasPrefixSuffix = hasPrefixSuffix(props);
  const preveHasPrefixSuffix = React.useRef(nextHasPrefixSuffix);

  if (preveHasPrefixSuffix.current !== nextHasPrefixSuffix) {
    preveHasPrefixSuffix.current = nextHasPrefixSuffix;
    devWarning(
      input.current !== document.activeElement,
      'Input',
      `When Input is focused, dynamic add or remove prefix / suffix will make it lose focus caused by dom structure change. Read more: https://ant.design/components/input/#FAQ`,
    );
  }

  const setValue = (newValue: string, callback?: () => void) => {
    if (props.value === undefined) {
      originSetValue(newValue);
      if (callback) valueChangeTaskQueue.current.push(callback);
    } else {
      callback?.();
    }
  };

  const blur = () => {
    if (input.current) input.current.blur();
  };

  const focus = (option?: InputFocusOptions) => {
    if (input.current) triggerFocus(input.current, option);
  };

  const select = () => {
    if (input.current) input.current.select();
  };

  const setSelectionRange: SetSelectionRangeFun = (start, end, SelectDirection) => {
    if (input.current) input.current.setSelectionRange(start, end, SelectDirection);
  };

  const clearPasswordValueAttribute = () => {
    // https://github.com/ant-design/ant-design/issues/20541
    removePasswordTimeout.current = setTimeout(() => {
      if (
        input.current &&
        input.current.getAttribute('type') === 'password' &&
        input.current.hasAttribute('value')
      ) {
        input.current.removeAttribute('value');
      }
    });
  };

  const onFocus: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const onBlur: React.FocusEventHandler<HTMLInputElement> = e => {
    setFocused(false);
    props.onBlur?.(e);
  };

  const handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setValue('', focus);
    if (input.current) resolveOnChange(input.current, e, props.onChange);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value, clearPasswordValueAttribute);
    if (input.current) resolveOnChange(input.current, e, props.onChange);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = props;
    if (onPressEnter && e.keyCode === 13) {
      onPressEnter(e);
    }
    onKeyDown?.(e);
  };

  const renderComponent = ({
    getPrefixCls,
    direction: customDirection,
    input: customInput,
  }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, bordered = true } = props;
    const prefixCls = getPrefixCls('input', customizePrefixCls);
    direction.current = customDirection;

    return (
      <SizeContext.Consumer>
        {size => (
          <ClearableLabeledInput
            size={size}
            {...props}
            prefixCls={prefixCls}
            inputType="input"
            value={fixControlledValue(value)}
            element={renderInput(
              input,
              prefixCls,
              size,
              bordered,
              customInput,
              direction.current,
              onBlur,
              onFocus,
              handleChange,
              handleKeyDown,
              props,
            )}
            handleReset={handleReset}
            ref={clearableInput}
            direction={direction.current}
            focused={focused}
            triggerFocus={focus}
            bordered={bordered}
          />
        )}
      </SizeContext.Consumer>
    );
  };

  React.useImperativeHandle(ref, () => ({
    input: input.current,
    clearableInput: clearableInput.current,
    blur,
    focus,
    select,
    setSelectionRange,
  }));

  React.useEffect(() => {
    clearPasswordValueAttribute();
    return () => {
      if (removePasswordTimeout.current) {
        clearTimeout(removePasswordTimeout.current);
      }
    };
  }, []);

  React.useEffect(() => {
    valueChangeTaskQueue.current.forEach(callback => callback());
    valueChangeTaskQueue.current = [];
  }, [value]);

  React.useEffect(() => {
    clearPasswordValueAttribute();
  }, [focused]);

  React.useEffect(() => {
    setPrevValue(prevValue);
    if (props.value !== undefined || props.value !== prevValue) {
      originSetValue(props.value);
    }
  }, [props.value]);

  return <ConfigConsumer>{renderComponent}</ConfigConsumer>;
}) as CompoundedComponent;

Input.defaultProps = {
  type: 'text',
};

export default Input;
