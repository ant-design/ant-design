import React from 'react';
import { Typography } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含排版基础样式、布局和定位',
    actions: '操作区域元素，包含复制、编辑、展开/收起等操作按钮的布局和间距样式',
  },
  en: {
    root: 'Root element with base typography styles, layout, and positioning',
    actions:
      'Actions element with layout and spacing styles for copy, edit, expand/collapse buttons',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Typography"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
      ]}
    >
      <Typography.Paragraph copyable editable ellipsis={{ rows: 2, expandable: true }}>
        Ant Design is a design language for background applications, refined by Ant UED Team. It
        aims to uniform the user interface specs for internal background projects, lower the
        unnecessary cost of design differences and implementation and liberate the resources of
        design and front-end development.
      </Typography.Paragraph>
    </SemanticPreview>
  );
};

export default App;
