import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  size?: 'large' | 'small' | 'default';
  block?: boolean;
}

const SkeletonInput = (props: SkeletonInputProps) => {
  const { prefixCls: customizePrefixCls, className, active, block } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

  const otherProps = omit(props, ['prefixCls']);
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block,
    },
    className,
  );
  return (
    <div className={cls}>
      <Element prefixCls={`${prefixCls}-input`} {...otherProps} />
    </div>
  );
};

SkeletonInput.defaultProps = {
  size: 'default',
};

export default SkeletonInput;
