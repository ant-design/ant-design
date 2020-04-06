import * as React from 'react';
import classNames from 'classnames';
import { SizeType } from '../config-provider/SizeContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import UnreachableException from '../_util/unreachableException';

export interface ButtonGroupProps {
  size?: SizeType;
  style?: React.CSSProperties;
  className?: string;
  prefixCls?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls, direction }: ConfigConsumerProps) => {
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
          console.warn(new UnreachableException(size));
      }

      const classes = classNames(
        prefixCls,
        {
          [`${prefixCls}-${sizeCls}`]: sizeCls,
          [`${prefixCls}-rtl`]: direction === 'rtl',
        },
        className,
      );

      return <div {...others} className={classes} />;
    }}
  </ConfigConsumer>
);

export default ButtonGroup;
