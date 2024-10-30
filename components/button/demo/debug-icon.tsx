import React from 'react';
import { SearchOutlined, MinusSquareOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Flex, Radio, Tooltip } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

/**12px 图标 */
const Icon12Size = () => <div style={{ background: 'red', width: 12, height: 12 }} />;
/**16px 图标 */
const Icon16Size = () => <div style={{ background: 'green', width: 16, height: 16 }} />;
/**不规则宽高  */
const IconIrregularSize = () => <div style={{ background: 'blue', width: 14, height: 16 }} />;

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
          <Flex
            gap="small"
            style={{
              // https://github.com/ant-design/ant-design/issues/51380 // 视觉回归测试
              transform: 'scale(3)',
              transformOrigin: 'left top',
            }}
          >
            <Button icon={<MinusSquareOutlined />} />
            <Button icon={<Icon12Size />} />
            <Button icon={<Icon16Size />} />
            <Button icon={<IconIrregularSize />} />
          </Flex>
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default App;
