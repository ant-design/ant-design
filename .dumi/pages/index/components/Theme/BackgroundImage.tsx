import { createStyles, css } from 'antd-style';
import React, { useMemo } from 'react';
import { COLOR_IMAGES, getClosetColor } from './colorUtil';

export interface BackgroundImageProps {
  colorPrimary?: string;
  isLight?: boolean;
}

const useStyle = createStyles(({ token }) => ({
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
}));

const BackgroundImage: React.FC<BackgroundImageProps> = ({ colorPrimary, isLight }) => {
  const activeColor = useMemo(() => getClosetColor(colorPrimary), [colorPrimary]);

  const { styles } = useStyle();

  return (
    <>
      {COLOR_IMAGES.filter(({ url }) => url).map(({ color, url }) => (
        <img
          className={styles.image}
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
