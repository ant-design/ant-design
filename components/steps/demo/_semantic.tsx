import React from 'react';
import { Flex, Steps, StepsProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: '步骤项元素',
    itemWrapper: '步骤项内裹元素',
    itemIcon: '步骤项图标元素',
    itemHeader: '步骤项头部元素',
    itemTitle: '步骤项标题元素',
    itemSubtitle: '步骤项副标题元素',
    itemSection: '步骤项区域元素',
    itemContent: '步骤项内容元素',
    itemRail: '步骤项连接线元素',
  },
  en: {
    root: 'Root element',
    item: 'Step item element',
    itemWrapper: 'Step item wrapper element',
    itemIcon: 'Step item icon element',
    itemHeader: 'Step item header element',
    itemTitle: 'Step item title element',
    itemSubtitle: 'Step item subtitle element',
    itemSection: 'Step item section element',
    itemContent: 'Step item content element',
    itemRail: 'Step item rail element',
  },
};

const sharedProps: StepsProps = {
  current: 1,
  style: { width: '100%' },
  labelPlacement: 'vertical',
  items: Array.from({ length: 3 }, (_, index) => ({
    // items: Array.from({ length: 1 }, (_, index) => ({
    title: `Step ${index + 1}`,
    subTitle: `00:0${index}`,
    content: 'This is a content.',
  })),
};

const Block = (props: any) => (
  <Flex vertical gap="large" style={{ width: '100%' }}>
    <Steps {...sharedProps} {...props} />
    <Steps {...sharedProps} {...props} type="panel" size="small" labelPlacement="horizontal" />
  </Flex>
);

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Steps"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemWrapper', desc: locale.itemWrapper },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemHeader', desc: locale.itemHeader },
        { name: 'itemTitle', desc: locale.itemTitle },
        { name: 'itemSubtitle', desc: locale.itemSubtitle },
        { name: 'itemSection', desc: locale.itemSection },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'itemRail', desc: locale.itemRail },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
