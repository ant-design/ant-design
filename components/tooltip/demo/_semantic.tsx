import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素 (包含箭头、内容元素)，设置绝对定位、层级、块级显示、最大宽度、可见性、变换原点和箭头背景色',
    body: '内容元素，设置最小宽度高度、内边距、颜色、文本对齐、背景色、圆角、阴影和边框样式',
  },
  en: {
    root: 'Root element (including arrows, content elements) with absolute positioning, z-index, block display, max width, visibility, transform origin and arrow background color',
    body: 'Content element with min width and height, padding, color, text alignment, background color, border radius, shadow and border styles',
  },
};

const BlockList: React.FC<React.PropsWithChildren<TooltipProps>> = (props) => {
  const { children, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginTop: 60 }}>
      <Tooltip
        open
        placement="top"
        title="tooltip prompt text"
        autoAdjustOverflow={false}
        getPopupContainer={() => divRef.current!}
        {...rest}
      >
        {children}
      </Tooltip>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Tooltip"
      semantics={[
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'body', desc: locale.body, version: '5.23.0' },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
