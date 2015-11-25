# 带输入框的滑块

- order: 1

和 [数字输入框](/components/input-number/) 组件保持同步。

---

````jsx
import { Slider, InputNumber } from 'antd';

const IntegerStep = React.createClass({
  getInitialState() {
    return {
      inputValue: 1
    };
  },
  onChange(value) {
    this.setState({
      inputValue: value
    });
  },
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
        </div>
        <div className="col-4">
          <InputNumber min={1} max={20} style={{marginLeft: '16px'}}
            value={this.state.inputValue} onChange={this.onChange} />
        </div>
      </div>
    );
  }
});

const DecimalStep = React.createClass({
  getInitialState() {
    return {
      inputValue: 0
    };
  },
  onChange(value) {
    this.setState({
      inputValue: value
    });
  },
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <Slider min={0} max={1} onChange={this.onChange} value={this.state.inputValue} step={0.01} />
        </div>
        <div className="col-4">
          <InputNumber min={0} max={1} style={{marginLeft: '16px'}} step={0.01}
            value={this.state.inputValue} onChange={this.onChange} />
        </div>
      </div>
    );
  }
});

ReactDOM.render(<div>
  <IntegerStep />
  <DecimalStep />
</div>, document.getElementById('components-slider-demo-input-number'));
````
