import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';

interface UserItem {
  email: string;
  gender: string;
  name: string;
  avatar?: string;
  id: string;
}

function mockFetch(page: number, limit: number): Promise<UserItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: UserItem[] = Array.from({ length: limit }, (_, index) => ({
        id: `${page}-${index}`,
        name: `User ${(page - 1) * limit + index + 1}`,
        email: `user${(page - 1) * limit + index + 1}@example.com`,
        gender: Math.random() > 0.5 ? 'male' : 'female',
      }));
      resolve(mockData);
    }, 1000);
  });
}

const CONTAINER_HEIGHT = 400;
const PAGE_SIZE = 20;

const App: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);

  const appendData = (showMessage = true) => {
    mockFetch(page, PAGE_SIZE).then((results) => {
      setData(data.concat(results));
      setPage(page + 1);
      showMessage && message.success(`${results.length} more items loaded!`);
    });
  };

  useEffect(() => {
    appendData(false);
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
    if (
      Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - CONTAINER_HEIGHT) <= 1
    ) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={CONTAINER_HEIGHT}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default App;
