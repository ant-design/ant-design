import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from '@rc-component/virtual-list';

interface UserItem {
  email: string;
  gender: string;
  name: string;
  avatar: string;
}

const CONTAINER_HEIGHT = 400;
const PAGE_SIZE = 20;

const App: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);
  const [page, setPage] = useState(1);

  const appendData = (showMessage = true) => {
    const fakeDataUrl = `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users/?page=${page}&limit=${PAGE_SIZE}`;
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        const results = Array.isArray(body) ? body : [];
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
              avatar={<Avatar src={item.avatar} />}
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
