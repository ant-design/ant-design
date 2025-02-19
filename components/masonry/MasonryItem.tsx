import React, { useMemo } from 'react';

import type { MasonryProps } from './Masonry';

export interface MasonryItemType {
  key?: React.Key;
  height?: number;
  children?: React.ReactNode;
}
interface MasonryItemProps extends Pick<MasonryProps, 'itemRender'> {
  prefixCls: string;
  item: MasonryItemType;
  style: React.CSSProperties;
  index: number;
}

const MasonryItem = React.forwardRef<HTMLDivElement, MasonryItemProps>((props, ref) => {
  const { item, style, prefixCls, itemRender, index } = props;

  // ====================== Render ======================
  const renderNode = useMemo(() => {
    if (typeof item === 'object' && item.children !== null && item.children !== undefined) {
      return item.children;
    }
    return itemRender?.(item, { index });
  }, [item, itemRender]);

  return (
    <div ref={ref} style={style} className={`${prefixCls}-item`}>
      {renderNode}
    </div>
  );
});

export default MasonryItem;
