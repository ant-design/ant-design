<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

エンタープライズクラスの UI 設計言語と React UI ライブラリです。

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

[English](./README.md) | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | [Spanish](./README-sp_MX.md) | 日本語 | [العربية](./README-ar_EG.md)

## ✨ 機能

- 🌈 ウェブアプリケーション用に設計されたエンタープライズクラスの UI。
- 📦 高品質な React コンポーネントのセットが箱から出されます。
- 🛡 TypeScript で書かれており、予測可能な静的型がある。
- ⚙️ デザインリソースと開発ツールの全体的なパッケージ。
- 🌍 数十の言語に対応した国際化サポート。
- 🎨 強力なテーマのカスタマイズを細部にわたって実現。

## 🖥 環境対応

- モダンブラウザ
- サーバーサイド レンダリング
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | 直近の 2 バージョン | 直近の 2 バージョン | 直近の 2 バージョン | 直近の 2 バージョン |

## 📦 インストール

```bash
npm install antd
```

```bash
yarn add antd
```

## 🔨 使い方

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

`antd` は TypeScript で書かれており、完全な定義がなされています。まずは [TypeScript で使う](https://ant.design/docs/react/use-in-typescript)をチェックしてください。

## 🌍 国際化対応

数十の言語が `antd` でサポートされています。[i18n](https://ant.design/docs/react/i18n) を参照してください。

## 🔗 リンク

- [ホームページ](https://ant.design/)
- [コンポーネントの概要](https://ant.design/components/overview)
- [Ant Design Pro](http://pro.ant.design/)
- [変更ログ](CHANGELOG.en-US.md)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Mini Program UI](http://mini.ant.design)
- [Ant Design Pro コンポーネント](https://procomponents.ant.design)
- [Ant Design チャート](https://charts.ant.design)
- [Ant Design アイコン](https://github.com/ant-design/ant-design-icons)
- [Ant Design カラー](https://github.com/ant-design/ant-design-colors)
- [ランディングページ](https://landing.ant.design)
- [動作](https://motion.ant.design)
- [足場マーケット](http://scaffold.ant.design)
- [開発者向けインストラクション](https://github.com/ant-design/ant-design/wiki/Development)
- [バージョン管理リリースノート](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://ant.design/docs/react/faq)
- バグレポート用の [CodeSandbox テンプレート](https://u.ant.design/codesandbox-repro)
- [テーマのカスタマイズ](https://ant.design/docs/react/customize-theme)
- [コラボレーターへの応募方法](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ 開発

GitHub の無料オンライン開発環境である Gitpod を利用する。

[![Gitpod で開く](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

またはローカルにクローンする:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

ブラウザを起動し、http://127.0.0.1:8001 にアクセスして[開発セクション](https://github.com/ant-design/ant-design/wiki/Development)の続きをもっと見る.

## 🤝 貢献 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[貢献ガイド](https://ant.design/docs/react/contributing)を読んで、よりよい antd を一緒の作り上げましょう。

すべての貢献に感謝します。まずは [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) をお読みください. どんなアイデアも [Pull Request](https://github.com/ant-design/ant-design/pulls) や [GitHub issues](https://github.com/ant-design/ant-design/issues) で応募することができます. コードの改良をしたい方は、[開発手順](https://github.com/ant-design/ant-design/wiki/Development) を確認してください。あとは楽しみましょう! :)

コラボレーターの方は、[コラボレーター テンプレート](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md)を使い、Pull Request を作成するための[プルリクエストの原則](https://github.com/ant-design/ant-design/wiki/PR-principle)に従ってください。

[![このレポジトリの課題に資金を提供しよう](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ スポンサーと後援者 [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
