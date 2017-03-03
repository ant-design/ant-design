---
category: Components
subtitle: 国际化
cols: 1
type: Other
title: LocaleProvider
---

为组件内建文案提供统一的国际化支持。

## 使用

LocaleProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。


```jsx
import enUS from 'antd/lib/locale-provider/en_US';

...

return <LocaleProvider locale={enUS}><App /></LocaleProvider>;
```

我们提供了英语，中文，俄语，法语，德语等多种语言支持，所有语言包可以在 [这里](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/) 找到。

### 增加语言包

如果你找不到你需要的语言包，欢迎你在 [英文语言包](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/en_US.tsx) 的基础上创建一个新的语言包，并给我们 Pull Request。

### 其他国际化需求

本模块仅用于组件的内建文案，若有业务文案的国际化需求，建议使用 [react-intl](https://github.com/yahoo/react-intl)，可参考示例：[Intl demo 1](http://github.com/ant-design/intl-example) 和 [Intl demo 2](http://yiminghe.me/learning-react/examples/react-intl.html?locale=en-US)。

## API

| 参数    | 说明           | 类型              | 默认值        |
|--------|----------------|------------------|--------------|
| locale | 语言包配置，语言包可到 `antd/lib/locale-provider/` 目录下寻找 | object | - |
