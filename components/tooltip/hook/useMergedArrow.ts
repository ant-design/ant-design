import React from 'react';

import { AbstractTooltipProps } from '..';
import { TooltipConfig } from '../../config-provider/context';

interface MergedArrow {
  show?: boolean;
  pointAtCenter?: boolean;
}
const useMergedArrow = (
  providedArrow?: AbstractTooltipProps['arrow'],
  providedContextArrow?: TooltipConfig['arrow'],
): MergedArrow => {
  const toConfig = (arrow?: boolean | AbstractTooltipProps['arrow']) =>
    typeof arrow === 'boolean' ? { show: arrow } : arrow || {};

  return React.useMemo(() => {
    const arrowConfig: MergedArrow = toConfig(providedArrow);
    const contextArrowConfig: MergedArrow = toConfig(providedContextArrow);

    return {
      ...contextArrowConfig,
      ...arrowConfig,
      show: arrowConfig.show ?? contextArrowConfig.show ?? true,
    };
  }, [providedArrow, providedContextArrow]);
};
export default useMergedArrow;
