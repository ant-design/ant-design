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
              transition: `all ${token.motionDurationSlow}`,
              opacity: isLight && activeColor === color ? 1 : 0,
              objectFit: 'cover',
              objectPosition: 'right top',
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: '100%',
            }}
            src={url}
          />
        );
      })}
    </>
  );
}
