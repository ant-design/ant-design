import React from 'react';
import { Timeline } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    item: '节点元素',
    itemWrapper: '节点内裹元素',
    itemIcon: '节点图标元素',
    itemHeader: '节点头部元素',
    itemTitle: '节点标题元素',
    // itemSubtitle: '节点副标题元素',
    itemSection: '节点区域元素',
    itemContent: '节点内容元素',
    itemRail: '节点连接线元素',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemWrapper: 'Item wrapper element',
    itemIcon: 'Item icon element',
    itemHeader: 'Item header element',
    itemTitle: 'Item title element',
    // itemSubtitle: 'Item subtitle element',
    itemSection: 'Item section element',
    itemContent: 'Item content element',
    itemRail: 'Item rail element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Timeline"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'item', desc: locale.item },
        { name: 'itemWrapper', desc: locale.itemWrapper },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemSection', desc: locale.itemSection },
        { name: 'itemHeader', desc: locale.itemHeader },
        { name: 'itemTitle', desc: locale.itemTitle },
        // { name: 'itemSubtitle', desc: locale.itemSubtitle },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'itemRail', desc: locale.itemRail },
      ]}
    >
      <Timeline
        items={[
          {
            title: '2015-09-01',
            content: 'Create a services',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Solve initial network problems',
          },
          {
            content: 'Technical testing',
          },
          {
            title: '2015-09-01 09:12:11',
            content: 'Network problems being solved',
          },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
