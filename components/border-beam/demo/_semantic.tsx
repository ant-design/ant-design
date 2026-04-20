import React from 'react';
import { BorderBeam, theme, Typography } from 'antd';
import type { BorderBeamProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，负责相对定位、边框环宽度以及暂停、反向、禁用等流光状态控制',
    beam: '装饰元素，负责渲染沿边框运动的流光束，本身不响应交互事件',
  },
  en: {
    root: 'Root element that controls relative positioning, beam ring width, and state modifiers such as paused, reverse, and disabled',
    beam: 'Decorative element that renders the moving beam along the border without handling user interactions',
  },
};

const Block: React.FC<Readonly<BorderBeamProps>> = (props) => {
  const { token } = theme.useToken();
  const { pathRadius = 20, style, ...restProps } = props;

  return (
    <BorderBeam
      {...restProps}
      borderWidth={2}
      duration={5.5}
      offset={12}
      pathRadius={pathRadius}
      paused
      size={84}
      style={{ width: 320, ...style }}
    >
      <div
        style={{
          padding: 24,
          borderRadius: pathRadius,
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
