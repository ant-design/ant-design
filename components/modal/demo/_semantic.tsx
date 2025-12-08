import React from 'react';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含相对定位、顶部位置、宽度、最大宽度、外边距、底部内边距等模态框容器的基础布局样式',
    mask: '遮罩层元素，包含固定定位、层级、背景色、动画过渡等遮罩层的样式',
    wrapper: '包裹层元素，一般用于动画容器，包含动画和过渡效果的样式',
    container:
      'Modal 容器元素，包含相对定位、背景色、背景裁剪、边框、圆角、阴影、指针事件、内边距等模态框主体样式',
    header: '头部元素，包含头部内边距、下边框等头部区域样式',
    title: '标题元素，包含外边距、颜色、字体权重、字体大小、行高、文字换行等标题文字样式',
    body: '内容元素，包含内容区域的背景色、内边距等内容展示样式',
    footer: '底部元素，包含底部的背景色、内边距、上边框、圆角等底部区域样式',
  },
  en: {
    root: 'Root element with relative positioning, top position, width, max-width, margins, bottom padding and other basic layout styles for modal container',
    mask: 'Mask element with fixed positioning, z-index, background color, animation transitions and other mask layer styles',
    wrapper:
      'Wrapper element used for motion container with animation and transition effect styles',
    container:
      'Modal container element with relative positioning, background, background-clip, border, border-radius, box-shadow, pointer-events, padding and other modal body styles',
    header: 'Header element with padding, bottom border and other header area styles',
    title:
      'Title element with margin, color, font-weight, font-size, line-height, word-wrap and other title text styles',
    body: 'Body element with content area background color, padding and other content display styles',
    footer:
      'Footer element with footer background color, padding, top border, border-radius and other footer area styles',
  },
};

const BlockModal: React.FC<Readonly<ModalProps>> = (props) => {
  const { children, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', inset: 0 }}>
      <Modal
        getContainer={() => divRef.current!}
        {...rest}
        styles={{
          mask: { position: 'absolute', zIndex: 1 },
          wrapper: { position: 'absolute', zIndex: 1 },
        }}
        style={{ top: '50%', transform: 'translateY(-50%)', marginBottom: 0, paddingBottom: 0 }}
      >
        {children}
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Modal"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'mask', desc: locale.mask, version: '5.13.0' },
        { name: 'container', desc: locale.container, version: '6.0.0' },
        { name: 'wrapper', desc: locale.wrapper, version: '5.13.0' },
        { name: 'header', desc: locale.header, version: '5.13.0' },
        { name: 'title', desc: locale.title, version: '6.0.0' },
        { name: 'body', desc: locale.body, version: '5.13.0' },
        { name: 'footer', desc: locale.footer, version: '5.13.0' },
      ]}
    >
      <BlockModal title="Title" closable={false} open getContainer={false} width={400}>
        <p>Some contents...</p>
      </BlockModal>
    </SemanticPreview>
  );
};

export default App;
