import React, { useMemo } from 'react';
import CSSMotion from '@rc-component/motion';
import { composeRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';

import type { MasonryProps } from './Masonry';

export interface MasonryItemType<T = any> {
  key: React.Key;
  height?: number;
  children?: React.ReactNode;
  data: T;
}
interface MasonryItemProps<T = any> extends Pick<MasonryProps, 'itemRender'> {
  prefixCls: string;
  item: MasonryItemType<T>;
  style: React.CSSProperties;
  index: number;
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>((props, ref) => {
  const { item, style, prefixCls, itemRender, index } = props;

  const itemPrefix = `${prefixCls}-item`;

  // ====================== Render ======================
  const renderNode = useMemo(() => {
    if (typeof item === 'object' && item.children !== null && item.children !== undefined) {
      return item.children;
    }
    return itemRender?.({ ...item, index });
  }, [item, itemRender]);

  return (
    <CSSMotion motionAppear visible motionName={`${itemPrefix}-fade`}>
      {({ className: motionClassName, style: motionStyle, ref: motionRef }) => {
        return (
          <div
            ref={composeRef(ref, motionRef)}
            style={{ ...motionStyle, ...style }}
            className={classNames(itemPrefix, motionClassName)}
          >
            {renderNode}
          </div>
        );
      }}
    </CSSMotion>
  );
});

export default MasonryItem;
