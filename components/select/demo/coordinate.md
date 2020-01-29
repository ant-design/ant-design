---
order: 7
title:
  zh-CN: 联动
  en-US: coordinate
---

## zh-CN

省市联动是典型的例子。

推荐使用 [Cascader](/components/cascader/) 组件。

## en-US

Coordinating the selection of provinces and cities is a common use case and demonstrates how selection can be coordinated.

Using the [Cascader](/components/cascader) component is strongly recommended instead as it is more flexible and capable.

```jsx
import { Select } from 'antd';

const { Option } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class App extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  };

  handleProvinceChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };

  onSecondCityChange = value => {
    this.setState({
      secondCity: value,
    });
  };

  render() {
    const { cities } = this.state;
    return (
      <div>
        <Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => (
            <Option key={province}>{province}</Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          value={this.state.secondCity}
          onChange={this.onSecondCityChange}
        >
          {cities.map(city => (
            <Option key={city}>{city}</Option>
          ))}
        </Select>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
