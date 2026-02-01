import React from 'react';
import raf from '@rc-component/util/lib/raf';
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
    background: color-mix(in srgb, ${cssVar.colorBgContainer} 30%, transparent);
    backdrop-filter: blur(8px);
    border: ${cssVar.lineWidth} solid ${cssVar.colorBorderSecondary};
    border-radius: ${cssVar.borderRadiusLG};
    transition: all ${cssVar.motionDurationSlow};
    padding-block: ${cssVar.paddingMD};
    padding-inline: ${cssVar.paddingLG};
    box-sizing: border-box;
    position: relative;
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
    &:before {
      content: '';
      inset: calc(${cssVar.lineWidth} * -1);
      position: absolute;

      background: radial-gradient(
        circle 150px at var(--mouse-x, 0) var(--mouse-y, 0),
        ${cssVar.colorPrimaryBorderHover},
        ${cssVar.colorBorderSecondary}
      );
      opacity: 0;
      transition: all 0.3s ease;
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
      mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);

      mask-composite: subtract;
      -webkit-mask-composite: xor;
      padding: 1px;
      border-radius: inherit;
    }

    &:hover {
      backdrop-filter: blur(0px);
      background: color-mix(in srgb, ${cssVar.colorBgContainer} 90%, transparent);

      &:before {
        opacity: 1;
      }
    }
  `;

  return {
    itemBase,
    ribbon: css`
      & > .${cx(itemBase)} {
        height: 100%;
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
      column-gap: calc(${cssVar.paddingMD} * 2);
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

// ======================================================================
// ==                               Item                               ==
// ======================================================================
interface RecommendItemProps {
  extra: Extra;
  index: number;
  icons?: Icon[];
  className?: string;
}

const RecommendItem: React.FC<RecommendItemProps> = (props) => {
  const { extra, index, icons, className } = props;
  const cardRef = React.useRef<HTMLAnchorElement>(null);

  const { styles } = useStyle();

  // ====================== MousePos ======================
  const [mousePosition, setMousePosition] = React.useState<[number, number]>([0, 0]);
  const [transMousePosition, setTransMousePosition] = React.useState<[number, number]>([0, 0]);

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition([x, y]);
  };

  // Transition mouse position
  React.useEffect(() => {
    const [targetX, targetY] = mousePosition;
    const [currentX, currentY] = transMousePosition;

    if (Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5) {
      return;
    }

    const rafId = raf(() => {
      setTransMousePosition((ori) => {
        const [curX, curY] = ori;
        const deltaX = (targetX - curX) * 0.1;
        const deltaY = (targetY - curY) * 0.1;

        return [curX + deltaX, curY + deltaY];
      });
    });

    return () => raf.cancel(rafId);
  }, [mousePosition, transMousePosition]);

  // ======================= Render =======================
  if (!extra) {
    return <Skeleton key={index} />;
  }

  const icon = icons?.find((i) => i.name === extra.source);

  const card = (
    <a
      ref={cardRef}
      key={extra?.title}
      href={extra.href}
      target="_blank"
      className={clsx(styles.itemBase, className)}
      style={
        {
          '--mouse-x': `${transMousePosition[0]}px`,
          '--mouse-y': `${transMousePosition[1]}px`,
        } as React.CSSProperties
      }
      rel="noreferrer"
      onMouseMove={onMouseMove}
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

// ======================================================================
// ==                             Fallback                             ==
// ======================================================================
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

// ======================================================================
// ==                            Recommends                            ==
// ======================================================================
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
        <RecommendItem key={`desktop-${index}`} extra={extra} index={index} icons={data?.icons} />
      ))}
    </div>
  );
};

export default BannerRecommends;
