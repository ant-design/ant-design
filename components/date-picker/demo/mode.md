---
order: 11
title:
  zh-CN: 受控面板
  en-US: Controlled Panels
---

## zh-CN

通过组合 `mode` 与 `onPanelChange` 控制要展示的面板。

## en-US

Determing which panel to show with `mode` and `onPanelChange`.

````jsx
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

class ControlledDatePicker extends React.Component {
  state = { mode: 'time' };

  handleOpenChange = (open) => {
    if (open) {
      this.setState({ mode: 'time' });
    }
  }

  handlePanelChange = (value, mode) => {
    this.setState({ mode });
  }

  render() {
    return (
      <DatePicker
        mode={this.state.mode}
        showTime
        onOpenChange={this.handleOpenChange}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

class ControlledRangePicker extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: [],
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }

  render() {
    const { value, mode } = this.state;
    return (
      <RangePicker
        placeholder={['Start month', 'End month']}
        format="YYYY-MM"
        value={value}
        mode={mode}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

ReactDOM.render(
  <div>
    <ControlledDatePicker />
    <br />
    <ControlledRangePicker />
  </div>
, mountNode);
````
