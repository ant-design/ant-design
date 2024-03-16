import * as React from 'react';
import type { FC } from 'react';
import { useContext } from 'react';
import { Badge, Carousel, Skeleton, Typography } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import classNames from 'classnames';

import useLocale from '../../../hooks/useLocale';
import SiteContext from '../../../theme/slots/SiteContext';
import type { Extra, Icon } from './util';
import { getCarouselStyle, useSiteData } from './util';

const useStyle = createStyles(({ token, css, cx }) => {
  const { carousel } = getCarouselStyle();

  const itemBase = css`
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
    box-sizing: border-box;
  `;

  return {
    itemBase,
    ribbon: css`
      & > .${cx(itemBase)} {
        height: 100%;
      }
    `,
    cardItem: css`
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
      min-height: 178px;
      > * {
        width: calc((100% - ${token.marginXXL * 2}px) / 3);
      }
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
const RecommendItem: React.FC<RecommendItemProps> = ({ extra, index, icons, className }) => {
  const token = useTheme();
  const { styles } = useStyle();

  if (!extra) {
    return <Skeleton key={index} />;
  }
  const icon = icons.find((i) => i.name === extra.source);

  const card = (
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

  if (index === 0) {
    return (
      <Badge.Ribbon text="HOT" color="red" rootClassName={styles.ribbon}>
        {card}
      </Badge.Ribbon>
    );
  }

  return card;
};

export const BannerRecommendsFallback: FC = () => {
  const { isMobile } = useContext(SiteContext);
  const { styles } = useStyle();

  const list = Array(3).fill(1);

  return isMobile ? (
    <Carousel className={styles.carousel}>
      {list.map((_, index) => (
        <div key={index} className={styles.itemBase}>
          <Skeleton active style={{ padding: '0 24px' }} />
        </div>
      ))}
    </Carousel>
  ) : (
    <div className={styles.container}>
      {list.map((_, index) => (
        <div key={index} className={styles.itemBase}>
          <Skeleton active />
        </div>
      ))}
    </div>
  );
};

const BannerRecommends: React.FC = () => {
  const { styles } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = React.useContext(SiteContext);
  const data = useSiteData();
  const extras = data?.extras?.[lang];
  const icons = data?.icons || [];
  const first3 = !extras || extras.length === 0 ? Array(3).fill(null) : extras.slice(0, 3);

  if (!data) {
    return <BannerRecommendsFallback />;
  }

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
};

export default BannerRecommends;
