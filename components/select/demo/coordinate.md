# 联动

- order: 6

省市联动是典型的例子。

---

````jsx
var Select = antd.Select;
var Option = Select.Option;

var provinceData = ['浙江', '江苏'];
var cityData = {
  '浙江': ['杭州', '宁波', '温州'],
  '江苏': ['南京', '苏州', '镇江']
};


var App = React.createClass({
  getInitialState() {
    return {
      cities: cityData[provinceData[0]]
    };
  },
  handleProvinceChange(value) {
    this.setState({
      cities: cityData[value]
    });
  },
  render() {
    var provinceOptions = provinceData.map(function(province) {
      return <Option value={province}>{province}</Option>;
    });
    var cityOptions = this.state.cities.map(function(city) {
      return <Option value={city}>{city}</Option>;
    });
    return <div>
      <Select defaultValue={provinceData[0]} style={{width:150}} onChange={this.handleProvinceChange}>
        {provinceOptions}
      </Select>
      &nbsp;
      <Select value={this.state.cities[0]} style={{width:150}} onChange={this.handleCityChange}>
        {cityOptions}
      </Select>
    </div>;
  }
});
React.render(<App />, document.getElementById('components-select-demo-coordinate'));
````

