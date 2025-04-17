import React from 'react';
import { Flex, Progress, Segmented, Switch } from 'antd';
import type { ProgressProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    body: '主体元素',
    rail: '导轨元素',
    track: '轨迹元素',
    indicator: '指示器元素',
  },
  en: {
    root: 'Root element',
    body: 'Body element',
    rail: 'Rail element',
    track: 'Track element',
    indicator: 'Indicator element',
  },
};

const colorMap = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const Block = (props: object) => {
  const [gradient, setGradient] = React.useState(false);
  const [type, setType] = React.useState<ProgressProps['type']>('line');

  return (
    <Flex vertical gap="middle" style={{ width: '100%' }} align="center">
      <Flex align="center" gap="middle">
        <Segmented
          options={['line', 'circle', 'dashboard'] as const}
          value={type}
          onChange={(value) => setType(value)}
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
          type={type}
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
