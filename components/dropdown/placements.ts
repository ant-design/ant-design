import { BuildInPlacements } from 'rc-trigger';
import { PlacementsConfig } from '../tooltip/placements';

const targetOffset = [0, 0];

const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

export default function getPlacements(config: PlacementsConfig) {
  const { arrowWidth = 4, horizontalArrowShift = 16, arrowPointAtCenter } = config;
  const placementMap: BuildInPlacements = {
    topLeft: {
      points: ['bl', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [0, -4],
      targetOffset,
    },
    topCenter: {
      points: ['bc', 'tc'],
      overflow: autoAdjustOverflow,
      offset: [0, -4],
      targetOffset,
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [0, -4],
      targetOffset,
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [0, 4],
      targetOffset,
    },
    bottomCenter: {
      points: ['tc', 'bc'],
      overflow: autoAdjustOverflow,
      offset: [0, 4],
      targetOffset,
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: autoAdjustOverflow,
      offset: [0, 4],
      targetOffset,
    },
  };
  Object.entries(placementMap).forEach(([key, placement]) => {
    if (arrowPointAtCenter && placement.offset && placement.points) {
      if (key.includes('Left')) {
        placement.offset[0] = -(horizontalArrowShift + arrowWidth);
      } else if (key.includes('Right')) {
        placement.offset[0] = horizontalArrowShift + arrowWidth;
      }

      if (key.includes('top')) {
        placement.points[1] = 'tc';
      } else if (key.includes('bottom')) {
        placement.points[1] = 'bc';
      }
    }
  });
  return placementMap;
}
