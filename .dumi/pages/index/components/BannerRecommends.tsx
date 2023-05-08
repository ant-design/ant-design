import * as React from 'react';
import { Typography, Skeleton, Carousel } from 'antd';
import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Extra, Icon } from './util';
import useSiteToken from '../../../hooks/useSiteToken';
import SiteContext from '../../../theme/slots/SiteContext';
import { useCarouselStyle } from './util';

const useStyle = () => {
  const { token } = useSiteToken();
  const { carousel } = useCarouselStyle();

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
};

interface RecommendItemProps {
  extra: Extra;
  index: number;
  icons: Icon[];
  itemCss: SerializedStyles;
}
const RecommendItem = ({ extra, index, icons, itemCss }: RecommendItemProps) => {
  const style = useStyle();
  const { token } = useSiteToken();

  if (!extra) {
    return <Skeleton key={index} />;
  }
  const icon = icons.find((i) => i.name === extra.source);

  return (
    <a
      key={extra?.title}
      href={extra.href}
      target="_blank"
      css={[style.itemBase, itemCss]}
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

export interface BannerRecommendsProps {
  extras?: Extra[];
  icons?: Icon[];
}

export default function BannerRecommends({ extras = [], icons = [] }: BannerRecommendsProps) {
  const styles = useStyle();
  const { isMobile } = React.useContext(SiteContext);
  const first3 = extras.length === 0 ? Array(3).fill(null) : extras.slice(0, 3);

  return (
    <div>
      {isMobile ? (
        <Carousel css={styles.carousel}>
          {first3.map((extra, index) => (
            <div key={index}>
              <RecommendItem
                extra={extra}
                index={index}
                icons={icons}
                itemCss={styles.sliderItem}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div css={styles.container}>
          {first3.map((extra, index) => (
            <RecommendItem
              extra={extra}
              index={index}
              icons={icons}
              itemCss={styles.cardItem}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
