import * as React from 'react';
import { TinyColor } from '@ctrl/tinycolor';
import useSiteToken from '../../../../hooks/useSiteToken';

const DISTANCE = 33;

const images: { url: string; color: string }[] = [
  {
    color: '#00B96B',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*jEIGQICe7aEAAAAAAAAAAAAAARQnAQ',
  },
  {
    color: '#FB7299',
    url: 'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*2g4oTp4jmzIAAAAAAAAAAAAAARQnAQ',
  },
];

export interface BackgroundImageProps {
  colorPrimary?: string;
}

export default function BackgroundImage({ colorPrimary }: BackgroundImageProps) {
  const { token } = useSiteToken();

  const activeColor = React.useMemo(() => {
    const colorPrimaryRGB = new TinyColor(colorPrimary).toRgb();

    const distance = images.map(({ color }) => {
      const colorObj = new TinyColor(color).toRgb();
      const dist = Math.sqrt(
        Math.pow(colorObj.r - colorPrimaryRGB.r, 2) +
          Math.pow(colorObj.g - colorPrimaryRGB.g, 2) +
          Math.pow(colorObj.b - colorPrimaryRGB.b, 2),
      );

      return { color, dist };
    });

    const firstMatch = distance.sort((a, b) => a.dist - b.dist)[0];

    return firstMatch.dist <= DISTANCE ? firstMatch.color : null;
  }, [colorPrimary]);

  console.log('>>>', activeColor, images);

  return (
    <>
      <span>Bamboo</span>
      {images.map(({ color, url }) => {
        return (
          <img
            key={color}
            style={{
              transition: `all ${token.motionDurationSlow}`,
              opacity: activeColor === color ? 1 : 0,
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
