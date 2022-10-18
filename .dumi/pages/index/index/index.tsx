import React, { type FC } from 'react';
import { useLocale as useDumiLocale } from 'dumi';
import { css } from '@emotion/react';
import useLocale from '../../../hooks/useLocale';
import Banner from './Banner';
import Group from './Group';
import { useSiteData } from './util';
import Recommends from './RecommendsOld';
import useSiteToken from '../../../hooks/useSiteToken';
import Theme from './Theme';
import BannerRecommends from './BannerRecommends';

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    container: css`
      // padding: 0 116px;

      // background: url(https://gw.alipayobjects.com/zos/bmw-prod/5741382d-cc22-4ede-b962-aea287a1d1a1/l4nq43o8_w2646_h1580.png);
      // background-size: 20% 10%;
    `,
  };
};

const locales = {
  cn: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',

    assetsTitle: '组件丰富，选用自如',
    assetsDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',

    designTitle: '设计语言与研发框架',
    designDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',
  },
  en: {
    themeTitle: '定制主题，随心所欲',
    themeDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',

    assetsTitle: '组件丰富，选用自如',
    assetsDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',

    designTitle: '设计语言与研发框架',
    designDesc: 'Ant Design 5.0 全新圆角算法，让你定制主题更简单',
  },
};

const Homepage: FC = () => {
  const [locale] = useLocale(locales);
  const { id: localeId } = useDumiLocale();
  const localeStr = localeId === 'zh-CN' ? 'cn' : 'en';

  const [siteData, loading] = useSiteData();
  console.log('siteData:', siteData);

  const style = useStyle();

  // TODO: implement homepage
  // from: https://github.com/ant-design/ant-design/blob/2804cb843a1f6d8b46e44e13c2552f34c487b797/site/theme/template/Home/index.tsx
  return (
    <section>
      <Banner>
        <BannerRecommends extras={siteData?.extras?.[localeStr]} icons={siteData?.icons} />
      </Banner>

      <div css={style.container}>
        <Group
          title={locale.themeTitle}
          description={locale.themeDesc}
          id="flexible"
          background="#F5F8FF"
          decoration={
            <>
              {/* Image Left Top */}
              <img
                style={{ position: 'absolute', left: 0, top: -100, height: 500 }}
                src="https://gw.alipayobjects.com/zos/bmw-prod/0533d7c8-4c06-4663-9652-a3e6405d3558.svg"
              />
              {/* Image Right Bottom */}
              <img
                style={{ position: 'absolute', right: 0, bottom: -100, height: 287 }}
                src="https://gw.alipayobjects.com/zos/bmw-prod/7d1dcad9-d49a-4a1d-b736-a5793341083d.svg"
              />
            </>
          }
        >
          <Theme />
        </Group>
        <Group title={locale.assetsTitle} description={locale.assetsDesc} id="design" />
        <Group
          title={locale.designTitle}
          description={locale.designDesc}
          background="#F5F8FF"
          decoration={
            <>
              {/* Image Left Top */}
              <img
                style={{ position: 'absolute', left: 0, top: -50, height: 160 }}
                src="https://gw.alipayobjects.com/zos/bmw-prod/ba37a413-28e6-4be4-b1c5-01be1a0ebb1c.svg"
              />
            </>
          }
        />
      </div>
    </section>
  );
};

export default Homepage;
