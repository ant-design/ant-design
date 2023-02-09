import type { BuildInPlacements } from '@rc-component/trigger';
import { getArrowOffset } from '../style/placementArrow';

const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1,
};

const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0,
};

export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}

export interface PlacementsConfig {
  arrowWidth: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  offset: number;
  borderRadius: number;
}

export function getOverflowOptions(autoAdjustOverflow?: boolean | AdjustOverflow) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow,
  };
}

type PlacementType = keyof BuildInPlacements;

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
  const { arrowWidth, autoAdjustOverflow, arrowPointAtCenter, offset, borderRadius } = config;
  const halfArrowWidth = arrowWidth / 2;

  const placementMap: BuildInPlacements = {};

  Object.keys(PlacementAlignMap).forEach((key: PlacementType) => {
    const template =
      (arrowPointAtCenter && ArrowCenterPlacementAlignMap[key]) || PlacementAlignMap[key];

    const placementInfo = {
      ...template,
      overflow: getOverflowOptions(autoAdjustOverflow),
      offset: [0, 0],
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

      default:
      // Do nothing
    }

    // Dynamic offset
    if (arrowPointAtCenter) {
      const arrowOffset = getArrowOffset({
        contentRadius: borderRadius,
        limitVerticalRadius: true,
      });

      switch (key) {
        case 'topLeft':
        case 'bottomLeft':
          placementInfo.offset[0] = -arrowOffset.dropdownArrowOffset - halfArrowWidth;
          break;

        case 'topRight':
        case 'bottomRight':
          placementInfo.offset[0] = arrowOffset.dropdownArrowOffset + halfArrowWidth;
          break;

        case 'leftTop':
        case 'rightTop':
          placementInfo.offset[1] = -arrowOffset.dropdownArrowOffset - halfArrowWidth;
          break;

        case 'leftBottom':
        case 'rightBottom':
          placementInfo.offset[1] = arrowOffset.dropdownArrowOffset + halfArrowWidth;
          break;

        default:
        // Do nothing
      }
    }
  });

  return placementMap;
}
