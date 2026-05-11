import React from 'react';

export type BorderSize = readonly [number, number, number, number];
export type BorderRadius = readonly [string, string, string, string];

export type BorderInfo = {
  borderSize: BorderSize;
  borderRadius: BorderRadius;
};

const DEFAULT_BORDER_SIZE: BorderSize = [0, 0, 0, 0];
const DEFAULT_BORDER_RADIUS: BorderRadius = ['0px', '0px', '0px', '0px'];
const DEFAULT_BORDER_INFO: BorderInfo = {
  borderSize: DEFAULT_BORDER_SIZE,
  borderRadius: DEFAULT_BORDER_RADIUS,
};

const parseBorderWidth = (value: string) => {
  const size = Number.parseFloat(value);

  return Number.isFinite(size) ? size : 0;
};

const parseBorderRadius = (value: string) => value || '0px';

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
      parseBorderWidth(borderTopWidth),
      parseBorderWidth(borderRightWidth),
      parseBorderWidth(borderBottomWidth),
      parseBorderWidth(borderLeftWidth),
    ];
    const nextBorderRadius: BorderRadius = [
      parseBorderRadius(borderTopLeftRadius),
      parseBorderRadius(borderTopRightRadius),
      parseBorderRadius(borderBottomRightRadius),
      parseBorderRadius(borderBottomLeftRadius),
    ];

    setBorderInfo({
      borderSize: nextBorderSize,
      borderRadius: nextBorderRadius,
    });
  }, [domNode]);

  return borderInfo;
};

export default useBorderSize;
