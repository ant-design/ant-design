---
order: 1
title:
  zh-CN: 国际化
  en-US: Localization
---

## zh-CN

用 `LocaleProvider` 包裹你的应用，并引用对应的语言包。

## en-US

Wrap your app with `LocaleProvider`, and apply the corresponding language package.

````jsx
import { Pagination, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const App = () => (
  <div>
    <Pagination defaultCurrent={1} total={50} showSizeChanger />
  </div>
);

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <App />
  </LocaleProvider>
, mountNode);
````
