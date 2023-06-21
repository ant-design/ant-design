import { css } from '@emotion/react';
import React, { useMemo } from 'react';
import useSiteToken from '../../../../hooks/useSiteToken';
import { COLOR_IMAGES, getClosetColor } from './colorUtil';

export interface BackgroundImageProps {
  colorPrimary?: string;
  isLight?: boolean;
}

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    image: css`
      transition: all ${token.motionDurationSlow};
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: right top;
    `,
  };
};

const BackgroundImage: React.FC<BackgroundImageProps> = ({ colorPrimary, isLight }) => {
  const activeColor = useMemo(() => getClosetColor(colorPrimary), [colorPrimary]);

  const { image } = useStyle();

  return (
    <>
      {COLOR_IMAGES.filter(({ url }) => url).map(({ color, url }) => (
        <img
          css={image}
          style={{ opacity: isLight && activeColor === color ? 1 : 0 }}
          key={color}
          src={url}
          alt=""
        />
      ))}
    </>
  );
};

export default BackgroundImage;
