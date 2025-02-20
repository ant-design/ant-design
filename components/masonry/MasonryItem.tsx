import React, { useMemo } from 'react';
import classNames from 'classnames';

import type { MasonryProps } from './Masonry';

export interface MasonryItemType<T = any> {
  key: React.Key;
  column?: number;
  height?: number;
  children?: React.ReactNode;
  data: T;
}
interface MasonryItemProps<T = any> extends Pick<MasonryProps, 'itemRender'> {
  prefixCls: string;
  item: MasonryItemType<T>;
  style: React.CSSProperties;
  className?: string;
  index: number;
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>((props, ref) => {
  const { item, style, prefixCls, itemRender, className, index } = props;

  const itemPrefix = `${prefixCls}-item`;

  // ====================== Render ======================
  const renderNode = useMemo(() => {
    return item.children ?? itemRender?.({ ...item, index });
  }, [item, itemRender]);

  return (
    <div ref={ref} style={style} className={classNames(itemPrefix, className)}>
      {renderNode}
    </div>
  );
});

export default MasonryItem;
