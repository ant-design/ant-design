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
    'item.root': '列表项根元素',
    'item.icon': '列表项图标元素',
    'item.content': '列表项内容元素',
    'trigger.root': '触发元素',
    'trigger.icon': '触发图标元素',
    'trigger.content': '触发内容元素',
  },
  en: {
    root: 'Root element',
    list: 'List element',
    item: 'Item element',
    'item.root': 'Item root element',
    'item.icon': 'Item icon element',
    'item.content': 'Item content element',
    'trigger.root': 'Trigger element',
    'trigger.icon': 'Trigger icon element',
    'trigger.content': 'Trigger content element',
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
        { name: 'item.root', desc: locale['item.root'] },
        { name: 'item.icon', desc: locale['item.icon'] },
        { name: 'item.content', desc: locale['item.content'] },
        { name: 'trigger.root', desc: locale['trigger.root'] },
        { name: 'trigger.icon', desc: locale['trigger.icon'] },
        { name: 'trigger.content', desc: locale['trigger.content'] },
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
