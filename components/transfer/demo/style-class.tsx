import React from 'react';
import { Flex, Space, Transfer } from 'antd';
import type { TransferProps } from 'antd';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const classNamesObject: TransferProps['classNames'] = {
  root: 'demo-transfer-root',
  section: 'demo-transfer-section',
  header: 'demo-transfer-header',
  actions: 'demo-transfer-actions',
};

const classNamesFn: TransferProps['classNames'] = (info) => {
  if (info.props.disabled) {
    return { root: 'demo-transfer-root--disabled' };
  }
  return { root: 'demo-transfer-root--enabled' };
};

const stylesObject: TransferProps['styles'] = {
  root: { borderWidth: 2, borderStyle: 'dashed', borderColor: '#d9d9d9' },
  section: { backgroundColor: '#fafafa' },
  header: { color: '#1677ff', fontWeight: 'bold' },
  actions: { backgroundColor: '#fff2e8' },
};

const stylesFn: TransferProps['styles'] = (info) => {
  if (info.props.showSearch) {
    return {
      root: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
      section: { backgroundColor: '#fcffe6' },
    };
  }
  return {
    root: { backgroundColor: '#fff1f0', borderColor: '#ffccc7' },
    section: { backgroundColor: '#fff2e8' },
  };
};

const App: React.FC = () => (
  <Space size={[16, 32]} wrap>
    <Flex vertical gap="large" style={{ width: '100%' }}>
      <div>
        <p>classNames Object</p>
        <Transfer
          dataSource={mockData}
          targetKeys={initialTargetKeys}
          classNames={classNamesObject}
          render={(item) => item.title}
        />
      </div>
      <div>
        <p>classNames Function (disabled)</p>
        <Transfer
          disabled
          dataSource={mockData}
          targetKeys={initialTargetKeys}
          classNames={classNamesFn}
          render={(item) => item.title}
        />
      </div>
    </Flex>
    <Flex vertical gap="large" style={{ width: '100%' }}>
      <div>
        <p>styles Object</p>
        <Transfer
          dataSource={mockData}
          targetKeys={initialTargetKeys}
          styles={stylesObject}
          render={(item) => item.title}
        />
      </div>
      <div>
        <p>styles Function (showSearch)</p>
        <Transfer
          showSearch
          dataSource={mockData}
          targetKeys={initialTargetKeys}
          styles={stylesFn}
          render={(item) => item.title}
        />
      </div>
    </Flex>
  </Space>
);

export default App;
