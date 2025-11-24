import React from 'react';
import { ArrowDownOutlined, MinusSquareOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Flex, Input, Radio, Tooltip } from 'antd';
import type { ConfigProviderProps } from 'antd';
import { FiColumns } from 'react-icons/fi';

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
      <Divider titlePlacement="start" plain>
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
            <Button icon={<SearchOutlined />} href="https://www.google.com" target="_blank" />
            <Button>
              <SearchOutlined />
              Search
            </Button>
          </Flex>
          <Divider plain> https://github.com/ant-design/ant-design/issues/51811 </Divider>
          <div>
            <Button>without icon</Button>
            <Button icon={<SearchOutlined />}>with icon</Button>
          </div>
          <Divider plain> https://github.com/ant-design/ant-design/issues/52124 </Divider>
          <div>
            <Button
              style={{
                height: 60,
              }}
            >
              without icon
            </Button>
            <Button
              icon={<SearchOutlined />}
              style={{
                height: 60,
              }}
            >
              with icon
            </Button>
          </div>
          <Divider plain> https://github.com/ant-design/ant-design/issues/51380 </Divider>
          <div>
            <Button size="large" icon={<FiColumns className="my-class-name" />} />
            <Button size="large" icon={<FiColumns />}>
              custom icon
            </Button>
            <Button icon={<SearchOutlined />} />
            <Button icon={<SearchOutlined />}>with icon</Button>
            <Button size="large">without icon</Button>
            <Input.Search style={{ width: 100 }} />
          </div>
          <Divider plain> https://github.com/ant-design/ant-design/issues/51380 </Divider>
          <Flex
            gap="small"
            style={{
              transform: 'scale(3)',
              transformOrigin: 'left top',
              marginBottom: 100,
            }}
          >
            <Button icon={<MinusSquareOutlined />} />
            <Button icon={<Icon12Size />} />
            <Button icon={<Icon16Size />} />
            <Button icon={<IconIrregularSize />} />
          </Flex>
        </Flex>
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: { Button: { paddingInline: 100, paddingInlineLG: 150, paddingInlineSM: 50 } },
        }}
      >
        <Divider plain> paddingInline / paddingInlineLG / paddingInlineSM </Divider>

        <p style={{ marginBottom: 12 }}>
          Icon-only button should not be affected by paddingInline / paddingInlineLG /
          paddingInlineSM
        </p>

        <Flex gap={8} style={{ marginBottom: 12 }}>
          <Button size="small" shape="default" icon={<ArrowDownOutlined />} />
          <Button size="small" shape="round" icon={<ArrowDownOutlined />} />
          <Button size="small" shape="circle" icon={<ArrowDownOutlined />} />
        </Flex>

        <Flex gap={8} style={{ marginBottom: 12 }}>
          <Button shape="default" icon={<ArrowDownOutlined />} />
          <Button shape="round" icon={<ArrowDownOutlined />} />
          <Button shape="circle" icon={<ArrowDownOutlined />} />
        </Flex>

        <Flex gap={8} style={{ marginBottom: 12 }}>
          <Button size="large" shape="default" icon={<ArrowDownOutlined />} />
          <Button size="large" shape="round" icon={<ArrowDownOutlined />} />
          <Button size="large" shape="circle" icon={<ArrowDownOutlined />} />
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default App;
