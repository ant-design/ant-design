import * as React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import RcSwitch from 'rc-switch';
import type {
  SwitchChangeEventHandler as RcSwitchChangeEventHandler,
  SwitchClickEventHandler,
} from 'rc-switch';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import useStyle from './style';

export type SwitchSize = 'small' | 'default';
export type { SwitchClickEventHandler };

export type SwitchValueType = number | string | boolean | undefined;
export type SwitchChangeEventHandler<T = boolean> = (
  value: T,
  event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
) => void;

export interface SwitchProps<T extends SwitchValueType> {
  prefixCls?: string;
  size?: SwitchSize;
  className?: string;
  rootClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: T;
  defaultValue?: T;
  checkedValue?: T;
  uncheckedValue?: T;
  onChange?: SwitchChangeEventHandler<T>;
  onClick?: SwitchClickEventHandler;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
  id?: string;
}

const InternalSwitch = <T extends SwitchValueType>(
  props: SwitchProps<T>,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    loading,
    className,
    rootClassName,
    style,
    checked: checkedProp,
    value: valueProp,
    defaultChecked: defaultCheckedProp,
    defaultValue,
    onChange,
    checkedValue = true,
    uncheckedValue = false,
    ...restProps
  } = props;

  const [value, setValue] = useMergedState<SwitchValueType>(defaultValue, {
    value: checkedProp ?? valueProp,
    defaultValue: defaultCheckedProp ?? defaultValue,
  });

  const { getPrefixCls, direction, switch: SWITCH } = React.useContext(ConfigContext);

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = (customDisabled ?? disabled) || loading;

  const prefixCls = getPrefixCls('switch', customizePrefixCls);

  const loadingIcon = (
    <div className={`${prefixCls}-handle`}>
      {loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
    </div>
  );

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const mergedSize = useSize(customizeSize);

  const classes = classNames(
    SWITCH?.className,
    {
      [`${prefixCls}-small`]: mergedSize === 'small',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = { ...SWITCH?.style, ...style };
  const changeHandler: RcSwitchChangeEventHandler = (isChecked, ...rest) => {
    const value = isChecked ? checkedValue : uncheckedValue;
    setValue(value);
    onChange?.(value, ...rest);
  };

  return wrapCSSVar(
    <Wave component="Switch">
      <RcSwitch
        {...restProps}
        checked={value === checkedValue}
        onChange={changeHandler}
        prefixCls={prefixCls}
        className={classes}
        style={mergedStyle}
        disabled={mergedDisabled}
        ref={ref}
        loadingIcon={loadingIcon}
      />
    </Wave>,
  );
};

const InternalSwitchRef = React.forwardRef(InternalSwitch) as <T extends SwitchValueType = boolean>(
  props: React.PropsWithChildren<SwitchProps<T>> & React.RefAttributes<HTMLButtonElement>,
) => React.ReactElement;

type CompoundedComponent = typeof InternalSwitchRef & {
  displayName?: string;
  /** @internal */
  __ANT_SWITCH: boolean;
};

const Switch = InternalSwitchRef as CompoundedComponent;

Switch.__ANT_SWITCH = true;

if (process.env.NODE_ENV !== 'production') {
  Switch.displayName = 'Switch';
}

export default Switch;
