---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

一个通用的日历面板，支持年/月切换。

## en-US

A basic calendar component with Year/Month switch.

````jsx
import { Calendar } from 'antd';

class Demo extends React.Component {
  state = {
    mode: 'month',
  }

  onPanelChange = (value, mode) => {
    this.setState({ mode });
  }

  render() {
    return (
      <Calendar onPanelChange={this.onPanelChange} mode={this.state.mode} />
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
````
