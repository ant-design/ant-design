# 带输入框的滑块

- order: 1



---

````jsx
var Slider = antd.Slider;
var InputNumber = antd.InputNumber;

var Test = React.createClass({
  getInitialState() {
    return {
      inputValue: 0
    };
  },
  onChange(v){
    this.setState({
      inputValue: v
    });
  },
  render() {
  	return (
  	  <div className="row">
  	  	<div className="col-12 spacing">
					<Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue}/>
				</div>
  	  	<div className="col-6">
					<InputNumber min={1} max={20} value={this.state.inputValue} onChange={this.onChange} />
				</div>
	  	</div>
  	);
  }
});

React.render(<Test />, document.getElementById('components-slider-demo-input-number-slider'));
````

<style>
	.spacing {
		padding-right: 16px;
	}
</style>
