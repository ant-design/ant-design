import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置悬浮按钮的基础样式、形状尺寸、类型主题、固定定位、层级、阴影、间距等容器样式',
    content: '内容元素，设置按钮内文字内容的字体大小、颜色、对齐、换行等文本显示样式',
    icon: '图标元素，设置按钮内图标的尺寸、颜色、行高、对齐等图标显示样式',
  },
  en: {
    root: 'Root element with float button base styles, shape size, type theme, fixed positioning, z-index, shadow, spacing and other container styles',
    content:
      'Content element with button text content font size, color, alignment, line wrap and other text display styles',
    icon: 'Icon element with button icon size, color, line height, alignment and other icon display styles',
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
