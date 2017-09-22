---
order: 7
title:
  zh-CN: 无限加载
  en-US: infinite load
---

## zh-CN

结合 [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller) 实现无限加载。

## en-US

The example of infinite load with [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller).

````jsx
import { List, message, Avatar, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

let countId = 1;

function mockData() {
  const data = [];
  for (let i = 0; i < 5; i++) {
    const id = countId;
    data.push({
      id: `id-${id}`,
      title: `List Item Title ${id}`,
      content: `List Item Content ${id}`,
    });
    countId++;
  }
  return data;
}

class InfiniteListExample extends React.Component {
  state = {
    data: mockData(),
    loading: false,
    hasMore: true,
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 19) {
      message.warning('Loaded All');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    setTimeout(() => {
      data = data.concat(mockData());
      this.setState({
        data,
        loading: false,
      });
    }, 2000);
  }
  render() {
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.handleInfiniteOnLoad}
        hasMore={!this.state.loading && this.state.hasMore}
      >
        <List
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
              <div style={{ padding: 24 }}>Content</div>
            </List.Item>
          )}
        >
          {this.state.loading && this.state.hasMore && <Spin style={{ position: 'absolute', bottom: 0, left: '50%' }} />}
        </List>
      </InfiniteScroll>
    );
  }
}

ReactDOM.render(<InfiniteListExample />, mountNode);
````
