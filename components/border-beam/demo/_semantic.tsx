import React from 'react';
import { BorderBeam, theme, Typography } from 'antd';
import type { BorderBeamProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，负责相对定位，并承载流光轨迹与颜色相关的样式变量',
    beam: '装饰元素，负责渲染沿边框运动的流光束，本身不响应交互事件',
  },
  en: {
    root: 'Root element that provides relative positioning and hosts the beam track and color related style variables',
    beam: 'Decorative element that renders the moving beam along the border without handling user interactions',
  },
};

const Block: React.FC<Readonly<BorderBeamProps>> = (props) => {
  const { token } = theme.useToken();
  const radius = 20;
  const { style, ...restProps } = props;

  return (
    <BorderBeam {...restProps} color={token.colorInfo} style={{ width: 320, ...style }}>
      <div
        style={{
          padding: 24,
          borderRadius: radius,
          border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
          background: token.colorBgContainer,
          boxShadow: token.boxShadowTertiary,
        }}
      >
        <Typography.Text strong>Semantic DOM Preview</Typography.Text>
      </div>
    </BorderBeam>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);

  return (
    <SemanticPreview
      componentName="BorderBeam"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'beam', desc: locale.beam },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
