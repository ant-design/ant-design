import React from 'react';
import { Button, Empty, Typography } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置文本对齐、字体和行高样式',
    image: '图标元素，设置高度、透明度、边距和图片样式',
    description: '描述元素，设置文本颜色样式',
    footer: '底部元素，设置顶部边距和操作按钮样式',
  },
  en: {
    root: 'Root element, sets text alignment, font and line height styles',
    image: 'Image element, sets height, opacity, margin and image styles',
    description: 'Description element, sets text color styles',
    footer: 'Footer element, sets top margin and action button styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Empty"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'image', desc: locale.image, version: '5.23.0' },
        { name: 'description', desc: locale.description, version: '5.23.0' },
        { name: 'footer', desc: locale.footer, version: '5.23.0' },
      ]}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        styles={{ image: { height: 60 } }}
        description={
          <Typography.Text>
            Customize <a href="#API">Description</a>
          </Typography.Text>
        }
      >
        <Button type="primary">Create Now</Button>
      </Empty>
    </SemanticPreview>
  );
};

export default App;
