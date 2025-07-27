import React from 'react';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含相对定位、行内块布局、宽度、最小宽度、内边距、颜色、字体、行高、圆角、过渡动画等输入框容器的基础样式',
    input: '输入框元素，包含输入框的核心交互样式和文本输入相关的样式',
    prefix: '前缀的包裹元素，包含前缀内容的布局和样式',
    suffix: '后缀的包裹元素，包含后缀内容的布局和样式',
    count: '文字计数元素，包含字符计数显示的字体和颜色样式',
  },
  en: {
    root: 'Root element with relative positioning, inline-block display, width, min-width, padding, colors, fonts, line-height, border-radius, transitions and other input container basic styles',
    input: 'Input element with core interactive styles and text input related styling',
    prefix: 'Prefix wrapper element with layout and styling for prefix content',
    suffix: 'Suffix wrapper element with layout and styling for suffix content',
    count: 'Character count element with font and color styles for count display',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Input"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'prefix', desc: locale.prefix },
        { name: 'input', desc: locale.input },
        { name: 'suffix', desc: locale.suffix },
        { name: 'count', desc: locale.count },
      ]}
    >
      <Input
        showCount
        prefix={<UserOutlined />}
        suffix={<EditOutlined />}
        defaultValue="Hello, Ant Design"
      />
    </SemanticPreview>
  );
};

export default App;
