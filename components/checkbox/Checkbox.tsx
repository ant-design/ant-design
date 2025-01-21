import * as React from 'react';
import classNames from 'classnames';
import type { CheckboxRef } from 'rc-checkbox';
import RcCheckbox from 'rc-checkbox';
import { composeRef } from 'rc-util/lib/ref';

import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { FormItemInputContext } from '../form/context';
import GroupContext from './GroupContext';
import useStyle from './style';
import useBubbleLock from './useBubbleLock';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  title?: string;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
  required?: boolean;
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

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
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
    ...restProps
  } = props;
  const { getPrefixCls, direction, checkbox } = React.useContext(ConfigContext);
  const checkboxGroup = React.useContext(GroupContext);
  const { isFormItemInput } = React.useContext(FormItemInputContext);
  const contextDisabled = React.useContext(DisabledContext);
  const mergedDisabled = (checkboxGroup?.disabled || disabled) ?? contextDisabled;

  const prevValue = React.useRef(restProps.value);
  const checkboxRef = React.useRef<CheckboxRef>(null);
  const mergedRef = composeRef(ref, checkboxRef);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Checkbox');

    warning(
      'checked' in restProps || !!checkboxGroup || !('value' in restProps),
      'usage',
      '`value` is not a valid prop, do you mean `checked`?',
    );
  }

  React.useEffect(() => {
    checkboxGroup?.registerValue(restProps.value);
  }, []);

  React.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup?.cancelValue(restProps.value);
  }, [restProps.value]);

  React.useEffect(() => {
    if (checkboxRef.current?.input) {
      checkboxRef.current.input.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const checkboxProps: CheckboxProps = { ...restProps };
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value: restProps.value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.includes(restProps.value);
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
    cssVarCls,
    rootCls,
    hashId,
  );
  const checkboxClass = classNames(
    { [`${prefixCls}-indeterminate`]: indeterminate },
    TARGET_CLS,
    hashId,
  );

  // ============================ Event Lock ============================
  const [onLabelClick, onInputClick] = useBubbleLock(checkboxProps.onClick);

  // ============================== Render ==============================
  return wrapCSSVar(
    <Wave component="Checkbox" disabled={mergedDisabled}>
      <label
        className={classString}
        style={{ ...checkbox?.style, ...style }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onLabelClick}
      >
        {/* @ts-ignore */}
        <RcCheckbox
          {...checkboxProps}
          onClick={onInputClick}
          prefixCls={prefixCls}
          className={checkboxClass}
          disabled={mergedDisabled}
          ref={mergedRef}
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
