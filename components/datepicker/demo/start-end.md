# 开始结束时间约束

- order: 7

设置 `disabledDate` 方法，来约束开始和结束时间的选择。

---

````jsx
var Datepicker = antd.Datepicker;

var Test = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null
    };
  },

  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  },

  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  },

  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  },

  render() {
    var state = this.state;
    return <div style={{width: 240, margin: 20}}>
      <p>
        开始时间：
        <Datepicker disabledDate={this.disabledStartDate} value={state.startValue}
                onChange={this.onChange.bind(this,'startValue')}/>
      </p>

      <p>
        结束时间：
        <Datepicker disabledDate={this.disabledEndDate} value={state.endValue}
                onChange={this.onChange.bind(this,'endValue')}/>
      </p>
    </div>;
  }
});

ReactDOM.render(
  <Test />
, document.getElementById('components-datepicker-demo-range'));
````
