import React from 'react';
import { Flex, Switch, Typography } from 'antd';
import type { TypographyProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含排版基础样式、布局和定位',
    actions: '操作区域元素，包含复制、编辑、展开/收起等操作按钮的布局和间距样式',
    action: '单个操作按钮元素，包括复制、编辑、展开、收起按钮的样式，如内边距、圆角、颜色等',
    textarea: '可编辑模式下的 TextArea 元素样式，用于自定义编辑输入框的类名和内联样式',
  },
  en: {
    root: 'Root element with base typography styles, layout, and positioning',
    actions:
      'Actions element with layout and spacing styles for copy, edit, expand/collapse buttons',
    action:
      'Individual action button element including copy, edit, expand, collapse button styles like padding, border radius, colors, etc.',
    textarea:
      'TextArea element in editable mode, used to customize className and inline styles for the edit input',
  },
};

const Block: React.FC<Readonly<TypographyProps>> = (props) => {
  const [editing, setEditing] = React.useState(false);

  return (
    <Flex vertical gap="middle" align="center" style={{ width: '100%', alignSelf: 'flex-start' }}>
      <Switch
        checked={editing}
        onChange={setEditing}
        checkedChildren="Editing"
        unCheckedChildren="Editing"
      />
      <Typography.Paragraph
        copyable
        editable={{ editing }}
        ellipsis={{ rows: 2, expandable: true }}
        style={{ width: '100%' }}
        {...props}
      >
        Ant Design is a design language for background applications, refined by Ant UED Team. It
        aims to uniform the user interface specs for internal background projects, lower the
        unnecessary cost of design differences and implementation and liberate the resources of
        design and front-end development.
      </Typography.Paragraph>
    </Flex>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName="Typography"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.4.0' },
        { name: 'actions', desc: locale.actions, version: '6.4.0' },
        { name: 'action', desc: locale.action, version: '6.4.0' },
        { name: 'textarea', desc: locale.textarea, version: '6.4.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
