---
order: 2
title:
  zh-CN: 高级用法
  en-US: Advanced
---

## zh-CN

穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。

## en-US

Advanced Usage of Transfer.

You can customize the labels of the transfer buttons, the width and height of the columns, and what should be displayed in the footer.

```jsx
import { Transfer, Button } from 'antd';

class App extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    this.getMock();
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  renderFooter = () => ({
    source: (
      <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
        reload
      </Button>
    ),
  });

  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        listStyle={{
          width: 250,
          height: 300,
        }}
        operations={['to right', 'to left']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={item => `${item.title}-${item.description}`}
        footer={this.renderFooter}
      />
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
