# 国际化

- order: 10

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { DatePicker } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
import assign from 'object-assign';

const App = React.createClass({
  getInitialState() {
    return {
      locale: assign({}, enUS, {
        timezoneOffset: 0 * 60,
        firstDayOfWeek: 0,
        minimalDaysInFirstWeek: 1,
      })
    };
  },
  render() {
    return <DatePicker locale={this.state.locale} />;
  }
});

ReactDOM.render(<App />, document.getElementById('components-date-picker-demo-locale'));
````

