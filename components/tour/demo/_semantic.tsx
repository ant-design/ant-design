import React from 'react';
import { Button, Tour } from 'antd';
import type { TourProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '引导根容器，包含固定定位、层级控制、主题支持和箭头指向样式',
    cover: '卡片封面区域，支持自定义图片展示，居中对齐和全宽布局',
    section: '卡片主要内容区域，包含背景色、阴影效果、标题和描述文本',
    footer: '卡片底部操作区域，包含指示器和操作按钮，右对齐布局',
    actions: '操作按钮组容器，包含上一步、下一步和完成按钮',
    indicator: '单个指示器元素，圆形显示当前步骤进度',
    indicators: '指示器组容器，展示所有步骤的进度指示器',
    header: '卡片头部区域，包含标题文字和自动换行功能',
    title: '引导标题文字，粗体样式和自动换行',
    description: '引导描述文字，支持自动换行',
    mask: '遮罩层元素，覆盖页面内容突出引导目标，包含过渡动画',
  },
  en: {
    root: 'Tour root container with fixed positioning, z-index control, theme support and arrow pointing styles',
    cover:
      'Card cover area supporting custom image display with center alignment and full width layout',
    section:
      'Card main content area containing background color, shadow effects, title and description text',
    footer:
      'Card bottom action area containing indicators and action buttons with right-aligned layout',
    actions: 'Action button group container including previous, next and finish buttons',
    indicator: 'Single indicator element displaying current step progress in circular shape',
    indicators: 'Indicator group container displaying progress indicators for all steps',
    header: 'Card header area containing title text with word wrap functionality',
    title: 'Guide title text with bold style and word wrap',
    description: 'Guide description text with word wrap support',
    mask: 'Mask layer element covering page content to highlight guide target with transition animations',
  },
};

const BlockList: React.FC<React.PropsWithChildren<TourProps>> = (props) => {
  const [open, setOpen] = React.useState(true);
  const createBtnRef = React.useRef<HTMLButtonElement>(null);
  return (
    <div
      style={{
        width: '100%',
        height: 825,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Button ref={createBtnRef} onClick={() => setOpen(true)}>
        Show
      </Button>
      <Tour
        {...props}
        zIndex={1}
        open={open}
        defaultCurrent={0}
        getPopupContainer={false as unknown as TourProps['getPopupContainer']}
        onClose={() => setOpen(false)}
        steps={[
          {
            title: 'Hello World!',
            description: 'Hello World?!',
            cover: (
              <img
                alt="tour.png"
                src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
              />
            ),
            target: () => createBtnRef.current!,
            mask: true,
          },
          {
            title: 'Save',
            description: 'Save your changes.',
            target: () => createBtnRef.current!,
          },
        ]}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tour"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'mask', desc: locale.mask, version: '6.0.0' },
        { name: 'section', desc: locale.section, version: '6.0.0' },
        { name: 'cover', desc: locale.cover, version: '6.0.0' },
        { name: 'header', desc: locale.header, version: '6.0.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'description', desc: locale.description, version: '6.0.0' },
        { name: 'footer', desc: locale.footer, version: '6.0.0' },
        { name: 'actions', desc: locale.actions, version: '6.0.0' },
        { name: 'indicators', desc: locale.indicators, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
