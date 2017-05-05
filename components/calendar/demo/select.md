---
order: 3
title:
  zh-CN: 选择功能
  en-US: Selectable Calendar
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

````jsx
import { Calendar, Alert } from 'antd';
import moment from 'moment';

class App extends React.Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  }
  onSelect = (value) => {
    this.setState({
      value,
      selectedValue: value,
    });
  }
  onPanelChange = (value) => {
    this.setState({ value });
  }
  render() {
    const { value, selectedValue } = this.state;
    return (
      <div>
        <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
        <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
