import React from 'react';
import { Splitter } from 'antd';
import type { SplitterProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import { Desc } from './size';

const locales = {
  cn: {
    root: '根元素，设置flex布局、宽度高度、对齐方式和拉伸样式',
    panel: '面板元素，设置flex基础值、增长比例和面板容器样式',
    dragger: '拖拽控制元素，设置绝对定位、用户选择、层级、居中对齐、背景色、悬停态和激活态样式',
  },
  en: {
    root: 'Root element with flex layout, width and height, alignment and stretch styles',
    panel: 'Panel element with flex basis, grow ratio and panel container styles',
    dragger:
      'Drag control element with absolute positioning, user selection, z-index, center alignment, background color, hover and active states styles',
  },
};

const Block: React.FC<Readonly<SplitterProps>> = (props) => {
  return (
    <Splitter
      {...props}
      style={{ height: 200, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
      classNames={{ ...props.classNames, dragger: { default: 'semantic-mark-dragger' } }}
    >
      <Splitter.Panel>
        <Desc text="First" />
      </Splitter.Panel>
      <Splitter.Panel>
        <Desc text="Second" />
      </Splitter.Panel>
    </Splitter>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Splitter"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'panel', desc: locale.panel, version: '6.0.0' },
        { name: 'dragger', desc: locale.dragger, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
