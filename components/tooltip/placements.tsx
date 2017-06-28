import { getPlacements as getRcPlacements } from 'rc-tooltip/lib/placements';

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
  arrowWidth?: number;
  horizontalArrowShift?: number;
  verticalArrowShift?: number;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: any;
}

export function getOverflowOptions(autoAdjustOverflow: any) {
  if (typeof autoAdjustOverflow === 'boolean') {
    return autoAdjustOverflow ? autoAdjustOverflowEnabled : autoAdjustOverflowDisabled;
  }
  return {
    ...autoAdjustOverflowDisabled,
    ...autoAdjustOverflow,
  };
}

export default function getPlacements(config: PlacementsConfig = {}) {
  const { arrowWidth = 5, horizontalArrowShift = 16, verticalArrowShift = 12, autoAdjustOverflow = true } = config;
  if (!config.arrowPointAtCenter) {
    return getRcPlacements({ autoAdjustOverflow });
  }
  const overflowOptions = getOverflowOptions(autoAdjustOverflow);
  return {
    left: {
      points: ['cr', 'cl'],
      overflow: overflowOptions,
      offset: [-4, 0],
      targetOffset,
    },
    right: {
      points: ['cl', 'cr'],
      overflow: overflowOptions,
      offset: [4, 0],
      targetOffset,
    },
    top: {
      points: ['bc', 'tc'],
      overflow: overflowOptions,
      offset: [0, -4],
      targetOffset,
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: overflowOptions,
      offset: [0, 4],
      targetOffset,
    },
    topLeft: {
      points: ['bl', 'tc'],
      overflow: overflowOptions,
      offset: [-(horizontalArrowShift + arrowWidth), -4],
      targetOffset,
    },
    leftTop: {
      points: ['tr', 'cl'],
      overflow: overflowOptions,
      offset: [-4, -(verticalArrowShift + arrowWidth)],
      targetOffset,
    },
    topRight: {
      points: ['br', 'tc'],
      overflow: overflowOptions,
      offset: [horizontalArrowShift + arrowWidth, -4],
      targetOffset,
    },
    rightTop: {
      points: ['tl', 'cr'],
      overflow: overflowOptions,
      offset: [4, -(verticalArrowShift + arrowWidth)],
      targetOffset,
    },
    bottomRight: {
      points: ['tr', 'bc'],
      overflow: overflowOptions,
      offset: [horizontalArrowShift + arrowWidth, 4],
      targetOffset,
    },
    rightBottom: {
      points: ['bl', 'cr'],
      overflow: overflowOptions,
      offset: [4, verticalArrowShift + arrowWidth],
      targetOffset,
    },
    bottomLeft: {
      points: ['tl', 'bc'],
      overflow: overflowOptions,
      offset: [-(horizontalArrowShift + arrowWidth), 4],
      targetOffset,
    },
    leftBottom: {
      points: ['br', 'cl'],
      overflow: overflowOptions,
      offset: [-4, verticalArrowShift + arrowWidth],
      targetOffset,
    },
  };
}
