import type { AlignType, BuildInPlacements } from '@rc-component/trigger';

import type { AdjustOverflow } from '../_util/placements';
import { getMergedOverflow } from '../_util/placements';
import type { PopupOverflow } from '../config-provider/context';

interface MergedPlacementsConfig {
  builtinPlacements?: BuildInPlacements;
  popupOverflow?: PopupOverflow;
  autoAdjustOverflow?: boolean | AdjustOverflow;
}

const getBuiltInPlacements = ({
  popupOverflow,
  autoAdjustOverflow,
}: MergedPlacementsConfig): Record<string, AlignType> => {
  const htmlRegion: AlignType['htmlRegion'] = popupOverflow === 'scroll' ? 'scroll' : 'visible';

  const sharedConfig: AlignType = {
    overflow: getMergedOverflow(
      {
        adjustX: true,
        adjustY: true,
        shiftY: true,
      },
      autoAdjustOverflow,
    ),
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

function mergedBuiltinPlacements(config: MergedPlacementsConfig) {
  return config.builtinPlacements || getBuiltInPlacements(config);
}

export default mergedBuiltinPlacements;
