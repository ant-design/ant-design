import * as React from 'react';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import devWarning from '../_util/devWarning';

export type SwitchSize = 'small' | 'default';
export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

export interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  title?: string;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLElement>> {
  __ANT_SWITCH: boolean;
}

const Switch = React.forwardRef<unknown, SwitchProps>(
  (
    {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      loading,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    devWarning(
      'checked' in props || !('value' in props),
      'Switch',
      '`value` is not a valid prop, do you mean `checked`?',
    );

    const { getPrefixCls, direction } = React.useContext(ConfigContext);
    const size = React.useContext(SizeContext);
    const prefixCls = getPrefixCls('switch', customizePrefixCls);
    const loadingIcon = (
      <div className={`${prefixCls}-handle`}>
        {loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
      </div>
    );

    const classes = classNames(
      {
        [`${prefixCls}-small`]: (customizeSize || size) === 'small',
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    return (
      <Wave insertExtraNode>
        <RcSwitch
          {...props}
          prefixCls={prefixCls}
          className={classes}
          disabled={disabled || loading}
          ref={ref}
          loadingIcon={loadingIcon}
        />
      </Wave>
    );
  },
) as CompoundedComponent;

Switch.__ANT_SWITCH = true;
Switch.displayName = 'Switch';

export default Switch;
