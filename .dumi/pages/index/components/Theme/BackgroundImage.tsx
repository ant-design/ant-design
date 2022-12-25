import * as React from 'react';
import useSiteToken from '../../../../hooks/useSiteToken';
import { COLOR_IMAGES, getClosetColor } from './colorUtil';

export interface BackgroundImageProps {
  colorPrimary?: string;
  isLight?: boolean;
}

export default function BackgroundImage({ colorPrimary, isLight }: BackgroundImageProps) {
  const { token } = useSiteToken();

  const activeColor = React.useMemo(() => getClosetColor(colorPrimary), [colorPrimary]);

  const sharedStyle: React.CSSProperties = {
    transition: `all ${token.motionDurationSlow}`,
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  };

  return (
    <>
      {COLOR_IMAGES.map(({ color, url }) => {
        if (!url) {
          return null;
        }

        return (
          <img
            key={color}
            style={{
              ...sharedStyle,
              opacity: isLight && activeColor === color ? 1 : 0,
              objectFit: 'cover',
              objectPosition: 'right top',
            }}
            src={url}
            alt=""
          />
        );
      })}

      {/* <div
        style={{
          ...sharedStyle,
          opacity: isLight || !activeColor || activeColor === DEFAULT_COLOR ? 0 : 1,
          background: 'rgba(0,0,0,0.79)',
        }}
      /> */}
    </>
  );
}
