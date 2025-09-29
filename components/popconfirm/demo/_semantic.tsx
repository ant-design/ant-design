import React from 'react';
import { Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，包含定位样式、层级控制、变换原点等基础容器样式',
    body: '主体元素，包含内边距、背景色、圆角边框、阴影效果、背景裁剪等内容区域样式',
    arrow: '箭头元素，设置宽高、位置、颜色和边框样式',
  },
  en: {
    root: 'Root element with positioning styles, z-index control, transform origin and other basic container styles',
    body: 'Body element with padding, background color, border radius, shadow effects, background clipping and other content area styles',
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
        { name: 'root', desc: locale.root, version: '5.23.0' },
        { name: 'body', desc: locale.body, version: '5.23.0' },
      ]}
    >
      <BlockList title="popconfirm prompt text" />
    </SemanticPreview>
  );
};

export default App;
