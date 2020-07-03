import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Avatar from './avatar';
import Popover from '../popover';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  excessPopoverPlacement?: 'top' | 'bottom';
}

const Group: React.FC<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className = '', maxLength, excessItemsStyle } = props;
      const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      );

      const renderChildren = () => {
        const { children, excessPopoverPlacement = 'top' } = props;
        const numOfChildren = React.Children.count(children);
        const childrenWithProps = React.Children.toArray(children);
        if (maxLength && maxLength < numOfChildren) {
          const childrenShow = childrenWithProps.slice(0, maxLength);
          const childrenHidden = childrenWithProps.slice(maxLength, numOfChildren);
          childrenShow.push(
            <Popover content={childrenHidden} trigger="hover" placement={excessPopoverPlacement}>
              <Avatar style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
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
    }}
  </ConfigConsumer>
);

export default Group;
