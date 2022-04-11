import React, { FC, useMemo, useState } from 'react';
import { ConfigProvider, Select, Space } from 'antd';
import { statistic } from '../../../../components/_util/theme/util/statistic';
import ComponentPreview from './ComponentPreview';
import Components from './components';

const DesignToken: FC = () => {
  const components = useMemo(() => Object.keys(Components), []);
  const [shownComponents, setShownComponents] = useState<string[] | null>(null);

  // Full token
  const [, token] = ConfigProvider.useToken();
  const tokenList = React.useMemo(
    () =>
      Object.keys(token)
        .filter(name => !name.startsWith('_'))
        .map((name: keyof typeof token) => ({
          key: name,
          value: name,
        })),
    [token],
  );

  const handleTokenChange = (value: string) => {
    setShownComponents(
      value
        ? Object.entries(statistic)
            .filter(([, tokens]: [string, string[]]) => tokens?.includes(value))
            .map(([component]) => `${component}Demo`)
        : null,
    );
  };

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Select
        showSearch
        options={tokenList}
        style={{ width: 200 }}
        placeholder="Select Token"
        onChange={handleTokenChange}
        allowClear
      />
      {components.map(item => {
        const Demo = (Components as any)[item];
        return (
          <ComponentPreview key={item} component={item} shownComponents={shownComponents}>
            <Demo />
          </ComponentPreview>
        );
      })}
    </Space>
  );
};

export default DesignToken;
