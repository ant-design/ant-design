import React from 'react';

export type BorderInfo = {
  borderWidth: string;
  borderRadius: string;
};

const DEFAULT_BORDER_INFO: BorderInfo = {
  borderWidth: '0px',
  borderRadius: '0px',
};

const splitCssValue = (value: string) => {
  const segments: string[] = [];
  let depth = 0;
  let start = 0;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (char === '(') {
      depth += 1;
    } else if (char === ')') {
      depth -= 1;
    } else if (depth === 0 && /\s/.test(char)) {
      const segment = value.slice(start, index).trim();

      if (segment) {
        segments.push(segment);
      }

      start = index + 1;
    }
  }

  const lastSegment = value.slice(start).trim();

  if (lastSegment) {
    segments.push(lastSegment);
  }

  return segments;
};

type BoxValues = [string, string, string, string];

const toCssShorthand = (values: BoxValues) => {
  const [top, right, bottom, left] = values;

  if (top === right && top === bottom && top === left) {
    return top;
  }

  if (top === bottom && right === left) {
    return `${top} ${right}`;
  }

  if (right === left) {
    return `${top} ${right} ${bottom}`;
  }

  return values.join(' ');
};

const splitCornerRadius = (value: string): [string, string] => {
  const [horizontal = '0px', vertical = horizontal] = splitCssValue(value);

  return [horizontal, vertical];
};

const getBorderWidth = (...values: string[]) =>
  values.map((value) => `calc(-1 * ${value || '0px'})`).join(' ');

const getBorderRadius = (
  borderRadius: string,
  borderTopLeftRadius: string,
  borderTopRightRadius: string,
  borderBottomRightRadius: string,
  borderBottomLeftRadius: string,
) =>
  borderRadius ||
  (() => {
    const corners = [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ].map(splitCornerRadius);
    const horizontalRadius = toCssShorthand(corners.map(([horizontal]) => horizontal) as BoxValues);
    const verticalRadius = toCssShorthand(corners.map(([, vertical]) => vertical) as BoxValues);

    return horizontalRadius === verticalRadius
      ? horizontalRadius
      : `${horizontalRadius} / ${verticalRadius}`;
  })();

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
      borderRadius,
    } = getComputedStyle(domNode);

    setBorderInfo({
      borderWidth: getBorderWidth(
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
      ),
      borderRadius: getBorderRadius(
        borderRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
      ),
    });
  }, [domNode]);

  return borderInfo;
};

export default useBorderSize;
