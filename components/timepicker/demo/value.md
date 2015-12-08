# 受控组件

- order: 6

value 和 onChange 需要配合使用。

---

````jsx
import { Timepicker } from 'antd';

const Test = React.createClass({
  getInitialState() {
    return {
      value: null,
    };
  },
  onChange(time) {
    time = time && time.toLocaleTimeString('zh-CN', {
      hour12: false
    });
    console.log(time);
    this.setState({ time });
  },
  render() {
    return <Timepicker value={this.state.value} onChange={this.onChange} />;
  }
});

ReactDOM.render(<Test />, document.getElementById('components-timepicker-demo-value'));
````
