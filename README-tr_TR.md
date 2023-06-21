<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

Kurumsal sınıf bir arayüz tasarım dili ve React arayüz kütüphanesi.

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
[issues-helper-image]: https://img.shields.io/badge/using-actions--cool-blue?style=flat-square
[issues-helper-url]: https://github.com/actions-cool
[renovate-image]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square
[renovate-dashboard-url]: https://github.com/ant-design/ant-design/issues/32498
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
[dumi-url]: https://github.com/umijs/dumi

</div>

[![](https://user-images.githubusercontent.com/507615/209472919-6f7e8561-be8c-4b0b-9976-eb3c692aa20a.png)](https://ant.design)

[English](./README.md) | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md) | [العربية](./README-ar_EG.md) | Türkçe

## ✨ Özellikler

- 🌈 Web uygulamaları için tasarlanmış kurumsal sınıf bir kullanıcı arayüzü.
- 📦 Kullanıma hazır yüksek kaliteli React bileşenleri
- 🛡 Öngörülebilir statik tiplerle TypeScript'te yazılmıştır.
- ⚙️ Dizayn kaynakları ve geliştirme araçlarının bütün paketi.
- 🌍 Düzinelerce dil için uluslararasılaştırma desteği.
- 🎨 CSS-in-JS tabanlı güçlü tema özelleştirmesi.

## 🖥 Ortam Desteği

- Modern tarayıcılar
- Server-side Rendering
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 Yükleme

```bash
npm install antd
```

```bash
yarn add antd
```

## 🔨 Kullanım

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

### TypeScript

`antd` TypeScript'te tam tanımlamalarıyla yazılmıştır, Başlamak için [Use in TypeScript](https://ant.design/docs/react/use-in-typescript) sayfasını ziyaret edin.

## 🌍 Uluslararasılaştırma

Düzinelerce dil `antd` tarafından desteklenmektedir, [i18n](https://ant.design/docs/react/i18n) sayfasını ziyaret edin.

## 🔗 Linkler

- [Ana sayfa](https://ant.design/)
- [Bileşenlere Genel Bakış](https://ant.design/components/overview)
- [Ant Design Pro](http://pro.ant.design/)
- [Değişim Günlüğü](CHANGELOG.en-US.md)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Mini Program UI](http://mini.ant.design)
- [Ant Design Pro Components](https://procomponents.ant.design)
- [Ant Design Charts](https://charts.ant.design)
- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
- [Ant Design Colors](https://github.com/ant-design/ant-design-colors)
- [Landing Pages](https://landing.ant.design)
- [Motion](https://motion.ant.design)
- [Scaffold Market](http://scaffold.ant.design)
- [Geliştirici Yönergesi](https://github.com/ant-design/ant-design/wiki/Development)
- [Sürüm Notları](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [SSS](https://ant.design/docs/react/faq)
- [CodeSandbox Template](https://u.ant.design/codesandbox-repro) bug raporlamak için
- [Tema Düzenleme](https://ant.design/docs/react/customize-theme)
- [Birlikte Çalışmak İçin Nasıl Başvuru Yapılır](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ Geliştirme

GitHub için ücretsiz çevrimiçi geliştirici ortamı Gitpod'u kullanın.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

veya yerele klonlayın:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

Tarayıcınızı açın ve http://127.0.0.1:8001 adresini ziyaret edin, daha fazlasını [Development](https://github.com/ant-design/ant-design/wiki/Development) sayfasında görebilirsiniz.

## 🤝 Katılım [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Katılım rehberimizi](https://ant.design/docs/react/contributing) okuyun ve daha iyi bir antd'yi beraber inşa edelim.

Her türlü katılımı hoş karşılıyoruz. Öncelikle lütfen bizim [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) dosyamızı okuyun. Herhangi bir fikrinizi [pull requests](https://github.com/ant-design/ant-design/pulls) veya [GitHub issues](https://github.com/ant-design/ant-design/issues) kısımlarından gönderebilirsiniz. Eğer kodu geliştirmek istiyorsanız [Development Instructions](https://github.com/ant-design/ant-design/wiki/Development) kısmından bilgi alabilirsiniz. İyi eğlenceler! :)

Eğer birlikte çalışıyorsanız [collaborator template](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md) ile Pull Request oluşturmak için lütfen [Pull Request principle](https://github.com/ant-design/ant-design/wiki/PR-principle) sayfamızı takip edin.

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ Sponsorlar and Destekçiler [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
