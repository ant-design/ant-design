---
order: 2
title:
  zh-CN: Radio.Group 组合 - 配置方式
  en-US: Radio.Group group - optional
---

## zh-CN

通过配置 `options` 参数来渲染单选框。也可通过 `optionType` 参数来设置 Radio 类型。

## en-US

Render radios by configuring `options`. Radio type can also be set through the `optionType` parameter.

```jsx
import { Radio } from '@allenai/varnish';

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: true },
];

class App extends React.Component {
  state = {
    value1: 'Apple',
    value2: 'Apple',
    value3: 'Apple',
    value4: 'Apple',
  };

  onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value,
    });
  };

  onChange2 = e => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      value2: e.target.value,
    });
  };

  onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value,
    });
  };

  onChange4 = e => {
    console.log('radio4 checked', e.target.value);
    this.setState({
      value4: e.target.value,
    });
  };

  render() {
    const { value1, value2, value3, value4 } = this.state;
    return (
      <>
        <Radio.Group options={plainOptions} onChange={this.onChange1} value={value1} />
        <br />
        <Radio.Group options={optionsWithDisabled} onChange={this.onChange2} value={value2} />
        <br />
        <br />
        <Radio.Group
          options={options}
          onChange={this.onChange3}
          value={value3}
          optionType="button"
        />
        <br />
        <br />
        <Radio.Group
          options={optionsWithDisabled}
          onChange={this.onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
        />
      </>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```
