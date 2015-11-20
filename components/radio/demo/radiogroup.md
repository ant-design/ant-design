# RadioGroup 组合

- order: 1

一组互斥的 Radio 配合使用。

---

````jsx
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

const App = React.createClass({
  getInitialState: function () {
    return {
      value: 'a'
    };
  },
  onChange(e) {
    console.log('radio checked:' + e.target.value);
    this.setState({
      value: e.target.value
    });
  },
  render() {
    return <div>
      <RadioGroup onChange={this.onChange} value={this.state.value}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio value="d">D</Radio>
      </RadioGroup>
      <div style={{marginTop: 20}}>你选中的: {this.state.value}</div>
    </div>;
  }
});
ReactDOM.render(<App />, document.getElementById('components-radio-demo-radiogroup'));
````
