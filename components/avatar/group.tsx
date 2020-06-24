import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  hovered?: boolean;
}

const Group: React.FC<GroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, className = '', hovered } = props;
      const prefixCls = getPrefixCls('avatar-group', customizePrefixCls);
      const cls = classNames(
        prefixCls,
        {
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-hovered`]: hovered,
        },
        className,
      );
      return (
        <div className={cls} style={props.style}>
          {props.children}
        </div>
      );
    }}
  </ConfigConsumer>
);

export default Group;
