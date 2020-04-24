import * as React from 'react';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import omit from 'omit.js';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';

import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

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

interface SwitchTypeProps extends React.FC<SwitchProps> {
  __ANT_SWITCH: boolean;
}

const Switch: SwitchTypeProps = ({ ...props }) => {
  warning(
    'checked' in props || !('value' in props),
    'Switch',
    '`value` is not a valid prop, do you mean `checked`?',
  );

  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    loading,
    className = '',
    disabled,
  } = props;

  const ref = React.createRef();
  const { getPrefixCls, direction, space } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('switch', customizePrefixCls);
  const loadingIcon = loading ? <LoadingOutlined className={`${prefixCls}-loading-icon`} /> : null;

  const classes = classNames(className, {
    [`${prefixCls}-small`]: (customizeSize || (space && space.size)) === 'small',
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  return (
    <Wave insertExtraNode>
      <RcSwitch
        {...omit(props, ['loading'])}
        prefixCls={prefixCls}
        className={classes}
        disabled={disabled || loading}
        ref={ref}
        loadingIcon={loadingIcon}
      />
    </Wave>
  );
};

Switch.__ANT_SWITCH = true;

export default Switch;
