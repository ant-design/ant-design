import React from 'react';
import { Spin } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素(fullscreen 为 false 时才有效)',
    mask: '遮罩层元素',
    indicator: '指示器元素',
  },
  en: {
    root: 'Root element(effective when fullscreen is false)',
    mask: 'Mask element',
    indicator: 'Indicator element',
  },
};

const SpinBlock = (props: any) => {
  return (
    <div style={{ position: 'relative', width: 500, height: 400 }}>
      <Spin
        percent={0}
        fullscreen
        styles={{ mask: { position: 'absolute', height: '100%', width: '100%' } }}
        {...props}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      semantics={[
        { name: 'root', desc: locale.root, version: '6.0.0' },
        { name: 'mask', desc: locale.mask, version: '6.0.0' },
        { name: 'indicator', desc: locale.indicator, version: '6.0.0' },
      ]}
    >
      <SpinBlock />
    </SemanticPreview>
  );
};

export default App;
