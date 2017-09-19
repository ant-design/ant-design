---
order: 6
title:
  zh-CN: 无限加载
  en-US: infinite load
---

## zh-CN

无限加载样例，默认支持 virtualized。

## en-US

The example of infinite load.

````jsx
import { List, message, Avatar } from 'antd';

const InfiniteList = List.Infinite;

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
    hasMore: true,
    loading: false,
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 49) {
      this.setState({
        hasMore: false,
      });
      message.warning('Loaded All');
      return;
    }
    setTimeout(() => {
      data = data.concat(mockData());
      this.setState({
        data,
        loading: false,
      });
    }, 1000);
  }
  render() {
    return (
      <InfiniteList
        hasMore={this.state.hasMore}
        loading={this.state.loading}
        onLoad={this.handleInfiniteOnLoad}
        dataSource={this.state.data}
        height={500}
        itemHeight={117}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.content}
            />
            <div style={{ padding: 24 }}>Content</div>
          </List.Item>
        )}
      />
    );
  }
}

ReactDOM.render(<InfiniteListExample />, mountNode);
````
