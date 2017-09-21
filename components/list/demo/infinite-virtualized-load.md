---
order: 6
title:
  zh-CN: Virtualized 无限加载
  en-US: infinite VirtualizedExample load
---

## zh-CN

无限加载样例并且支持 Virtualized 样例。

## en-US

The example of infinite & virtualized load.

````jsx
import { List, message, Avatar } from 'antd';

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

class VirtualizedExample extends React.Component {
  state = {
    data: mockData(),
    loading: false,
  }
  handleInfiniteOnLoad = (done) => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 49) {
      message.warning('Loaded All');
      this.setState({
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
      done();
    }, 2000);
  }
  render() {
    return (
      <List
        rowKey={item => item.id}
        infinite={{
          onLoad: this.handleInfiniteOnLoad,
          loading: this.state.loading,
        }}
        virtualized={{
          itemHeight: 117,
        }}
        dataSource={this.state.data}
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

ReactDOM.render(<VirtualizedExample />, mountNode);
````
