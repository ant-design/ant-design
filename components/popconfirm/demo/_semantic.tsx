import React from 'react';
import { Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含定位样式、层级控制、变换原点等基础容器样式',
    container: '内容元素，设置最小宽度高度、内边距、颜色、文本对齐、背景色、圆角、阴影和边框样式',
    arrow: '箭头元素，设置宽高、位置、颜色和边框样式',
  },
  en: {
    root: 'Root element with positioning styles, z-index control, transform origin and other basic container styles',
    container:
      'Content element with min width and height, padding, color, text alignment, background color, border radius, shadow and border styles',
    arrow: 'Arrow element with width, height, position, color and border styles',
  },
};

const BlockList: React.FC<React.PropsWithChildren<PopconfirmProps>> = (props) => {
  const { children, ...rest } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ position: 'absolute', marginTop: 60 }}>
      <Popconfirm
        open
        placement="top"
        autoAdjustOverflow={false}
        getPopupContainer={() => divRef.current!}
        {...rest}
      >
        {children}
      </Popconfirm>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Popconfirm"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'container', desc: locale.container },
      ]}
    >
      <BlockList title="popconfirm prompt text" />
    </SemanticPreview>
  );
};

export default App;
