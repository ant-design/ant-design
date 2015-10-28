# 国际化

- order: 9

通过 `locale` 配置时区、语言等，[默认配置](https://github.com/ant-design/ant-design/issues/424)。

---

````jsx
import { Datepicker } from 'antd';

const App = React.createClass({
  getInitialState() {
    return {
      locale: {
        timezoneOffset: 0 * 60,
        firstDayOfWeek: 0,
        minimalDaysInFirstWeek: 1,
        lang: {
          today: 'Today',
          now: 'Now',
          ok: 'OK',
          clear: 'Clear'
        }
      }
    };
  },
  render() {
    return <Datepicker showTime={true} locale={this.state.locale} />;
  }
});

ReactDOM.render(<App />, document.getElementById('components-datepicker-demo-locale'));
````

