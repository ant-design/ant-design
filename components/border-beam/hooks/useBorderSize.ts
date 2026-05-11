import React from 'react';

export type BorderSize = readonly [number, number, number, number];
export type BorderRadius = BorderSize;

export type BorderInfo = {
  borderSize: BorderSize;
  borderRadius: BorderRadius;
};

const DEFAULT_BORDER_INFO: BorderInfo = {
  borderSize: [0, 0, 0, 0],
  borderRadius: [0, 0, 0, 0],
};

const parseBorderValue = (value: string) => {
  const size = Number.parseFloat(value);

  return Number.isFinite(size) ? size : 0;
};

const useBorderSize = (domNode: Element | null): BorderInfo => {
  const [borderInfo, setBorderInfo] = React.useState<BorderInfo>(DEFAULT_BORDER_INFO);

  React.useEffect(() => {
    if (!domNode) {
      setBorderInfo(DEFAULT_BORDER_INFO);
      return;
    }

    const {
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    } = getComputedStyle(domNode);
    const nextBorderSize: BorderSize = [
      parseBorderValue(borderTopWidth),
      parseBorderValue(borderRightWidth),
      parseBorderValue(borderBottomWidth),
      parseBorderValue(borderLeftWidth),
    ];
    const nextBorderRadius: BorderRadius = [
      parseBorderValue(borderTopLeftRadius),
      parseBorderValue(borderTopRightRadius),
      parseBorderValue(borderBottomRightRadius),
      parseBorderValue(borderBottomLeftRadius),
    ];

    setBorderInfo({
      borderSize: nextBorderSize,
      borderRadius: nextBorderRadius,
    });
  }, [domNode]);

  return borderInfo;
};

export default useBorderSize;
