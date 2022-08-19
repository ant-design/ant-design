import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import warning from '../_util/warning';

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode;
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(undefined);

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, size, className, ...others } = props;
  const prefixCls = getPrefixCls('group', customizePrefixCls);

  const sizeCls = React.useMemo(() => {
    // large => lg
    // small => sm
    switch (size) {
      case 'large':
        return 'lg';
      case 'small':
        return 'sm';
      case 'middle':
      case undefined:
        return '';
      default:
        warning(!size, 'Button.Group', 'Invalid prop `size`.');
        return '';
    }
  }, [size]);

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

export default Group;
