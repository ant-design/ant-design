# 带输入框的滑块

- order: 1

和 [数字输入框](/components/input-number/) 组件保持同步。

---

````jsx
var Slider = antd.Slider;
var InputNumber = antd.InputNumber;

var Test = React.createClass({
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

React.render(<Test />, document.getElementById('components-slider-demo-input-number'));
````
