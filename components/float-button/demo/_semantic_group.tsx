import React from 'react';
import { AlertOutlined, BugOutlined, BulbOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素',
    list: '列表元素',
    item: '列表项元素',
    itemIcon: '列表项图标元素',
    itemContent: '列表项内容元素',
    trigger: '触发元素',
    triggerIcon: '触发图标元素',
    triggerContent: '触发内容元素',
  },
  en: {
    root: 'Root element',
    list: 'List element',
    item: 'Item element',
    itemIcon: 'Item icon element',
    itemContent: 'Item content element',
    trigger: 'Trigger element',
    triggerIcon: 'Trigger icon element',
    triggerContent: 'Trigger content element',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="FloatButton"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'list', desc: locale.list },
        { name: 'item', desc: locale.item },
        { name: 'itemIcon', desc: locale.itemIcon },
        { name: 'itemContent', desc: locale.itemContent },
        { name: 'trigger', desc: locale.trigger },
        { name: 'triggerIcon', desc: locale.triggerIcon },
        { name: 'triggerContent', desc: locale.triggerContent },
      ]}
      style={{
        paddingTop: 100,
      }}
    >
      <FloatButton._InternalPanelDoNotUseOrYouWillBeFired
        type="primary"
        shape="square"
        items={[
          {
            icon: <AlertOutlined />,
            content: 'warn',
          },
          {
            icon: <BugOutlined />,
            content: 'bug',
          },
          {
            icon: <BulbOutlined />,
            content: 'idea',
          },
        ]}
        trigger="hover"
        open
        content="back"
      />
    </SemanticPreview>
  );
};

export default App;
