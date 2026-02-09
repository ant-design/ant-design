import React from 'react';
import { Avatar, ConfigProvider, List } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
];

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
