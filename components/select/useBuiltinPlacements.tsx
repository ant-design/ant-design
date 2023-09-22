import type { AlignType, BuildInPlacements } from '@rc-component/trigger';

import type { PopupOverflow } from '../config-provider/context';

const getBuiltInPlacements = (popupOverflow?: PopupOverflow): Record<string, AlignType> => {
  const htmlRegion: AlignType['htmlRegion'] = popupOverflow === 'scroll' ? 'scroll' : 'visible';

  const sharedConfig: AlignType = {
    overflow: {
      adjustX: true,
      adjustY: true,
      shiftY: true,
    },
    htmlRegion,
    dynamicInset: true,
  };

  return {
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
};

export default function useBuiltinPlacements(
  buildInPlacements?: BuildInPlacements,
  popupOverflow?: PopupOverflow,
) {
  return buildInPlacements || getBuiltInPlacements(popupOverflow);
}
