---
order: 7
title:
  zh-CN: 自定义全选文字
  en-US: Custom Select All Labels
---

## zh-CN

自定义穿梭框全选按钮的文字。

## en-US

Custom the labels for select all checkboxs.

```jsx
import { Transfer } from 'antd';

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

  render() {
    const selectAllLabels = ['Select All', (selected, all) => `${selected}/${all}`];

    return (
      <Transfer
        dataSource={this.state.mockData}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        render={item => item.title}
        selectAllLabels={selectAllLabels}
      />
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
