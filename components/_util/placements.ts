import { placements } from 'rc-tooltip/lib/placements';
import type { BuildInPlacements } from 'rc-trigger';

const autoAdjustOverflowEnabled = {
  adjustX: 1,
  adjustY: 1,
};

const autoAdjustOverflowDisabled = {
  adjustX: 0,
  adjustY: 0,
};

const targetOffset = [0, 0];

export interface AdjustOverflow {
  adjustX?: 0 | 1;
  adjustY?: 0 | 1;
}

export interface PlacementsConfig {
  arrowWidth: number;
  horizontalArrowShift?: number;
  verticalArrowShift?: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean | AdjustOverflow;
  offset: number;
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

function getArrowOffset(type: PlacementType, arrowWidth: number, offset: number): number[] {
  switch (type) {
    case 'top':
    case 'topLeft':
    case 'topRight':
      return [0, -(arrowWidth / 2 + offset)];
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      return [0, arrowWidth / 2 + offset];
    case 'left':
    case 'leftTop':
    case 'leftBottom':
      return [-(arrowWidth / 2 + offset), 0];
    case 'right':
    case 'rightTop':
    case 'rightBottom':
      return [arrowWidth / 2 + offset, 0];
    /* istanbul ignore next */
    default:
      return [0, 0];
  }
}

function vertexCalc(point1: number[], point2: number[]): number[] {
  return [point1[0] + point2[0], point1[1] + point2[1]];
}

export default function getPlacements(config: PlacementsConfig) {
  const {
    arrowWidth,
    horizontalArrowShift = 16,
    verticalArrowShift = 8,
    autoAdjustOverflow,
    arrowPointAtCenter,
    offset,
  } = config;
  const halfArrowWidth = arrowWidth / 2;

  const placementMap: BuildInPlacements = {
    left: {
      points: ['cr', 'cl'],
      offset: [-offset, 0],
    },
    right: {
      points: ['cl', 'cr'],
      offset: [offset, 0],
    },
    top: {
      points: ['bc', 'tc'],
      offset: [0, -offset],
    },
    bottom: {
      points: ['tc', 'bc'],
      offset: [0, offset],
    },
    topLeft: {
      points: ['bl', 'tc'],
      offset: [-(horizontalArrowShift + halfArrowWidth), -offset],
    },
    leftTop: {
      points: ['tr', 'cl'],
      offset: [-offset, -(verticalArrowShift + halfArrowWidth)],
    },
    topRight: {
      points: ['br', 'tc'],
      offset: [horizontalArrowShift + halfArrowWidth, -offset],
    },
    rightTop: {
      points: ['tl', 'cr'],
      offset: [offset, -(verticalArrowShift + halfArrowWidth)],
    },
    bottomRight: {
      points: ['tr', 'bc'],
      offset: [horizontalArrowShift + halfArrowWidth, offset],
    },
    rightBottom: {
      points: ['bl', 'cr'],
      offset: [offset, verticalArrowShift + halfArrowWidth],
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      offset: [-(horizontalArrowShift + halfArrowWidth), offset],
    },
    leftBottom: {
      points: ['br', 'cl'],
      offset: [-offset, verticalArrowShift + halfArrowWidth],
    },
  };
  Object.keys(placementMap).forEach((key) => {
    placementMap[key] = arrowPointAtCenter
      ? {
          ...placementMap[key],
          offset: vertexCalc(
            placementMap[key].offset!,
            getArrowOffset(key as PlacementType, arrowWidth, offset),
          ),
          overflow: getOverflowOptions(autoAdjustOverflow),
          targetOffset,
        }
      : {
          ...placements[key],
          offset: vertexCalc(
            placements[key].offset!,
            getArrowOffset(key as PlacementType, arrowWidth, offset),
          ),
          overflow: getOverflowOptions(autoAdjustOverflow),
        };

    placementMap[key].ignoreShake = true;
  });
  return placementMap;
}
