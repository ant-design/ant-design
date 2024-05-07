import React from 'react';
import { SearchOutlined, AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Flex, Radio, Tooltip } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const App: React.FC = () => {
  const [size, setSize] = React.useState<SizeType>('large');
  return (
    <>
      <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <Divider orientation="left" plain>
        Preview
      </Divider>
      <Flex gap="small" vertical>
        <ConfigProvider componentSize={size}>
          <Flex gap="small" vertical>
            <Flex gap="small" wrap>
              <Tooltip title="search">
                <Button type="primary" shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button type="primary" shape="circle">
                A
              </Button>
              <Button type="primary" icon={<SearchOutlined />}>
                Search
              </Button>
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />}>Search</Button>
            </Flex>
            <Flex gap="small" wrap>
              <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button icon={<SearchOutlined />}>Search</Button>
              <Tooltip title="search">
                <Button type="dashed" shape="circle" icon={<SearchOutlined />} />
              </Tooltip>
              <Button type="dashed" icon={<SearchOutlined />}>
                Search
              </Button>
              <Button icon={<SearchOutlined />} href="https://www.google.com" />
              <Button>
                <SearchOutlined />
                Search
              </Button>
            </Flex>
          </Flex>
        </ConfigProvider>
        <ConfigProvider direction="rtl" componentSize={size}>
          <Flex gap="small" wrap>
            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
            <Button type="primary" shape="circle">
              A
            </Button>
            <Button type="primary" shape="circle" loading />
            <Button type="primary" icon={<SearchOutlined />} loading>
              Search
            </Button>
            <Button type="primary" icon={<SearchOutlined />} loading>
              <AntDesignOutlined />
              Search
            </Button>
          </Flex>
        </ConfigProvider>
      </Flex>
    </>
  );
};

export default App;
