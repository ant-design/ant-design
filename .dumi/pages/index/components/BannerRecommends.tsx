import * as React from 'react';
import { createStyles, css, useTheme } from 'antd-style';
import classNames from 'classnames';
import type { FC } from 'react';
import { useContext } from 'react';
import { Typography, Skeleton, Carousel } from 'antd';
import type { Extra, Icon } from './util';
import SiteContext from '../../../theme/slots/SiteContext';
import { getCarouselStyle, useSiteData } from './util';
import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ token }) => {
  const { carousel } = getCarouselStyle();

  return {
    itemBase: css`
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      align-items: stretch;
      text-decoration: none;
      background: ${token.colorBgContainer};
      border: ${token.lineWidth}px solid ${token.colorBorderSecondary};
      border-radius: ${token.borderRadiusLG}px;
      transition: all ${token.motionDurationSlow};
      padding-block: ${token.paddingMD}px;
      padding-inline: ${token.paddingLG}px;
    `,
    cardItem: css`
      width: 33%;
      &:hover {
        box-shadow: ${token.boxShadowCard};
      }
    `,
    sliderItem: css`
      margin: 0 ${token.margin}px;
      text-align: start;
    `,
    container: css`
      display: flex;
      max-width: 1208px;
      margin-inline: auto;
      box-sizing: border-box;
      padding-inline: ${token.marginXXL}px;
      column-gap: ${token.paddingMD * 2}px;
      align-items: stretch;
      text-align: start;
    `,
    carousel,
  };
});

interface RecommendItemProps {
  extra: Extra;
  index: number;
  icons: Icon[];
  className?: string;
}
const RecommendItem = ({ extra, index, icons, className }: RecommendItemProps) => {
  const token = useTheme();
  const { styles } = useStyle();

  if (!extra) {
    return <Skeleton key={index} />;
  }
  const icon = icons.find((i) => i.name === extra.source);

  return (
    <a
      key={extra?.title}
      href={extra.href}
      target="_blank"
      className={classNames(styles.itemBase, className)}
      rel="noreferrer"
    >
      <Typography.Title level={5}>{extra?.title}</Typography.Title>
      <Typography.Paragraph type="secondary" style={{ flex: 'auto' }}>
        {extra.description}
      </Typography.Paragraph>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Text>{extra.date}</Typography.Text>
        {icon && <img src={icon.href} style={{ height: token.fontSize }} alt="banner" />}
      </div>
    </a>
  );
};

export const BannerRecommendsFallback: FC = () => {
  const { isMobile } = useContext(SiteContext);
  const { styles } = useStyle();

  const list = Array(3).fill(1);

  return isMobile ? (
    <Carousel className={styles.carousel}>
      {list.map((extra, index) => (
        <div key={index}>
          <Skeleton active style={{ padding: '0 24px' }} />
        </div>
      ))}
    </Carousel>
  ) : (
    <div className={styles.container}>
      {list.map((_, index) => (
        <Skeleton key={index} active />
      ))}
    </div>
  );
};

export default function BannerRecommends() {
  const { styles } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = React.useContext(SiteContext);
  const data = useSiteData();
  const extras = data?.extras?.[lang];
  const icons = data?.icons;
  const first3 = extras.length === 0 ? Array(3).fill(null) : extras.slice(0, 3);

  return (
    <div>
      {isMobile ? (
        <Carousel className={styles.carousel}>
          {first3.map((extra, index) => (
            <div key={index}>
              <RecommendItem
                extra={extra}
                index={index}
                icons={icons}
                className={styles.sliderItem}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className={styles.container}>
          {first3.map((extra, index) => (
            <RecommendItem
              extra={extra}
              index={index}
              icons={icons}
              className={styles.cardItem}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
