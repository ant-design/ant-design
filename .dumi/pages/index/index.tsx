import React, { Suspense } from 'react';
import { ConfigProvider, theme } from 'antd';
import { createStyles, css } from 'antd-style';

import useDark from '../../hooks/useDark';
import useLocale from '../../hooks/useLocale';
// import BannerRecommends, { BannerRecommendsFallback } from './components/BannerRecommends';
import PreviewBanner from './components/PreviewBanner';
import Group from './components/Group';

const ComponentsList = React.lazy(() => import('./components/ComponentsList'));
const DesignFramework = React.lazy(() => import('./components/DesignFramework'));
const Theme = React.lazy(() => import('./components/Theme'));

const useStyle = createStyles(() => ({
  image: css`
    position: absolute;
    left: 0;
    top: -50px;
    height: 160px;
  `,
}));

const locales = {
  cn: {
    assetsTitle: '组件丰富，选用自如',
    assetsDesc: '大量实用组件满足你的需求，灵活定制与拓展',
    designTitle: '设计语言与研发框架',
    designDesc: '配套生态，让你快速搭建网站应用',
  },
  en: {
    assetsTitle: 'Rich components',
    assetsDesc: 'Practical components to meet your needs, flexible customization and expansion',
    designTitle: 'Design and framework',
    designDesc: 'Supporting ecology, allowing you to quickly build website applications',
  },
};

const Homepage: React.FC = () => {
  const [locale] = useLocale(locales);
  const { styles } = useStyle();
  const { token } = theme.useToken();

  const isRootDark = useDark();

  return (
    <section>
      <PreviewBanner>
        {/* 文档很久没更新了，先藏起来 */}
        {/* <Suspense fallback={<BannerRecommendsFallback />}>
          <BannerRecommends />
        </Suspense> */}
      </PreviewBanner>

      <div>
        {/* 定制主题 */}
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <Suspense fallback={null}>
            <Theme />
          </Suspense>
        </ConfigProvider>

        {/* 组件列表 */}
        <Group
          background={token.colorBgElevated}
          collapse
          title={locale.assetsTitle}
          description={locale.assetsDesc}
          id="design"
        >
          <Suspense fallback={null}>
            <ComponentsList />
          </Suspense>
        </Group>

        {/* 设计语言 */}
        <Group
          title={locale.designTitle}
          description={locale.designDesc}
          background={isRootDark ? 'rgb(57, 63, 74)' : '#F5F8FF'}
          decoration={
            <img
              className={styles.image}
              src="https://gw.alipayobjects.com/zos/bmw-prod/ba37a413-28e6-4be4-b1c5-01be1a0ebb1c.svg"
              alt=""
            />
          }
        >
          <Suspense fallback={null}>
            <DesignFramework />
          </Suspense>
        </Group>
      </div>
    </section>
  );
};

export default Homepage;
