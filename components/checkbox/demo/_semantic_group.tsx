import React from 'react';
import { Checkbox } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素，复选框组合容器，包含布局、间距和排列等组合样式',
    item: '选项元素，单个 Checkbox 的包裹容器，包含选中、禁用等选项样式',
    itemIcon: '选项勾选框元素，包含尺寸、背景、边框、圆角和选中状态等图标样式',
    itemLabel: '选项文本元素，包含内边距、文字颜色和对齐方式等文本样式',
  },
  en: {
    root: 'Root element of the checkbox group container, including layout, spacing and arrangement styles',
    item: 'Item element wrapping a single Checkbox, including checked, disabled and other option styles',
    itemIcon:
      'Item icon element with size, background, border, border radius, checked state and other icon styles',
    itemLabel: 'Item label element with padding, text color, alignment and other text styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Checkbox.Group"
      semantics={[
        { name: 'root', desc: locale.root, version: '6.7.0' },
        { name: 'item', desc: locale.item, version: '6.7.0' },
        { name: 'itemIcon', desc: locale.itemIcon, version: '6.7.0' },
        { name: 'itemLabel', desc: locale.itemLabel, version: '6.7.0' },
      ]}
    >
      <Checkbox.Group
        defaultValue={['Apple']}
        options={[
          { value: 'Apple', label: 'Apple' },
          { value: 'Pear', label: 'Pear' },
        ]}
      />
    </SemanticPreview>
  );
};

export default App;
