import { useOutlet } from 'dumi';
import React from 'react';

import useSearchParams from './hook';
import { ConfigProvider, theme } from '../../../../components';

const themes = {
  default: theme.defaultAlgorithm,
  dark: theme.darkAlgorithm,
  compact: theme.compactAlgorithm,
};

const DemoLayout: React.FC = () => {
  const outlet = useOutlet();

  const params = useSearchParams();
  const currentTheme = params.theme! as keyof typeof themes;
  const enableCssVar = params['enable-css-var'];

  return (
    <div
      className="dumi-antd-demo-layout"
      style={{ background: currentTheme === 'dark' ? '#000' : '', padding: `24px 12px` }}
    >
      <ConfigProvider theme={{ ...themes[currentTheme], cssVar: !!enableCssVar }}>
        {outlet}
      </ConfigProvider>
    </div>
  );
};

export default DemoLayout;
