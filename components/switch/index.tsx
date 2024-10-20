import * as React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import classNames from 'classnames';
import RcSwitch from 'rc-switch';
import type { SwitchChangeEventHandler, SwitchClickEventHandler } from 'rc-switch';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import useStyle from './style';

export type SwitchSize = 'small' | 'default';
export type { SwitchChangeEventHandler, SwitchClickEventHandler };

export interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  className?: string;
  rootClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  /**
   * Alias for `checked`.
   * @since 5.12.0
   */
  value?: boolean;
  /**
   * Alias for `defaultChecked`.
   * @since 5.12.0
   */
  defaultValue?: boolean;
  onChange?: SwitchChangeEventHandler;
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

const InternalSwitch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    loading,
    className,
    rootClassName,
    style,
    checked: checkedProp,
    value,
    defaultChecked: defaultCheckedProp,
    defaultValue,
    onChange,
    ...restProps
  } = props;

  const [checked, setChecked] = useMergedState<boolean>(false, {
    value: checkedProp ?? value,
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

  const changeHandler: SwitchChangeEventHandler = (...args) => {
    setChecked(args[0]);
    onChange?.(...args);
  };

  return wrapCSSVar(
    <Wave component="Switch">
      <RcSwitch
        {...restProps}
        checked={checked}
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
});

type CompoundedComponent = typeof InternalSwitch & {
  /** @internal */
  __ANT_SWITCH: boolean;
};

const Switch = InternalSwitch as CompoundedComponent;

Switch.__ANT_SWITCH = true;

if (process.env.NODE_ENV !== 'production') {
  Switch.displayName = 'Switch';
}

export default Switch;
