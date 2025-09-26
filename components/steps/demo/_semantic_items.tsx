import React from 'react';
import { Flex, Steps } from 'antd';
import type { StepsProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import type { SemanticPreviewInjectionProps } from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素',
    wrapper: '步骤项内裹元素',
    icon: '步骤项图标元素',
    header: '步骤项头部元素',
    title: '步骤项标题元素',
    subtitle: '步骤项副标题元素',
    section: '步骤项区域元素',
    content: '步骤项内容元素',
    rail: '步骤项连接线元素',
  },
  en: {
    root: 'Root element',
    wrapper: 'Step item wrapper element',
    icon: 'Step item icon element',
    header: 'Step item header element',
    title: 'Step item title element',
    subtitle: 'Step item subtitle element',
    section: 'Step item section element',
    content: 'Step item content element',
    rail: 'Step item rail element',
  },
};

const Block = (props: SemanticPreviewInjectionProps) => {
  const sharedProps: StepsProps = {
    current: 1,
    style: { width: '100%' },
    titlePlacement: 'vertical',
    items: Array.from({ length: 3 }, (_, index) => ({
      title: `Step ${index + 1}`,
      subTitle: `00:0${index}`,
      content: 'This is a content.',
      ...(index === 0 ? props : null),
    })),
  };

  return (
    <Flex vertical gap="large" style={{ width: '100%' }}>
      <Steps {...sharedProps} />
      <Steps {...sharedProps} type="panel" size="small" titlePlacement="horizontal" />
    </Flex>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Steps"
      itemsAPI="items"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'wrapper', desc: locale.wrapper },
        { name: 'icon', desc: locale.icon },
        { name: 'header', desc: locale.header },
        { name: 'title', desc: locale.title },
        { name: 'subtitle', desc: locale.subtitle },
        { name: 'section', desc: locale.section },
        { name: 'content', desc: locale.content },
        { name: 'rail', desc: locale.rail },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
