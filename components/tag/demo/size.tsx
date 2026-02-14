import React, { useState } from 'react';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Radio, Tag } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const App: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <Flex vertical gap={8}>
      <Flex align="center">
        <Tag size="small">Small</Tag>
        <Tag size="middle">Middle</Tag>
        <Tag size="large">Large</Tag>
      </Flex>

      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="middle">Middle (default)</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>

      <ConfigProvider componentSize={size}>
        <Flex wrap gap="12px normal">
          <Tag bordered={false} color="processing">
            processing
          </Tag>
          <Tag color="success">success</Tag>
          <Tag color="error">error</Tag>
          <Tag bordered={false} color="warning">
            warning
          </Tag>

          <Tag icon={<YoutubeOutlined />} color="#cd201f">
            Youtube
          </Tag>
          <Tag icon={<FacebookOutlined />} color="#3b5999">
            Facebook
          </Tag>
          <Tag.CheckableTag checked={checked} onChange={(checked) => setChecked(checked)}>
            Checkable Tag
          </Tag.CheckableTag>
        </Flex>
      </ConfigProvider>
    </Flex>
  );
};

export default App;
