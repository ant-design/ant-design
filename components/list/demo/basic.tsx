import React from 'react';
import { Avatar, ConfigProvider, List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

/**
 * TODO: List 包裹的 Spin 子组件导致了 List 自身带的 css var 注入被 Spin 覆盖的问题，
 * 需要在 components/list/index.tsx 给 Row or ul 添加一个 css var 注入，来解决这个问题
 */

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        List: {
          colorText: 'red',
        },
      },
    }}
  >
    <List
      itemLayout="horizontal"
      dataSource={data}
      // loading
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  </ConfigProvider>
);

export default App;
