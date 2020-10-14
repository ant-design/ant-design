import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { Breakpoint, responsiveArray, ScreenSizeMap } from '../_util/responsiveObserve';
import useBreakpoint from '../grid/hooks/useBreakpoint';
import Avatar from './avatar';
import Popover from '../popover';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  maxCount?: number;
  maxStyle?: React.CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  size?: 'large' | 'small' | 'default' | number | ScreenSizeMap;
}

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '', maxCount, maxStyle, size } = props;
  const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const screens = useBreakpoint();
  const responsiveSizeStyle: React.CSSProperties = React.useMemo(() => {
    if (typeof size !== 'object') {
      return {};
    }

    const currentBreakpoint: Breakpoint = responsiveArray.find(screen => screens[screen])!;
    const currentSize = size[currentBreakpoint];

    return currentSize
      ? {
          width: currentSize,
          height: currentSize,
          lineHeight: `${currentSize}px`,
          fontSize: 18,
        }
      : {};
  }, [screens, size]);

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: 18,
        }
      : {};

  const maxPrefixCls = getPrefixCls('avatar', customizePrefixCls);

  const maxSizeCls = classNames({
    [`${maxPrefixCls}-lg`]: size === 'large',
    [`${maxPrefixCls}-sm`]: size === 'small',
  });

  const { children, maxPopoverPlacement = 'top' } = props;
  const childrenWithProps = toArray(children).map((child, index) => {
    return cloneElement(child, {
      key: `avatar-key-${index}`,
    });
  });

  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push(
      <Popover
        key="avatar-popover-key"
        content={childrenHidden}
        trigger="hover"
        placement={maxPopoverPlacement}
        overlayClassName={`${prefixCls}-popover`}
      >
        <Avatar
          className={maxSizeCls}
          style={{ ...maxStyle, ...sizeStyle, ...responsiveSizeStyle }}
        >{`+${numOfChildren - maxCount}`}</Avatar>
      </Popover>,
    );
    return (
      <div className={cls} style={props.style}>
        {childrenShow}
      </div>
    );
  }
  return (
    <div className={cls} style={props.style}>
      {children}
    </div>
  );
};

export default Group;
