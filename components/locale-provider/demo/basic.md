# 国际化

- order: 1

用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。

---

````jsx
import { Pagination, DatePicker, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

const App = React.createClass({
  render() {
    return (
      <div>
        <DatePicker />
        <Pagination defaultCurrent={1} total={50} showSizeChanger />
      </div>
    );
  }
});

ReactDOM.render(
  <LocaleProvider locale={enUS}>
    <App />
  </LocaleProvider>
, mountNode);
````
