# 从浮层内关闭

- order: 3

使用 `visible` 属性控制浮层显示。

---

````jsx
import { Popover, Button } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      visible: false
    };
  },
  hide() {
    this.setState({
      visible: false
    });
  },
  handleVisibleChange(visible) {
    this.setState({ visible });
  },
  render() {
    const content = <div>
      <a onClick={this.hide}>关闭卡片</a>
    </div>;
    return <Popover overlay={content} title="标题" trigger="click"
      visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
      <Button type="primary">点击弹出卡片</Button>
    </Popover>;
  }
});

ReactDOM.render(<App />, document.getElementById('components-popover-demo-control'));
````
