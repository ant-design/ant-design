import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';

import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    mask: '遮罩层元素',
    indicator: '指示器元素',
  },
  en: {
    mask: 'Mask element',
    indicator: 'Indicator element',
  },
};

const SpinBlock: React.FC<Readonly<SpinProps>> = (props) => {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'relative', width: '100%', height: 150 }}>
        <Spin
          percent={0}
          fullscreen
          styles={{ mask: { position: 'absolute', height: '100%', width: '100%' } }}
          {...props}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Spin"
      semantics={[
        { name: 'mask', desc: locale.mask, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
      ]}
    >
      <SpinBlock />
    </SemanticPreview>
  );
};

export default App;
