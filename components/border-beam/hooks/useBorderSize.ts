import React from 'react';

export type BorderWidth = readonly [number, number, number, number];

export type BorderInfo = {
  borderWidth: BorderWidth;
  borderRadius: string;
};

const DEFAULT_BORDER_INFO: BorderInfo = {
  borderWidth: [0, 0, 0, 0],
  borderRadius: '0px',
};

const parseBorderWidth = (value: string) => {
  const size = Number.parseFloat(value);

  return Number.isFinite(size) ? size : 0;
};

const useBorderSize = (domNode: Element | null) => {
  const [borderInfo, setBorderInfo] = React.useState<BorderInfo>(DEFAULT_BORDER_INFO);

  React.useEffect(() => {
    if (!domNode) {
      setBorderInfo(DEFAULT_BORDER_INFO);
      return;
    }

    const { borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth, borderRadius } =
      getComputedStyle(domNode);

    setBorderInfo({
      borderWidth: [
        parseBorderWidth(borderTopWidth),
        parseBorderWidth(borderRightWidth),
        parseBorderWidth(borderBottomWidth),
        parseBorderWidth(borderLeftWidth),
      ],
      borderRadius,
    });
  }, [domNode]);

  return borderInfo;
};

export default useBorderSize;
