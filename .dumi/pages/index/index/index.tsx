import React, { type FC } from 'react';
import { theme } from 'antd';
import { useLocale as useDumiLocale } from 'dumi';
import useLocale from '../../../locales';
import Banner from './Banner';
import Group from './Group';
import { useSiteData } from './util';
import Recommends from './Recommends';

const locales = {
  cn: {
    titleNew: '5.0 新鲜特性',
    titleFlexible: '5.0 灵活百变',
    titleAssets: '5.0 丰富资产',
    titleFramework: '设计语言与研发框架',
  },
  default: {
    titleNew: '5.0 新鲜特性',
    titleFlexible: '5.0 灵活百变',
    titleAssets: '5.0 丰富资产',
    titleFramework: '设计语言与研发框架',
  },
};

const Homepage: FC = () => {
  const locale = useLocale(locales);
  const { id: localeId } = useDumiLocale();
  const localeStr = localeId === 'zh-CN' ? 'cn' : 'en';

  const { token } = theme.useToken();
  console.log('Token', token);

  const [siteData, loading] = useSiteData();
  // console.log('~~~>', siteData?.recommendations?.[localeStr]);

  // TODO: implement homepage
  // from: https://github.com/ant-design/ant-design/blob/2804cb843a1f6d8b46e44e13c2552f34c487b797/site/theme/template/Home/index.tsx
  return (
    <section>
      <Banner />
      <Group title={locale.titleNew}>
        <Recommends recommendations={siteData?.recommendations?.[localeStr]} />
      </Group>
      <Group title={locale.titleFlexible} />
      <Group title={locale.titleAssets} />
      <Group title={locale.titleFramework} />
    </section>
  );
};

export default Homepage;
