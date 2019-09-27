---
category: Components
subtitle: 国际化（废弃）
cols: 1
type: 废弃
title: LocaleProvider
---

国际化组件。已废弃，请使用 [ConfigProvider](/components/config-provider) 代替。

## 使用

LocaleProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

```jsx
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
...

return <LocaleProvider locale={zh_CN}><App /></LocaleProvider>;
```

我们提供了英语，中文，俄语，法语，德语等多种语言支持，所有语言包可以在 [这里](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/) 找到。

注意：如果你需要使用 UMD 版的 dist 文件，应该引入 `antd/dist/antd-with-locales.js`，同时引入 moment 对应的 locale，然后按以下方式使用：

```jsx
const { LocaleProvider, locales } = window.antd;

...

return <LocaleProvider locale={locales.en_US}><App /></LocaleProvider>;
```

### 增加语言包

如果你找不到你需要的语言包，欢迎你在 [英文语言包](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/en_US.tsx) 的基础上创建一个新的语言包，并给我们 Pull Request。

### 其他国际化需求

本模块仅用于组件的内建文案，若有业务文案的国际化需求，建议使用 [react-intl](https://github.com/yahoo/react-intl)，可参考示例：[Intl demo 1](http://github.com/ant-design/intl-example) 和 [Intl demo 2](http://yiminghe.me/learning-react/examples/react-intl.html?locale=en-US)。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| locale | 语言包配置，语言包可到 [antd/es/locale-provider](http://unpkg.com/antd/es/locale-provider/) 目录下寻找 | object | - |  |

## FAQ

#### 为什么我使用了 LocaleProvider 还有问题？

请检查是否设置了 `moment.locale('zh-cn')`，或者是否有两个版本的 moment 共存。
