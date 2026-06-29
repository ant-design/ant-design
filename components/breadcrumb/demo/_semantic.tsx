import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，包含文字颜色、字体大小、图标尺寸等基础样式，内部使用 flex 布局的有序列表',
    item: 'Item 元素，包含文字颜色、链接的颜色变化、悬浮效果、内边距、圆角、高度、外边距等样式',
    separator: '分隔符元素，包含分隔符的外边距和颜色样式',
  },
  en: {
    root: 'Root element with text color, font size, icon size and other basic styles, using flex layout with ordered list',
    item: 'Item element with text color, link color transitions, hover effects, padding, border-radius, height, and margin styles',
    separator: 'Separator element with margin and color styles for the divider',
  },
};

const Block: React.FC<Readonly<BreadcrumbProps>> = (props) => {
  return (
    <Breadcrumb
      {...props}
      items={[
        {
          href: '',
          title: <HomeOutlined />,
        },
        {
          href: '',
          title: (
            <>
              <UserOutlined />
              <span>Application List</span>
            </>
          ),
        },
        {
          title: 'Application',
        },
      ]}
    />
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Breadcrumb"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'item', desc: locale.item, version: '6.0.0' },
        { name: 'separator', desc: locale.separator, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
