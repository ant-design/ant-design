---
order: 6
title: 联动
---

省市联动是典型的例子。

推荐使用 [Cascader](/components/cascader) 组件。

````jsx
import { Select } from 'antd';
const Option = Select.Option;

const provinceData = ['浙江', '江苏'];
const cityData = {
  浙江: ['杭州', '宁波', '温州'],
  江苏: ['南京', '苏州', '镇江'],
};

const App = React.createClass({
  getInitialState() {
    return {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
  },
  handleProvinceChange(value) {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  },
  onSecondCityChange(value) {
    this.setState({
      secondCity: value,
    });
  },
  render() {
    const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    const cityOptions = this.state.cities.map(city => <Option key={city}>{city}</Option>);
    return (
      <div>
        <Select defaultValue={provinceData[0]} style={{ width: 90 }} onChange={this.handleProvinceChange}>
          {provinceOptions}
        </Select>
        <Select value={this.state.secondCity} style={{ width: 90 }} onChange={this.onSecondCityChange}>
          {cityOptions}
        </Select>
      </div>
    );
  },
});
ReactDOM.render(<App />, mountNode);
````
