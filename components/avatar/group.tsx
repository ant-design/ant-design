import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { ConfigContext } from '../config-provider';
import Avatar from './avatar';
import Popover from '../popover';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  maxAvatarCount?: number;
  maxAvatarStyle?: React.CSSProperties;
  maxAvatarPopoverPlacement?: 'top' | 'bottom';
}

const Group: React.FC<GroupProps> = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '', maxAvatarCount, maxAvatarStyle } = props;
  const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  const renderChildren = () => {
    const { children, maxAvatarPopoverPlacement = 'top' } = props;
    const childrenWithProps = toArray(children);
    const numOfChildren = childrenWithProps.length;
    if (maxAvatarCount && maxAvatarCount < numOfChildren) {
      const childrenShow = childrenWithProps.slice(0, maxAvatarCount);
      const childrenHidden = childrenWithProps.slice(maxAvatarCount, numOfChildren);
      childrenShow.push(
        <Popover
          content={childrenHidden}
          trigger="hover"
          placement={maxAvatarPopoverPlacement}
          overlayClassName={`${prefixCls}-popover`}
        >
          <Avatar style={maxAvatarStyle}>{`+${numOfChildren - maxAvatarCount}`}</Avatar>
        </Popover>,
      );
      return childrenShow;
    }
    return children;
  };

  return (
    <div className={cls} style={props.style}>
      {renderChildren()}
    </div>
  );
};

export default Group;
