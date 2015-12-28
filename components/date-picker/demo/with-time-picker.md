# 日期时间选择二

- order: 4
- hidden: true

和 [时间选择框](/components/timepicer) 配合使用。

---

````jsx
import { DatePicker, TimePicker } from 'antd';

const DateTimePicker = React.createClass({
  handleChange(from, value) {
    this.result = this.result || new Date();
    if (!value) {
      if (from === 'date') {
        this.selectedDate = false;
      } else {
        this.selectedTime = false;
      }
      return;
    }
    if (from === 'date') {
      this.result.setFullYear(value.getFullYear());
      this.result.setMonth(value.getMonth());
      this.result.setDate(value.getDate());
      this.selectedDate = true;
    } else {
      this.result.setHours(value.getHours());
      this.result.setMinutes(value.getMinutes());
      this.result.setSeconds(value.getSeconds());
      this.selectedTime = true;
    }
    if (this.selectedDate && this.selectedTime) {
      this.props.onSelect(this.result);
    }
  },
  render() {
    return <div>
      <DatePicker onChange={this.handleChange.bind(null, 'date')} />
      <TimePicker onChange={this.handleChange.bind(null, 'time')} />
    </div>;
  }
});

function onSelect(value) {
  console.log('选择了时间：', value);
}

ReactDOM.render(<DateTimePicker onSelect={onSelect} />
, document.getElementById('components-date-picker-demo-with-time-picker'));
````
