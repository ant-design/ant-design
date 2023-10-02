import React from 'react';
import { Card, List } from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

const ListItem = () => (
  <List.Item>
    <Card title="title">Card content</Card>
  </List.Item>
);

const App: React.FC = () => (
  <>
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>Card content</Card>
        </List.Item>
      )}
    />
    <List grid={{ gutter: 16, column: 4 }} dataSource={data} renderItem={() => <ListItem />} />
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={() => (
        <>
          <ListItem />
          <div />
        </>
      )}
    />
  </>
);

export default App;
