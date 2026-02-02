import React from 'react';
import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '触发器容器，包含边框样式、过渡动画、尺寸控制等样式，显示颜色块和文本内容',
    'popup.root': '弹出面板根容器，包含背景色、阴影效果、色彩选择面板、滑块控制和预设颜色等样式',
  },
  en: {
    root: 'Trigger container with border styles, transition animations, size controls, displaying color block and text content',
    'popup.root':
      'Popup panel root container with background color, shadow effects, color selection panel, slider controls and preset colors',
  },
};

const Block: React.FC<Readonly<ColorPickerProps>> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} style={{ height: 300 }}>
      <ColorPicker
        defaultValue="#1677ff"
        open
        {...props}
        getPopupContainer={() => divRef.current || document.body}
        styles={{
          popup: {
            root: { zIndex: 1 },
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="ColorPicker"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'popup.root', desc: locale['popup.root'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
