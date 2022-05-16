---
order: 2
title:
  zh-CN: 加载更多
  en-US: Load more
---

## zh-CN

可通过 `loadMore` 属性实现加载更多功能。

## en-US

Load more list with `loadMore` property.

```jsx
import React, { useEffect, useState } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

export default () => {
  const [state, setState] = useState({
    initLoading: true,
    loading: false,
    data: [],
  });

  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        setState({
          ...state,
          initLoading: false,
          data: res.results,
        });
      });
  }, []);

  useEffect(() => {
    // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
    // In real scene, you can using public method of react-virtualized:
    // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    window.dispatchEvent(new Event('resize'));
  }, [JSON.stringify(state.data)]);

  const onLoadMore = () => {
    setState({
      ...state,
      loading: true,
      data: state.data.concat(
        [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
      ),
    });
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        const data = state.data.concat(res.results);

        setState({
          ...state,
          data,
          loading: false,
        });
      });
  };

  const { initLoading, loading, data } = state;
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={data}
      renderItem={item => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
```

```css
.demo-loadmore-list {
  min-height: 350px;
}
```
