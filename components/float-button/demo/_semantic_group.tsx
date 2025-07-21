import React from 'react';
import { AlertOutlined, BugOutlined, BulbOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置固定定位、层级和位置样式',
    list: '列表元素，设置布局方向、圆角、阴影和动画样式',
    item: '列表项元素，设置按钮的尺寸、形状和交互样式',
    itemIcon: '列表项图标元素，设置图标的尺寸和颜色样式',
    itemContent: '列表项内容元素，设置文本的布局和样式',
    'trigger.root': '触发元素，设置触发按钮的位置和交互样式',
    'trigger.icon': '触发图标元素，设置触发按钮图标的样式',
    'trigger.content': '触发内容元素，设置触发按钮文本的样式',
  },
  en: {
    root: 'Root element, sets fixed positioning, z-index and position styles',
    list: 'List element, sets layout direction, border radius, shadow and animation styles',
    item: 'Item element, sets button size, shape and interaction styles',
    itemIcon: 'Item icon element, sets icon size and color styles',
    itemContent: 'Item content element, sets text layout and styles',
    'trigger.root': 'Trigger element, sets trigger button position and interaction styles',
    'trigger.icon': 'Trigger icon element, sets trigger button icon styles',
    'trigger.content': 'Trigger content element, sets trigger button text styles',
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
