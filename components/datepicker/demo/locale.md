# 国际化

- order: 9

通过 `locale` 配置时区、语言等, 默认支持 en_US, zh_CN

---

````jsx
import { Datepicker } from 'antd';
import enUS from 'antd/lib/datepicker/locale/en_US';

function assign(target, source) {
  for(var s in source) {
    target[s] = source[s];
  }
  return target;
}

const App = React.createClass({
  getInitialState() {
    return {
      locale: assign({
        timezoneOffset: 0 * 60,
        firstDayOfWeek: 0,
        minimalDaysInFirstWeek: 1
      }, enUS)
    };
  },
  render() {
    return <Datepicker showTime={true} locale={this.state.locale} />;
  }
});

ReactDOM.render(<App />, document.getElementById('components-datepicker-demo-locale'));
````

