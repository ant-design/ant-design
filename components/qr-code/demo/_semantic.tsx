import React from 'react';
import { QRCode } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置flex布局、内边距、背景色、边框、圆角和相对定位样式',
    cover: '遮罩层元素，设置绝对定位、层级、背景色和加载状态覆盖样式',
  },
  en: {
    root: 'Root element, set flex layout, padding, background color, border, border radius and relative positioning styles',
    cover:
      'Cover element, set absolute positioning, z-index, background color and loading state overlay styles',
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const value = 'https://ant.design';
  return (
    <SemanticPreview
      componentName="QRCode"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'cover', desc: locale.cover },
      ]}
    >
      <QRCode value={value} status="loading" />
    </SemanticPreview>
  );
};

export default App;
