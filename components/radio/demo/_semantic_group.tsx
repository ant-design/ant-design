import React from 'react';
import { Radio } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，单选组合容器，包含排列方向、间距、按钮风格等组合布局样式',
    item: '选项元素，单个 Radio 的包裹容器，包含选中、禁用、块级排列等选项样式',
    itemIcon: '选项选中框元素，包含圆角、边框、过渡动画、悬停与焦点等交互样式',
    itemLabel: '选项文本元素，包含内边距、文字颜色、禁用状态、对齐方式等文本样式',
  },
  en: {
    root: 'Root element of the radio group container, including layout direction, spacing, button style and other group layout styles',
    item: 'Item element wrapping a single Radio, including checked, disabled, block layout and other option styles',
    itemIcon:
      'Item icon element with border radius, border, transition animations, hover and focus interactive styles',
    itemLabel:
      'Item label element with padding, text color, disabled states, alignment and other text styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Radio.Group"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.7.0' },
        { name: 'item', desc: locale.item, version: '6.7.0' },
        { name: 'itemIcon', desc: locale.itemIcon, version: '6.7.0' },
        { name: 'itemLabel', desc: locale.itemLabel, version: '6.7.0' },
      ]}
    >
      <Radio.Group
        defaultValue="apple"
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'pear', label: 'Pear' },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
