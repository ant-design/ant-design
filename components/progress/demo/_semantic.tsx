import React from 'react';
import { Flex, Progress, Segmented, Switch } from 'antd';
import type { ProgressProps } from 'antd';

import useLocale from '../../../.dumi/hooks/useLocale';
import SemanticPreview from '../../../.dumi/theme/common/SemanticPreview';

const locales = {
  cn: {
    root: '根元素，设置相对定位和基础容器样式',
    body: '主体元素，设置进度条的布局和尺寸样式',
    rail: '导轨元素，设置背景轨道的颜色和圆角样式，steps 模式下没有该元素',
    track: '轨迹元素，设置进度填充部分的颜色和过渡动画样式',
    indicator: '指示器元素，设置百分比文本或图标的位置和字体样式',
  },
  en: {
    root: 'Root element, set relative positioning and basic container styles',
    body: 'Body element, set progress bar layout and size styles',
    rail: 'Rail element, set background track color and border radius styles. Not exist in steps mode',
    track: 'Track element, set progress fill color and transition animation styles',
    indicator: 'Indicator element, set percentage text or icon position and font styles',
  },
};

const colorMap = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const Block: React.FC<Readonly<ProgressProps>> = (props) => {
  const [gradient, setGradient] = React.useState(false);
  const [type, setType] = React.useState('line');

  const progressProps: any = {
    type: type === 'steps' ? 'line' : type,
    steps: type === 'steps' ? 5 : undefined,
  };

  return (
    <Flex vertical gap="middle" style={{ width: '100%' }} align="center">
      <Flex align="center" gap="middle">
        <Segmented
          options={['line', 'steps', 'circle', 'dashboard']}
          value={type}
          onChange={setType}
        />
        <Switch
          checked={gradient}
          value={gradient}
          onChange={() => setGradient(!gradient)}
          checkedChildren="Gradient"
          unCheckedChildren="Gradient"
        />
      </Flex>
      <Flex vertical align="center" style={{ height: 200, width: '100%' }}>
        <Progress
          percent={80}
          {...props}
          {...progressProps}
          strokeColor={gradient ? colorMap : undefined!}
        />
      </Flex>
    </Flex>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Progress"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'body', desc: locale.body },
        { name: 'rail', desc: locale.rail },
        { name: 'track', desc: locale.track },
        { name: 'indicator', desc: locale.indicator },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
