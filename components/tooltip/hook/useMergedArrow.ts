import React from 'react';

import { AbstractTooltipProps } from '..';
import { TooltipConfig } from '../../config-provider/context';

const useMergedArrow = (
  providedArrow?: AbstractTooltipProps['arrow'],
  providedContextArrow?: TooltipConfig['arrow'],
) => {
  return React.useMemo(() => {
    if (typeof providedArrow === 'object') {
      return {
        ...providedArrow,
        pointAtCenter:
          providedArrow.pointAtCenter ??
          (providedContextArrow as { pointAtCenter: boolean })?.pointAtCenter,
      };
    }

    return providedArrow ?? providedContextArrow ?? true;
  }, [providedArrow, providedContextArrow]);
};

export default useMergedArrow;
