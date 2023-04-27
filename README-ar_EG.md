<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

لغة تصميم واجهة المستخدم على مستوى المؤسسات ومكتبة React UI.

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![][bundlephobia-image]][bundlephobia-url] [![][bundlesize-js-image]][unpkg-js-url] [![FOSSA Status][fossa-image]][fossa-url]

[![Follow Twitter][twitter-image]][twitter-url] [![Renovate status][renovate-image]][renovate-dashboard-url] [![][issues-helper-image]][issues-helper-url] [![dumi][dumi-image]][dumi-url] [![Issues need help][help-wanted-image]][help-wanted-url]

[npm-image]: http://img.shields.io/npm/v/antd.svg?style=flat-square
[npm-url]: http://npmjs.org/package/antd
[github-action-image]: https://github.com/ant-design/ant-design/workflows/%E2%9C%85%20test/badge.svg
[github-action-url]: https://github.com/ant-design/ant-design/actions?query=workflow%3A%22%E2%9C%85+test%22
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master
[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square
[download-url]: https://npmjs.org/package/antd
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fant-design%2Fant-design.svg?type=shield
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fant-design%2Fant-design?ref=badge_shield
[help-wanted-image]: https://flat.badgen.net/github/label-issues/ant-design/ant-design/help%20wanted/open
[help-wanted-url]: https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22
[twitter-image]: https://img.shields.io/twitter/follow/AntDesignUI.svg?label=Ant%20Design
[twitter-url]: https://twitter.com/AntDesignUI
[bundlesize-js-image]: https://img.badgesize.io/https:/unpkg.com/antd/dist/antd.min.js?label=antd.min.js&compression=gzip&style=flat-square
[unpkg-js-url]: https://unpkg.com/browse/antd/dist/antd.min.js
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/antd?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/antd
[issues-helper-image]: https://img.shields.io/badge/using-issues--helper-orange?style=flat-square
[issues-helper-url]: https://github.com/actions-cool/issues-helper
[renovate-image]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square
[renovate-dashboard-url]: https://github.com/ant-design/ant-design/issues/32498
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

</div>

[![](https://user-images.githubusercontent.com/507615/209472919-6f7e8561-be8c-4b0b-9976-eb3c692aa20a.png)](https://ant.design)

[English](./README.md) | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md) | العربية

## ✨ الميزات

- 🌈 واجهة مستخدم من فئة المؤسسات مصممة لتطبيقات الويب.
- 📦 مجموعة من مكونات React عالية الجودة خارج الصندوق.
- 🛡 مكتوب في TypeScript بأنواع ثابتة يمكن التنبؤ بها.
- ⚙️ مجموعة كاملة من موارد التصميم وأدوات التطوير.
- 🌍 دعم التدويل لعشرات اللغات.
- 🎨 تخصيص موضوع قوي على أساس CSS-in-JS.

## 🖥 دعم البيئة البرمجية

- المتصفحات الحديثة
- التقديم من جانب الخادم
- [إلكترون](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 التثبيت

```bash
npm install antd
```

```bash
yarn add antd
```

## 🔨 الاستخدام

```jsx
import React from 'react';
import { Button, DatePicker } from 'antd';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </>
);
```

### كتابة السكربيت

الخاصية `antd` مكتوبة في TypeScript مع تعريفات كاملة ، تحقق [Use in TypeScript](https://ant.design/docs/react/use-in-typescript) للبدء.

## 🌍 التدويل

يتم دعم عشرات اللغات في`antd`, انظر [i18n](https://ant.design/docs/react/i18n).

## 🔗 الروابط

- [الصفحة الرئيسية](https://ant.design/)
- [نظرة عامة على المكونات](https://ant.design/components/overview)
- [برنامج Ant Design Pro](https://pro.ant.design/)
- [تغير الدخول](CHANGELOG.en-US.md)
- [مكونات](https://react-component.github.io/)
- [موبايل UI](https://mobile.ant.design)
- [برنامج صغير UI](https://mini.ant.design)
- [مكونات Ant Design Pro](https://procomponents.ant.design)
- [رسوم بيانية Ant Design](https://charts.ant.design)
- [أيقونات Ant Design](https://github.com/ant-design/ant-design-icons)
- [ألوان Ant Design](https://github.com/ant-design/ant-design-colors)
- [صفحة لاند](https://landing.ant.design)
- [حركة](https://motion.ant.design)
- [سوق Scaffold](https://scaffold.ant.design)
- [تعليمات المطورين](https://github.com/ant-design/ant-design/wiki/Development)
- [إعداد نسخ الاصدارات](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [أسئلة مكرة](https://ant.design/docs/react/faq)
- [قالب CodeSandbox](https://u.ant.design/codesandbox-repro)
- [تخصيص ثيم](https://ant.design/docs/react/customize-theme)
- [كيفية التقدم بطلب المشاركة كمتعاون](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ التطوير

استخدم Gitpod, بيئة تطوير مجانية عبر الإنترنت لـ GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

أو انسخه محلياً:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

افتح متصفحك وقم بزيارة http://127.0.0.1:8001 , شاهد المزيد [Development](https://github.com/ant-design/ant-design/wiki/Development).

## 🤝 المساهمة [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

أقرأ [دليل المساهمة](https://ant.design/docs/react/contributing) ودعونا نبني معاً الأفضل.

نرحب بجميع المساهمات. يرجى قراءة [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) أولاً. يمكنك تقديم أي أفكار [pull requests](https://github.com/ant-design/ant-design/pulls) أو [GitHub issues](https://github.com/ant-design/ant-design/issues). إذا كنت ترغب في تحسين التعليمات البرمجية ، تحقق من [Development Instructions](https://github.com/ant-design/ant-design/wiki/Development) وأتمنى لك وقتاً ممتعاً! :)

إذا كنت مساهماً ، فيرجى اتباع [Pull Request principle](https://github.com/ant-design/ant-design/wiki/PR-principle) لإنشاء طلب مساهمة مع [collaborator template](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md).

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ الرعاة والداعمون [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
