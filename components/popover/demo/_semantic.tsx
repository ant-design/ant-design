import React from 'react';
import { Popover } from 'antd';
import type { PopoverProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，设置绝对定位、层级、变换原点、箭头指向和弹层容器样式',
    container: '内容元素，设置背景色、内边距、圆角、阴影、边框和内容展示样式',
    arrow: '箭头元素，设置宽高、位置、颜色和边框样式',
  },
  en: {
    root: 'Root element, set absolute positioning, z-index, transform origin, arrow direction and popover container styles',
    container:
      'Body element, set background color, padding, border radius, shadow, border and content display styles',
    arrow: 'Arrow element with width, height, position, color and border styles',
  },
};

const BlockList: React.FC<React.PropsWithChildren<PopoverProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const { children, ...rest } = props;
  return (
    <div ref={divRef} style={{ position: 'absolute', marginTop: 60 }}>
      <Popover
        open
        placement="top"
        title="popover prompt text"
        autoAdjustOverflow={false}
        getPopupContainer={() => divRef.current!}
        {...rest}
      >
        {children}
      </Popover>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Popover"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'container', desc: locale.container },
      ]}
    >
      <BlockList />
    </SemanticPreview>
  );
};

export default App;
