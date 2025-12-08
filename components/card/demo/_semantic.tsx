import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import type { CardProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const { Meta } = Card;

const locales = {
  cn: {
    root: '卡片根元素，包含位置定位、背景色、边框、圆角、阴影、内边距等卡片容器的基础样式',
    header:
      '卡片头部区域，包含 flex 布局、最小高度、内边距、文字颜色、字体权重、字体大小、背景色、下边框、顶部圆角等样式',
    body: '卡片内容区域，包含内边距、字体大小等内容展示的基础样式',
    extra: '卡片右上角的操作区域，包含额外内容的文字颜色和布局样式',
    title: '卡片标题，包含行内块布局、flex 占比、文本省略等标题显示样式',
    actions:
      '卡片底部操作组，包含 flex 布局、列表样式重置、背景色、上边框、底部圆角等操作按钮容器样式',
    cover: '标题封面，包含封面图片的显示和布局样式',
  },
  en: {
    root: 'Card root element with positioning, background, border, border-radius, box-shadow, padding and other container styles',
    header:
      'Card header area with flex layout, min-height, padding, text color, font-weight, font-size, background, bottom border and top border-radius',
    body: 'Card content area with padding, font-size and other content display styles',
    extra:
      'Card extra operation area in top-right corner with text color and layout styles for additional content',
    title:
      'Card title with inline-block display, flex-grow, text ellipsis and other title display styles',
    actions:
      'Card bottom action group with flex layout, list-style reset, background, top border and bottom border-radius for action buttons container',
    cover: 'Title cover with styles for cover image display and layout',
  },
};

const BlockCard: React.FC<React.PropsWithChildren<CardProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute' }}>
      <Card
        {...props}
        title="Card title"
        extra="More"
        style={{ width: 300 }}
        cover={
          <img
            draggable={false}
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Card"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '5.14.0' },
        { name: 'title', desc: locale.title, version: '5.14.0' },
        { name: 'extra', desc: locale.extra, version: '5.14.0' },
        { name: 'cover', desc: locale.cover, version: '5.14.0' },
        { name: 'body', desc: locale.body, version: '5.14.0' },
        { name: 'actions', desc: locale.actions, version: '5.14.0' },
      ]}
    >
      <BlockCard>
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Card Meta title"
          description="This is the description"
        />
      </BlockCard>
    </SemanticPreview>
  );
};

export default App;
