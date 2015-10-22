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
      cities: cityData[provinceData[0]],
      secondCity:cityData[provinceData[0]][0]
    };
  },
  handleProvinceChange(value) {
    this.setState({
      cities: cityData[value],
      secondCity:cityData[value][0]
    });
  },
  onSecondCityChange(value) {
    this.setState({
      secondCity: value
    });
  },
  render() {
    var provinceOptions = provinceData.map(function(province) {
      return <Option key={province}>{province}</Option>;
    });
    var cityOptions = this.state.cities.map(function(city) {
      return <Option key={city}>{city}</Option>;
    });
    return <div>
      <Select defaultValue={provinceData[0]} style={{width:150}} onChange={this.handleProvinceChange}>
        {provinceOptions}
      </Select>
      <Select value={this.state.secondCity} style={{width:150}} onChange={this.onSecondCityChange}>
        {cityOptions}
      </Select>
    </div>;
  }
});
ReactDOM.render(<App />, document.getElementById('components-select-demo-coordinate'));
````

