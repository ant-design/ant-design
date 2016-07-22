---
category: Components
chinese: 国际化
cols: 1
type: Other
english: LocaleProvider
---

为组件内建文案提供统一的国际化支持。

## 使用

LocaleProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。


```jsx
import enUS from 'antd/lib/locale-provider/en_US';

...

return <LocaleProvider locale={enUS}><App /></LocaleProvider>;
```

### Add a language

We supply an English locale package. Other language users can create a locale package based on [en_US](https://github.com/ant-design/ant-design/blob/26b1f37392a278285aec6c573b99c6feea09e218/components/locale-provider/en_US.js) and send us a pull request.

### 其他国际化需求

本模块仅用于组件的内建文案，若有业务文案的国际化需求，建议使用 [react-intl](https://github.com/yahoo/react-intl)，可参考示例：[Intl demo 1](http://github.com/ant-design/intl-example) 和 [Intl demo 2](http://yiminghe.me/learning-react/examples/react-intl.html?locale=en-US)。

## API

| 参数    | 说明           | 类型              | 默认值        |
|--------|----------------|------------------|--------------|
| locale | 语言包配置，语言包可到 `antd/lib/locale-provider/` 目录下寻找 | Object | - |
