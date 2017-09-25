---
order: 7
title:
  zh-CN: 滚动加载
  en-US: Scrolling loaded List
---

## zh-CN

结合 [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller) 实现滚动自动加载列表。

## en-US

The example of infinite load with [react-infinite-scroller](https://github.com/CassetteRocks/react-infinite-scroller).

````jsx
import { List, message, Avatar, Spin } from 'antd';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomapi.com/api/dleyg4om?key=Z51U-D9OX-SXIO-SLJ9&fmt=raw&sole';

class InfiniteListExample extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  componentWillMount() {
    this.getData((res) => {
      this.setState({
        data: res,
      });
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res);
      this.setState({
        data,
        loading: false,
      });
    });
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