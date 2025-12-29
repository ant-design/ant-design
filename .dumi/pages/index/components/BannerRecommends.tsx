import React from 'react';
import { Alert, Badge, Carousel, Flex, Skeleton, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { clsx } from 'clsx';

import useLocale from '../../../hooks/useLocale';
import SiteContext from '../../../theme/slots/SiteContext';
import type { Extra, Icon } from './util';
import { getCarouselStyle, useAntdSiteConfig } from './util';

const useStyle = createStyles(({ cssVar, css, cx }) => {
  const { carousel } = getCarouselStyle();

  const itemBase = css`
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    align-items: stretch;
    text-decoration: none;
    background: ${cssVar.colorBgContainer};
    border: ${cssVar.lineWidth} solid ${cssVar.colorBorderSecondary};
    border-radius: ${cssVar.borderRadiusLG};
    transition: all ${cssVar.motionDurationSlow};
    padding-block: ${cssVar.paddingMD};
    padding-inline: ${cssVar.paddingLG};
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
        box-shadow: ${cssVar.boxShadowCard};
        border-color: transparent;
      }
    `,
    sliderItem: css`
      margin: 0 ${cssVar.margin};
      text-align: start;
    `,
    container: css`
      display: flex;
      width: 100%;
      max-width: 100%;
      margin-inline: auto;
      box-sizing: border-box;
      column-gap: ${cssVar.paddingMD};
      padding: 0 ${cssVar.padding};
      align-items: stretch;
      text-align: start;
      min-height: 178px;
      > * {
        width: calc((100% - calc(${cssVar.marginXXL} * 2)) / 3);
      }
    `,
    carousel,
    bannerBg: css`
      height: ${cssVar.fontSize};
    `,
  };
});

interface RecommendItemProps {
  extra: Extra;
  index: number;
  icons?: Icon[];
  className?: string;
}

const RecommendItem: React.FC<RecommendItemProps> = (props) => {
  const { extra, index, icons, className } = props;

  const { styles } = useStyle();

  if (!extra) {
    return <Skeleton key={index} />;
  }

  const icon = icons?.find((i) => i.name === extra.source);

  const card = (
    <a
      key={extra?.title}
      href={extra.href}
      target="_blank"
      className={clsx(styles.itemBase, className)}
      rel="noreferrer"
    >
      <Typography.Title level={5}>{extra?.title}</Typography.Title>
      <Typography.Paragraph type="secondary" style={{ flex: 'auto' }}>
        {extra.description}
      </Typography.Paragraph>
      <Flex justify="space-between" align="center">
        <Typography.Text>{extra.date}</Typography.Text>
        {icon?.href && (
          <img src={icon.href} draggable={false} className={styles.bannerBg} alt="banner" />
        )}
      </Flex>
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

export const BannerRecommendsFallback: React.FC = () => {
  const { isMobile } = React.use(SiteContext);

  const { styles } = useStyle();

  const list = Array.from({ length: 3 });

  return isMobile ? (
    <Carousel className={styles.carousel}>
      {list.map((_, index) => (
        <div key={`mobile-${index}`} className={styles.itemBase}>
          <Skeleton active style={{ padding: '0 24px' }} />
        </div>
      ))}
    </Carousel>
  ) : (
    <div className={styles.container}>
      {list.map((_, index) => (
        <div key={`desktop-${index}`} className={styles.itemBase}>
          <Skeleton active />
        </div>
      ))}
    </div>
  );
};

const BannerRecommends: React.FC = () => {
  const { styles } = useStyle();
  const [, lang] = useLocale();
  const { isMobile } = React.use(SiteContext);
  const { data, error, isLoading } = useAntdSiteConfig();

  if (isLoading) {
    return <BannerRecommendsFallback />;
  }

  if (error) {
    return (
      <Alert
        showIcon
        type="error"
        title={error.message}
        description={process.env.NODE_ENV !== 'production' ? error.stack : undefined}
      />
    );
  }

  const extras = data?.extras?.[lang];

  const mergedExtras =
    !extras || !extras.length ? Array.from<Extra>({ length: 3 }) : extras.slice(0, 3);

  if (isMobile) {
    return (
      <Carousel className={styles.carousel}>
        {mergedExtras.map((extra, index) => (
          <div key={`mobile-${index}`}>
            <RecommendItem
              extra={extra}
              index={index}
              icons={data?.icons}
              className={styles.sliderItem}
            />
          </div>
        ))}
      </Carousel>
    );
  }

  return (
    <div className={styles.container}>
      {mergedExtras.map((extra, index) => (
        <RecommendItem
          key={`desktop-${index}`}
          extra={extra}
          index={index}
          icons={data?.icons}
          className={styles.cardItem}
        />
      ))}
    </div>
  );
};

export default BannerRecommends;
