import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import type { SkeletonElementProps } from './Element';
import Element from './Element';
import useStyle from './style';

export interface SkeletonInputProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  size?: SizeType;
  block?: boolean;
}

const SkeletonInput: React.FC<SkeletonInputProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames,
    rootClassName,
    active,
    block,
    style,
    styles,
    size: customSize,
    ...rest
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const mergedSize = useSize((ctx) => customSize ?? ctx);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block,
    },
    classNames?.root,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  return (
    <div className={cls} style={styles?.root}>
      <Element
        prefixCls={`${prefixCls}-input`}
        className={classNames?.content}
        style={{ ...styles?.content, ...style }}
        size={mergedSize}
        {...rest}
      />
    </div>
  );
};

export default SkeletonInput;
