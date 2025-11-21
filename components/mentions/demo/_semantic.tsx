import React from 'react';
import { UnstableContext } from '@rc-component/mentions';
import type { UnstableContextProps } from '@rc-component/mentions/lib/context';
import type { MentionProps } from 'antd';
import { Mentions } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置行内flex布局、相对定位、内边距和边框样式',
    textarea: '文本域元素，设置字体、行高、文本输入和背景样式',
    popup: '弹出框元素，设置绝对定位、层级、背景色、圆角、阴影和下拉选项样式',
    suffix: '后缀元素，包含后缀内容的布局和样式，如清除按钮等',
  },
  en: {
    root: 'Root element, set inline flex layout, relative positioning, padding and border styles',
    textarea: 'Textarea element, set font, line height, text input and background styles',
    popup:
      'Popup element, set absolute positioning, z-index, background color, border radius, shadow and dropdown options styles',
    suffix: 'Suffix element with layout and styling for suffix content like clear button, etc.',
  },
};

const Block: React.FC<MentionProps> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const memoizedValue = React.useMemo<UnstableContextProps>(() => ({ open: true }), []);
  return (
    <div ref={divRef} style={{ position: 'absolute', height: 200, overflow: 'hidden' }}>
      <UnstableContext.Provider value={memoizedValue}>
        <Mentions
          {...props}
          placement="bottom"
          style={{ width: '100%' }}
          value="Hi, @"
          allowClear
          getPopupContainer={() => divRef.current!}
          styles={{
            popup: {
              zIndex: 1,
            },
          }}
          options={[
            {
              value: 'afc163',
              label: 'afc163',
            },
            {
              value: 'zombieJ',
              label: 'zombieJ',
            },
            {
              value: 'thinkasany',
              label: 'thinkasany',
            },
            {
              value: 'meet-student',
              label: 'meet-student',
            },
          ]}
        />
      </UnstableContext.Provider>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Mentions"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'textarea', desc: locale.textarea, version: '6.0.0' },
        { name: 'suffix', desc: locale.suffix, version: '6.0.0' },
        { name: 'popup', desc: locale.popup, version: '6.0.0' },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
