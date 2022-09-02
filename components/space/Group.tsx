import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SizeType, inGroup } from '../config-provider/SizeContext';
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

export const GroupContext = React.createContext<{
  size: SizeType;
  compact: boolean;
  inGroup: boolean;
}>({
  size: undefined,
  compact: false,
  inGroup: false,
});

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const contextSize = React.useContext(SizeContext);

  const {
    prefixCls: customizePrefixCls,
    size = contextSize,
    className,
    compact,
    ...restProps
  } = props;
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
        warning(!size, 'Group', 'Invalid prop `size`.');
        return '';
    }
  }, [size]);

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-compact`]: compact,
    },
    className,
  );

  const sizeValue = React.useMemo(
    () => ({
      size,
      compact: !!compact,
      inGroup: true,
    }),
    [size, compact],
  );

  return (
    <GroupContext.Provider value={sizeValue}>
      <div {...restProps} className={classes} />
    </GroupContext.Provider>
  );
};

export default Group;
