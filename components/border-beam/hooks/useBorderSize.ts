import React from 'react';

import { isNumber } from '../../_util/is';
import { isSameBorderWidth } from '../util';
import type { BorderWidth } from '../util';

const parseBorderWidth = (value: string) => {
  return isNumber(value) ? Number.parseFloat(value) : 0;
};

const useBorderSize = (domNode: Element | null) => {
  const [borderWidth, setBorderWidth] = React.useState<BorderWidth>([0, 0, 0, 0]);

  React.useEffect(() => {
    if (!domNode) {
      return;
    }

    const { borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth } =
      getComputedStyle(domNode);

    const nextBorderWidth: BorderWidth = [
      parseBorderWidth(borderTopWidth),
      parseBorderWidth(borderRightWidth),
      parseBorderWidth(borderBottomWidth),
      parseBorderWidth(borderLeftWidth),
    ];

    setBorderWidth((prev) => {
      if (isSameBorderWidth(prev, nextBorderWidth)) {
        return prev;
      } else {
        return nextBorderWidth;
      }
    });
  }, [domNode]);

  return borderWidth;
};

export default useBorderSize;
