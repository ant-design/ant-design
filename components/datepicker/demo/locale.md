# 国际化

- order: 9

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Datepicker } from 'antd';
import enUS from 'antd/lib/datepicker/locale/en_US';
import assign from 'object-assign'

const App = React.createClass({
  getInitialState() {
    return {
      locale: assign({}, enUS, {
        timezoneOffset: 0 * 60,
        firstDayOfWeek: 0,
        minimalDaysInFirstWeek: 1
      })
    };
  },
  render() {
    return <Datepicker showTime={true} locale={this.state.locale} />;
  }
});

ReactDOM.render(<App />, document.getElementById('components-datepicker-demo-locale'));
````

