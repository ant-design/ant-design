# 基本用法

- order: 0

最基本的用法。

---

````jsx
import { Transfer, Button } from 'antd';
const container = document.getElementById('components-transfer-demo-basic');

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
    let targetKeys = [];
    let mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i,
        title: '内容' + (i + 1),
        description: '内容' + (i + 1) + '的描述',
        chosen: Math.random() * 2 > 1
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({
      mockData: mockData,
      targetKeys: targetKeys,
    });
  },

  handleChange(targetKeys) {
    this.setState({
      targetKeys: targetKeys,
    });
  },

  renderFooter() {
    return <Button type="primary" size="small" style={{ float: 'right', margin: '5' }}
                   onClick={this.getMock}>刷新</Button>;
  },

  render() {
    return <div>
      <Transfer
        dataSource={this.state.mockData}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item) => { return item.title; }} />
    </div>;
  }
});

ReactDOM.render(<App />, container);
````
