---
order: 7
title:
  zh-CN: 无限加载
  en-US: infinite load
---

## zh-CN

无限加载样例。

## en-US

The example of infinite load.

````jsx
import { List, message, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

let countId = 1;

function mockData() {
  const data = [];
  for (let i = 0; i < 10; i++) {
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
    if (data.length > 49) {
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
      <List>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={this.state.hasMore}
        >
          {this.state.data.map(item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.content}
              />
              <div style={{ padding: 24 }}>Content</div>
            </List.Item>
          ))}
        </InfiniteScroll>
      </List>
    );
  }
}

ReactDOM.render(<InfiniteListExample />, mountNode);
````
