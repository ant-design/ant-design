---
order: 3
title: 自定义渲染行数据
---

自定义渲染每一个 Transfer Item，可用于渲染复杂数据。

````jsx
import { Transfer, Icon } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      mockData: [],
      targetKeys: [],
    };
  },
  componentDidMount() {
    this.getMock();
  },
  getMock() {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: `内容${i + 1}`,
        description: `内容${i + 1}的描述`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  },
  handleChange(targetKeys, direction, moveKeys) {
    console.log(targetKeys, direction, moveKeys);
    this.setState({ targetKeys });
  },
  renderItem(item) {
    const customLabel = (
      <div className="custom-item" style={{ color: '#5FBC29' }}>
        <Icon type="apple" /> {item.title} - {item.description} <Icon type="android" />
      </div>
    );

    return {
      label: customLabel,  // for displayed item
      value: item.title,   // for title and filter matching
    };
  },
  render() {
    return (
      <Transfer
        dataSource={this.state.mockData}
        listStyle={{
          width: 300,
          height: 300,
        }}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={this.renderItem} />
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
