import type { AlignType, BuildInPlacements } from '@rc-component/trigger';

const sharedConfig = {
  overflow: {
    adjustX: true,
    adjustY: true,
    shiftY: true,
  },
  htmlRegion: 'visible' as const,
};

const defaultBuiltInPlacements: Record<string, AlignType> = {
  bottomLeft: {
    ...sharedConfig,
    points: ['tl', 'bl'],
    offset: [0, 4],
  },
  bottomRight: {
    ...sharedConfig,
    points: ['tr', 'br'],
    offset: [0, 4],
  },
  topLeft: {
    ...sharedConfig,
    points: ['bl', 'tl'],
    offset: [0, -4],
  },
  topRight: {
    ...sharedConfig,
    points: ['br', 'tr'],
    offset: [0, -4],
  },
};

export default function useBuiltinPlacements(buildInPlacements?: BuildInPlacements) {
  return buildInPlacements || defaultBuiltInPlacements;
}
