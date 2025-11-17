import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
  gender?: string;
  name?: string;
  email?: string;
  avatar?: string;
  id?: string;
}

function mockFetch(page: number, limit: number): Promise<DataType[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: DataType[] = Array.from({ length: limit }, (_, index) => ({
        id: `${page}-${index}`,
        name: `User ${(page - 1) * limit + index + 1}`,
        email: `user${(page - 1) * limit + index + 1}@example.com`,
        gender: Math.random() > 0.5 ? 'male' : 'female',
      }));
      resolve(mockData);
    }, 1000);
  });
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    mockFetch(page, 10)
      .then((mockData) => {
        setData([...data, ...mockData]);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default App;
