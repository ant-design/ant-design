import React from 'react';
import type { TreeProps } from '@rc-component/tree';
import type { DataNode } from '@rc-component/tree/lib/interface';

import type { DirectionType } from '../../config-provider';

export const offset = 4;

interface DropIndicatorProps {
  dropPosition: -1 | 0 | 1;
  dropLevelOffset: number;
  indent: number;
  prefixCls: string;
  direction: DirectionType;
}

const dropIndicatorRender = (props: DropIndicatorProps) => {
  const { dropPosition, dropLevelOffset, prefixCls, indent, direction = 'ltr' } = props;
  const startPosition = direction === 'ltr' ? 'left' : 'right';
  const endPosition = direction === 'ltr' ? 'right' : 'left';
  const style: React.CSSProperties = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0,
  };
  switch (dropPosition) {
    case -1:
      style.top = -3;
      break;
    case 1:
      style.bottom = -3;
      break;
    default:
      // dropPosition === 0
      style.bottom = -3;
      style[startPosition] = indent + offset;
      break;
  }
  return <div style={style} className={`${prefixCls}-drop-indicator`} />;
};

export default dropIndicatorRender as TreeProps<DataNode>['dropIndicatorRender'];
