import * as React from 'react';
import classNames from 'classnames';
import type {
  CheckboxRef,
  CheckboxProps as RcCheckboxProps,
  CheckboxChangeEvent,
} from 'rc-checkbox';
import RcCheckbox from 'rc-checkbox';

import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import { FormItemInputContext } from '../form/context';
import GroupContext from './GroupContext';
import useStyle from './style';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

export interface AbstractCheckboxProps extends Pick<RcCheckboxProps, 'onChange'> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  /**
   * Alias for `defaultChecked`.
   * @since 5.12.0
   */
  defaultValue?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any; // (native input value) | boolean
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export type { CheckboxChangeEvent };

export interface CheckboxProps extends AbstractCheckboxProps {
  indeterminate?: boolean;
}

const InternalCheckbox: React.ForwardRefRenderFunction<CheckboxRef, CheckboxProps> = (
  props,
  ref,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    disabled,
    checked: checkedProp,
    defaultChecked: defaultCheckedProp,
    value,
    defaultValue,
    ...restProps
  } = props;
  const { getPrefixCls, direction, checkbox } = React.useContext(ConfigContext);
  const checkboxGroup = React.useContext(GroupContext);
  const { isFormItemInput } = React.useContext(FormItemInputContext);
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = (checkboxGroup?.disabled || disabled) ?? contextDisabled;

  const [checked, setChecked] = useMergedState<boolean>(false, {
    value:
      checkedProp ??
      /**
       * The native html input element does not allow passing a value of bool.
       * ooh, this is a bad hack, but it works.
       */
      (checkboxGroup || typeof value !== 'boolean' ? undefined : value),
    defaultValue: defaultCheckedProp ?? defaultValue,
  });

  const prevValue = React.useRef(value);

  React.useEffect(() => {
    checkboxGroup?.registerValue(value);
  }, []);

  React.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(value);
      prevValue.current = value;
    }
    return () => checkboxGroup?.cancelValue(value);
  }, [value]);

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const changeHandler = (event: CheckboxChangeEvent) => {
    restProps.onChange?.(event);
    setChecked(event.target.checked);
  };

  const checkboxProps: Omit<CheckboxProps, 'defaultValue'> = {
    ...restProps,
    checked,
    onChange: changeHandler,
    // bad hack :(, because rc-checkbox passes directly to the html input tag.
    ...(value ? { value } : {}),
  };

  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      restProps.onChange?.(...args);
      checkboxGroup.toggleOption?.({ label: children, value });
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(value);
  }

  const classString = classNames(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    },
    checkbox?.className,
    className,
    rootClassName,
    hashId,
  );
  const checkboxClass = classNames(
    {
      [`${prefixCls}-indeterminate`]: indeterminate,
    },
    TARGET_CLS,
    hashId,
  );
  const ariaChecked = indeterminate ? 'mixed' : undefined;
  return wrapSSR(
    <Wave component="Checkbox" disabled={mergedDisabled}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={classString}
        style={{ ...checkbox?.style, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <RcCheckbox
          aria-checked={ariaChecked}
          {...checkboxProps}
          prefixCls={prefixCls}
          className={checkboxClass}
          disabled={mergedDisabled}
          ref={ref}
        />
        {children !== undefined && <span>{children}</span>}
      </label>
    </Wave>,
  );
};

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(InternalCheckbox);

if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
