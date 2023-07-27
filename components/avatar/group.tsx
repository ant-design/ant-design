import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Popover from '../popover';
import { cloneElement } from '../_util/reactNode';
import Avatar from './avatar';
import AvatarContext from './avatarContext';
import type { AvatarContextType, AvatarSize } from './avatarContext';
import useStyle from './style';

export interface GroupProps {
  className?: string;
  rootClassName?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  maxCount?: number;
  maxStyle?: React.CSSProperties;
  maxPopoverPlacement?: 'top' | 'bottom';
  maxPopoverTrigger?: 'hover' | 'focus' | 'click';
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size?: AvatarSize;
  shape?: 'circle' | 'square';
}

const Group: React.FC<GroupProps> = (props) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    maxCount,
    maxStyle,
    size,
    shape,
    maxPopoverPlacement = 'top',
    maxPopoverTrigger = 'hover',
    children,
  } = props;

  const prefixCls = getPrefixCls('avatar', customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    groupPrefixCls,
    {
      [`${groupPrefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  const childrenWithProps = toArray(children).map((child, index) =>
    cloneElement(child, { key: `avatar-key-${index}` }),
  );

  const contextValue = React.useMemo<AvatarContextType>(() => ({ size, shape }), [size, shape]);

  const numOfChildren = childrenWithProps.length;
  if (maxCount && maxCount < numOfChildren) {
    const childrenShow = childrenWithProps.slice(0, maxCount);
    const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
    childrenShow.push(
      <Popover
        key="avatar-popover-key"
        content={childrenHidden}
        trigger={maxPopoverTrigger}
        placement={maxPopoverPlacement}
        overlayClassName={`${groupPrefixCls}-popover`}
      >
        <Avatar style={maxStyle}>{`+${numOfChildren - maxCount}`}</Avatar>
      </Popover>,
    );
    return wrapSSR(
      <AvatarContext.Provider value={contextValue}>
        <div className={cls} style={style}>
          {childrenShow}
        </div>
      </AvatarContext.Provider>,
    );
  }

  return wrapSSR(
    <AvatarContext.Provider value={contextValue}>
      <div className={cls} style={style}>
        {childrenWithProps}
      </div>
    </AvatarContext.Provider>,
  );
};

export default Group;
