import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import warning from '../_util/warning';

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'btn' | 'input';
  size?: SizeType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
  compact?: boolean;
  children?: React.ReactNode;
}

export const GroupSizeContext = React.createContext<SizeType | undefined>(undefined);

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const { prefixCls: customizePrefixCls, size, className, ...others } = props;
  const prefixCls = getPrefixCls('group', customizePrefixCls);
  const groupPrefixClx = getPrefixCls(`${props.type}-group`, customizePrefixCls);

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
        warning(!size, 'Group', 'Invalid prop `size`.');
        return '';
    }
  }, [size]);

  const classes = classNames(
    prefixCls,
    groupPrefixClx,
    {
      [`${groupPrefixClx}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-compact`]: props.compact,
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
