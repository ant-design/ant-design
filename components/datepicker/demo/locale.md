# 国际化

- order: 9

通过 `locale` 配置时区、语言等。

---

````jsx
var Datepicker = antd.Datepicker;

var App = React.createClass({
  getInitialState() {
    return {
      locale: {
        timezoneOffset: 0 * 60,
        firstDayOfWeek: 0,
        minimalDaysInFirstWeek: 1,
        lang: {
          today: 'Today',
          now: 'Now',
          ok: 'Ok'
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

