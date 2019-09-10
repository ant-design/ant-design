---
category: Components
type: Deprecated
cols: 1
title: LocaleProvider (Deprecated)
---

`LocaleProvider` component. Deprecated, please use [ConfigProvider](/components/config-provider) instead.

## Usage

`LocaleProvider` makes use of [context](https://facebook.github.io/react/docs/context.html), a feature of React, to accomplish global effectiveness by wrapping the app only once.

```jsx
import { LocaleProvider } from 'antd';
import fr_FR from 'antd/es/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/fr';

moment.locale('fr');
...

return <LocaleProvider locale={fr_FR}><App /></LocaleProvider>;
```

We provide some locales like English, Chinese, Russian, German, French etc. All locale packages can be found in [here](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/).

Note: if you need to use antd's UMD dist file, please use `antd/dist/antd-with-locales.js` and corresponding moment locale:

```jsx
const { LocaleProvider, locales } = window.antd;

...

return <LocaleProvider locale={locales.fr_FR}><App /></LocaleProvider>;
```

### Add a new language

If you can't find your language, you are welcome to create a locale package based on [en_US](https://github.com/ant-design/ant-design/blob/master/components/locale-provider/en_US.tsx) and send us a pull request.

### Other localization needs

This component aims to provide localization of the built-in text. If you want to support other documents, we recommend using [react-intl](https://github.com/yahoo/react-intl), refer to [Intl demo 1](http://github.com/ant-design/intl-example) and [Intl demo 2](http://yiminghe.me/learning-react/examples/react-intl.html?locale=en-US).

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| locale | language package setting, you can find the packages in [antd/es/locale-provider](http://unpkg.com/antd/es/locale-provider/) | object | - |  |

## FAQ

#### Locale problem is still existed even LocaleProvider is used?

Please make sure you set moment locale by `moment.locale('zh-cn')`, or you don't have two moment of different version.
