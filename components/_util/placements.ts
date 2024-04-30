/* eslint-disable default-case */
import type { AlignType, BuildInPlacements } from '@rc-component/trigger';

import { getArrowOffsetToken } from '../style/placementArrow';

/**
 * @descCN 对 autoAdjustOverflow 的补充，可以设置横纵两个方向。
 * @descEN Supplement to autoAdjustOverflow, you can set both horizontal and vertical directions.
 */
export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}

/**
 * @descCN 定义弹出框的定位配置参数。
 * @descEN Defines the positioning configuration parameters of the pop-up box.
 */
export interface PlacementsConfig {
  arrowWidth: number;
  /**
   * @descCN 箭头是否指向弹出框的中心。
   * @descEN Whether the arrow points to the center of the popup box.
   */
  arrowPointAtCenter?: boolean;
  /**
   * @descCN 用于控制弹出框在超出视窗时的自动调整。
   * @descEN Used to control the automatic adjustment of the pop-up box when it exceeds the window.
   */
  autoAdjustOverflow?: boolean | AdjustOverflow;
  /**
   * @descCN 偏移量，用于微调弹出框的位置。
   * @descEN Offset, used to fine-tune the position of the pop-up box.
   */
  offset: number;
  borderRadius: number;
  visibleFirst?: boolean;
}

export function getOverflowOptions(
  placement: string,
  arrowOffset: ReturnType<typeof getArrowOffsetToken>,
  arrowWidth: number,
  autoAdjustOverflow?: boolean | AdjustOverflow,
) {
  if (autoAdjustOverflow === false) {
    return {
      adjustX: false,
      adjustY: false,
    };
  }

  const overflow =
    autoAdjustOverflow && typeof autoAdjustOverflow === 'object' ? autoAdjustOverflow : {};

  const baseOverflow: AlignType['overflow'] = {};

  switch (placement) {
    case 'top':
    case 'bottom':
      baseOverflow.shiftX = arrowOffset.arrowOffsetHorizontal * 2 + arrowWidth;
      baseOverflow.shiftY = true;
      baseOverflow.adjustY = true;
      break;

    case 'left':
    case 'right':
      baseOverflow.shiftY = arrowOffset.arrowOffsetVertical * 2 + arrowWidth;
      baseOverflow.shiftX = true;
      baseOverflow.adjustX = true;
      break;
  }

  const mergedOverflow = {
    ...baseOverflow,
    ...overflow,
  };

  // Support auto shift
  if (!mergedOverflow.shiftX) {
    mergedOverflow.adjustX = true;
  }
  if (!mergedOverflow.shiftY) {
    mergedOverflow.adjustY = true;
  }

  return mergedOverflow;
}

type PlacementType = keyof BuildInPlacements;

/**
 * @descCN 定义了各种常见位置的对齐方式，表示触发元素和弹出框的位置关系的映射表
 * @descEN Defines the alignment of various common positions and a mapping table that represents the positional relationship between trigger elements and pop-up boxes.
 */
const PlacementAlignMap: BuildInPlacements = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  leftTop: {
    points: ['tr', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  rightTop: {
    points: ['tl', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  rightBottom: {
    points: ['bl', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
  leftBottom: {
    points: ['br', 'bl'],
  },
};

/**
 * @descCN 定义箭头指向弹出框中心时的位置对齐的映射表。
 * @descEN A mapping table that defines the position alignment when the arrow points to the center of the pop-up box.
 */
const ArrowCenterPlacementAlignMap: BuildInPlacements = {
  topLeft: {
    points: ['bl', 'tc'],
  },
  leftTop: {
    points: ['tr', 'cl'],
  },
  topRight: {
    points: ['br', 'tc'],
  },
  rightTop: {
    points: ['tl', 'cr'],
  },
  bottomRight: {
    points: ['tr', 'bc'],
  },
  rightBottom: {
    points: ['bl', 'cr'],
  },
  bottomLeft: {
    points: ['tl', 'bc'],
  },
  leftBottom: {
    points: ['br', 'cl'],
  },
};

/**
 * @descCN 定义箭头指向弹出框中心时的位置对齐的映射表。
 * @descEN A mapping table that defines the position alignment when the arrow points to the center of the pop-up box.
 */
const DisableAutoArrowList: Set<keyof BuildInPlacements> = new Set([
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom',
]);

export default function getPlacements(config: PlacementsConfig) {
  const { arrowWidth, autoAdjustOverflow, arrowPointAtCenter, offset, borderRadius, visibleFirst } =
    config;
  const halfArrowWidth = arrowWidth / 2;

  const placementMap: BuildInPlacements = {};

  Object.keys(PlacementAlignMap).forEach((key: PlacementType) => {
    const template =
      (arrowPointAtCenter && ArrowCenterPlacementAlignMap[key]) || PlacementAlignMap[key];

    const placementInfo = {
      ...template,
      offset: [0, 0],
      dynamicInset: true,
    };
    placementMap[key] = placementInfo;

    // Disable autoArrow since design is fixed position
    if (DisableAutoArrowList.has(key)) {
      placementInfo.autoArrow = false;
    }

    // Static offset
    switch (key) {
      case 'top':
      case 'topLeft':
      case 'topRight':
        placementInfo.offset[1] = -halfArrowWidth - offset;
        break;

      case 'bottom':
      case 'bottomLeft':
      case 'bottomRight':
        placementInfo.offset[1] = halfArrowWidth + offset;
        break;

      case 'left':
      case 'leftTop':
      case 'leftBottom':
        placementInfo.offset[0] = -halfArrowWidth - offset;
        break;

      case 'right':
      case 'rightTop':
      case 'rightBottom':
        placementInfo.offset[0] = halfArrowWidth + offset;
        break;
    }

    // Dynamic offset
    const arrowOffset = getArrowOffsetToken({
      contentRadius: borderRadius,
      limitVerticalRadius: true,
    });

    if (arrowPointAtCenter) {
      switch (key) {
        case 'topLeft':
        case 'bottomLeft':
          placementInfo.offset[0] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;

        case 'topRight':
        case 'bottomRight':
          placementInfo.offset[0] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;

        case 'leftTop':
        case 'rightTop':
          placementInfo.offset[1] = -arrowOffset.arrowOffsetHorizontal - halfArrowWidth;
          break;

        case 'leftBottom':
        case 'rightBottom':
          placementInfo.offset[1] = arrowOffset.arrowOffsetHorizontal + halfArrowWidth;
          break;
      }
    }

    // Overflow
    placementInfo.overflow = getOverflowOptions(key, arrowOffset, arrowWidth, autoAdjustOverflow);

    // VisibleFirst
    if (visibleFirst) {
      placementInfo.htmlRegion = 'visibleFirst';
    }
  });

  return placementMap;
}
