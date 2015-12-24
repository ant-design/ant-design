# 高级用法

- order: 2

穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。

---

````jsx
import { Transfer, Button } from 'antd';
const container = document.getElementById('components-transfer-demo-advanced');

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

  renderFooter(props) {
    return <Button type="ghost" size="small" style={{ float: 'right', margin: '5' }}
                   onClick={this.getMock}>刷新</Button>;
  },

  render() {
    return <div>
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        height={200}
        width={200}
        operations={['向右操作文案', '向左操作文案']}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        render={(item) => { return item.title + '-' + item.description; }}
        footer={this.renderFooter}/>
    </div>;
  }
});

ReactDOM.render(<App />, container);
````
