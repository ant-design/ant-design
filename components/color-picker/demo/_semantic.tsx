import React from 'react';
import type { ColorPickerProps } from 'antd';
import { ColorPicker, Flex } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '触发器容器，包含边框样式、过渡动画、尺寸控制等样式，显示颜色块和文本内容',
    body: '色块容器，包含底色、边框等样式',
    content: '色块颜色元素，包含实际选择的颜色样式',
    description: '描述文本内容，包含字体样式、颜色等样式',
    'popup.root': '弹出面板根容器，包含背景色、阴影效果、色彩选择面板、滑块控制和预设颜色等样式',
  },
  en: {
    root: 'Trigger container with border styles, transition animations, size controls, displaying color block and text content',
    body: 'Color block container with background color, border styles',
    content: 'Color block element with actual selected color styles',
    description: 'Description text content with font styles and color',
    'popup.root':
      'Popup panel root container with background color, shadow effects, color selection panel, slider controls and preset colors',
  },
};

const Block: React.FC<Readonly<ColorPickerProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <Flex ref={divRef} style={{ height: 300 }} align="flex-start" gap="small">
      <ColorPicker
        defaultValue="#1677ff"
        open
        showText
        {...props}
        getPopupContainer={() => divRef!.current!}
        styles={{
          popup: {
            root: { zIndex: 1 },
          },
        }}
      />
      <ColorPicker open={false} allowClear {...props} />
    </Flex>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="ColorPicker"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'body', desc: locale.body },
        { name: 'content', desc: locale.content },
        { name: 'description', desc: locale.description },
        { name: 'popup.root', desc: locale['popup.root'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
