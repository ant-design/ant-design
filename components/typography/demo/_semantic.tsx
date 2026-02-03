import React from 'react';
import { Typography } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含排版组件的基础样式',
    textarea: '编辑模式下的文本域元素，包含输入框的样式',
  },
  en: {
    root: 'Root element with base styles for the typography component',
    textarea: 'Textarea element in editing mode with input styling',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Typography.Paragraph"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.3.0' },
        { name: 'textarea', desc: locale.textarea, version: '6.3.0' },
      ]}
    >
      <Typography.Paragraph editable={{ editing: true, onChange: () => {} }}>
        Ant Design
      </Typography.Paragraph>
    </SemanticPreview>
  );
};

export default App;
