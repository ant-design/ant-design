---
order: 7
title:
  zh-CN: 滚动加载无限长列表
  en-US: virtual list
---

## zh-CN

结合 [rc-virtual-list](https://github.com/react-component/virtual-list) 实现滚动加载无限长列表，能够提高数据量大时候长列表的性能。

## en-US

An example of infinite & virtualized list via using [rc-virtual-list](https://github.com/react-component/virtual-list).

```tsx
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const App: React.FC = () => {
  const [data, setData] = useState<UserItem[]>([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
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
```
