// TODO: Consider generalizing image component mechanics of AI2Logo See:
// https://github.com/allenai/varnish/pull/210#issuecomment-552137573

import * as React from 'react';
import styled from 'styled-components';

import logoFullColor from './logo-ai2-fullColor.svg';
import logoFullColorWithText from './logo-ai2-fullColor-withText.svg';
import logoFullColorWithTextMicro from './logo-ai2-fullColor-withText-micro.svg';
import logoWhite from './logo-ai2-white.svg';
import logoWhiteWithText from './logo-ai2-white-withText.svg';
import logoWhiteWithTextMicro from './logo-ai2-white-withText-micro.svg';

type ColorVariants = 'default' | 'white';
type LogoSize = 'micro' | 'default' | 'lg';
type Dimensions = {
  width: number;
  height: number;
};

export interface IconProps {
  color?: ColorVariants;
  includeText?: boolean;
  size?: LogoSize | number;
  className?: string;
}

const dimsByLogoSize = {
  micro: {
    width: 177,
    height: 16,
  },
  default: {
    width: 264,
    height: 30,
  },
  lg: {
    width: 326,
    height: 37,
  },
};

const noTextDimsByLogoSize = {
  micro: {
    width: 34,
    height: dimsByLogoSize.micro.height,
  },
  default: {
    width: 64,
    height: dimsByLogoSize.default.height,
  },
  lg: {
    width: 78,
    height: dimsByLogoSize.lg.height,
  },
};

function getDimensionsFromHeight(height: number, includeText: boolean = true) {
  const byLogoSize = includeText ? dimsByLogoSize : noTextDimsByLogoSize;
  // Extrapolate custom size aspect ratio based on default size
  const dims = byLogoSize.default;
  const aspectRatio = dims.width / dims.height;
  return { width: aspectRatio * height, height };
}

function getImageDimensions(size: LogoSize | number, includeText: boolean = true): Dimensions {
  if (typeof size === 'number') {
    // Used for custom size
    return getDimensionsFromHeight(size, includeText);
  }

  // Used in conjunction with predetermined size
  const byLogoSize = includeText ? dimsByLogoSize : noTextDimsByLogoSize;
  return byLogoSize[size];
}

function getImageSrc(size: LogoSize | number, color: ColorVariants, includeText: boolean): string {
  if (includeText) {
    if (color === 'white') {
      return size === 'micro' ? logoWhiteWithTextMicro : logoWhiteWithText;
    }
    return size === 'micro' ? logoFullColorWithTextMicro : logoFullColorWithText;
  }
  return color === 'white' ? logoWhite : logoFullColor;
}

// TODO (@codeviking): Move AI2Logo to `components/ai2`.
// eslint-disable-next-line import/prefer-default-export
export const AI2Logo = ({
  color = 'default',
  size = 'default',
  includeText = true,
  className,
}: IconProps) => {
  const { width, height } = getImageDimensions(size, includeText);
  return (
    <VectorImage
      src={getImageSrc(size, color, includeText)}
      className={className}
      width={width}
      height={height}
      alt="Allen Institute for AI"
    />
  );
};

const VectorImage = styled.img`
  display: block;
  max-width: 100%;
`;
