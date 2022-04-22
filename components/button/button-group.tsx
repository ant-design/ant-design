import * as React from 'react';
import classNames from 'classnames';
import { SizeType } from '../config-provider/SizeContext';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';
import UnreachableException from '../_util/unreachableException';

export interface ButtonGroupProps {
  size?: SizeType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode;
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(undefined);

const ButtonGroup: React.FC<ButtonGroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, size, className, ...others } = props;
  const prefixCls = getPrefixCls('btn-group', customizePrefixCls);

  // large => lg
  // small => sm
  let sizeCls = '';
  switch (size) {
    case 'large':
      sizeCls = 'lg';
      break;
    case 'small':
      sizeCls = 'sm';
      break;
    case 'middle':
    case undefined:
      break;
    default:
      // eslint-disable-next-line no-console
      console.warn(new UnreachableException(size).error);
  }

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <GroupSizeContext.Provider value={size}>
      <div {...others} className={classes} />
    </GroupSizeContext.Provider>
  );
};

export default ButtonGroup;
