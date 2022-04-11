import React, { FC, useState } from 'react';
import { AutoComplete, Button, Col, ConfigProvider, Row, Select, Space, Typography } from 'antd';
import { statistic } from '../../../../components/_util/theme/util/statistic';

const DesignToken: FC = () => {
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
      Object.entries(statistic)
        .filter(([_, tokens]: [string, string[]]) => tokens?.includes(value))
        .map(([component]) => component),
    );
  };

  return (
    <Space direction="vertical">
      <Select
        showSearch
        options={tokenList}
        style={{ width: 200 }}
        placeholder="Select Token"
        onChange={handleTokenChange}
      />
      {(shownComponents === null || shownComponents.includes('Button')) && (
        <Space direction="vertical">
          <Typography.Title level={4}>Button</Typography.Title>
          <Space>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
            <Button type="text">Text Button</Button>
            <Button type="link">Link Button</Button>
          </Space>
        </Space>
      )}
    </Space>
  );
};

export default DesignToken;
