# RadioGroup组合

- order: 1

RadioGroup 组合。

---

````jsx
var Radio = antd.Radio;
var RadioGroup = antd.RadioGroup;

var App = React.createClass({
  getInitialState: function () {
    return {
      selectedValue:"a"
    };
  },
  onChange(ev) {
    console.log('radio checked:' + ev.target.value);
    this.setState({
      selectedValue:ev.target.value
    })
  },
  render() {
    return<div>
      <RadioGroup onChange={this.onChange}>
        <Radio value="a" checked={true}>A</Radio>
        <Radio value="b" >B</Radio>
        <Radio value="c" >C</Radio>
        <Radio value="d" disabled={true}>D</Radio>
      </RadioGroup>
      你选中的:&nbsp;&nbsp;{this.state.selectedValue}
    </div>
  }
});
React.render(<App />, document.getElementById('components-radio-demo-radiogroup'));
````
