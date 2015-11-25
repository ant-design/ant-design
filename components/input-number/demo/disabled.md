# 不可用

- order: 2

点击按钮切换可用状态。

---

````jsx
import { InputNumber, Button } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      disabled: true
    };
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} />
      <div style={{marginTop: 20}}>
        <Button onClick={this.toggle} type="primary">Toggle disabled</Button>
      </div>
    </div>;
  }
});

ReactDOM.render(<Test />, document.getElementById('components-input-number-demo-disabled'));
````
