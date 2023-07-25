import { createStyles, css } from 'antd-style';
import React, { useMemo, useState } from 'react';
import { CSSMotionList } from 'rc-motion';
import { COLOR_IMAGES, getClosetColor } from './colorUtil';
import classNames from 'classnames';

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

const onShow = () => ({
  opacity: 1,
});
const onHide = () => ({
  opacity: 0,
});

const BackgroundImage: React.FC<BackgroundImageProps> = ({ colorPrimary, isLight }) => {
  const activeColor = useMemo(() => getClosetColor(colorPrimary), [colorPrimary]);
  const { styles } = useStyle();

  const [keyList, setKeyList] = useState<string[]>([]);

  React.useLayoutEffect(() => {
    setKeyList([activeColor]);
  }, [activeColor]);

  return (
    <CSSMotionList
      keys={keyList}
      motionName="transition"
      onEnterStart={onHide}
      onAppearStart={onHide}
      onEnterActive={onShow}
      onAppearActive={onShow}
      onLeaveStart={onShow}
      onLeaveActive={onHide}
      motionDeadline={500}
    >
      {({ key, className, style }) => {
        const cls = classNames(styles.image, className);
        const entity = COLOR_IMAGES.find(({ color }) => color === key);

        if (!entity || !entity.url) {
          return null;
        }

        return (
          <picture>
            <source srcSet={entity.webp} type="image/webp" />
            <source srcSet={entity.url} type="image/jpeg" />
            <img className={cls} style={style} src={entity.url} alt="" />
          </picture>
        );
      }}
    </CSSMotionList>
  );
};

export default BackgroundImage;
