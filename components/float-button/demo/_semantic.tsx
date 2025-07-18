import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '浮动按钮根元素，控制定位、层级、阴影和形状样式',
    body: '按钮主体区域，控制背景色、悬停效果和内容布局',
    content: '内容容器，控制图标和文字的排列和对齐方式',
    icon: '图标元素，控制图标尺寸和颜色样式',
    description: '描述文字，控制字体大小、行高和文字颜色',
  },
  en: {
    root: 'Float button root element, controls positioning, z-index, shadow and shape styles',
    body: 'Button body area, controls background color, hover effects and content layout',
    content: 'Content container, controls icon and text arrangement and alignment',
    icon: 'Icon element, controls icon size and color styles',
    description: 'Description text, controls font size, line height and text color',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="FloatButton"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'icon', desc: locale.icon },
        { name: 'content', desc: locale.content },
      ]}
    >
      <FloatButton._InternalPanelDoNotUseOrYouWillBeFired
        type="primary"
        shape="square"
        icon={<QuestionCircleOutlined />}
        content="HELP"
      />
    </SemanticPreview>
  );
};

export default App;
