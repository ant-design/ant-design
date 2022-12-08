<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

엔터브라이즈급 UI 디자인 언어 그리고 React UI 라이브러리.

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![Total alerts][lgtm-image]][lgtm-url] [![][bundlephobia-image]][bundlephobia-url] [![][bundlesize-js-image]][unpkg-js-url] [![FOSSA Status][fossa-image]][fossa-url]

[![Follow Twitter][twitter-image]][twitter-url] [![Renovate status][renovate-image]][renovate-dashboard-url] [![][issues-helper-image]][issues-helper-url] [![Issues need help][help-wanted-image]][help-wanted-url]

[npm-image]: http://img.shields.io/npm/v/antd.svg?style=flat-square
[npm-url]: http://npmjs.org/package/antd
[github-action-image]: https://github.com/ant-design/ant-design/workflows/%E2%9C%85%20test/badge.svg
[github-action-url]: https://github.com/ant-design/ant-design/actions?query=workflow%3A%22%E2%9C%85+test%22
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master
[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square
[download-url]: https://npmjs.org/package/antd
[lgtm-image]: https://flat.badgen.net/lgtm/alerts/g/ant-design/ant-design
[lgtm-url]: https://lgtm.com/projects/g/ant-design/ant-design/alerts/
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fant-design%2Fant-design.svg?type=shield
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fant-design%2Fant-design?ref=badge_shield
[help-wanted-image]: https://flat.badgen.net/github/label-issues/ant-design/ant-design/help%20wanted/open
[help-wanted-url]: https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22
[twitter-image]: https://badgen.net/twitter/follow/antdesignui?style=flat-square
[twitter-url]: https://twitter.com/AntDesignUI
[bundlesize-js-image]: https://img.badgesize.io/https:/unpkg.com/antd/dist/antd.min.js?label=antd.min.js&compression=gzip&style=flat-square
[unpkg-js-url]: https://unpkg.com/browse/antd/dist/antd.min.js
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/antd?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/package/antd
[issues-helper-image]: https://img.shields.io/badge/using-issues--helper-orange?style=flat-square
[issues-helper-url]: https://github.com/actions-cool/issues-helper
[renovate-image]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square
[renovate-dashboard-url]: https://github.com/ant-design/ant-design/issues/32498

</div>

[![](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Yl83RJhUE7kAAAAAAAAAAABkARQnAQ)](https://ant.design)

[English](./README.md) | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | [Spanish](./README-sp_MX.md) | [日本語](./README-ja_JP.md) | 한국어

## ✨ 기능

- 🌈 웹 어플리케이션을 위한 엔터프라이즈급 UI 디자인.
- 📦 바로 사용할 수 있는 높은 품질의 React 컴포넌트.
- 🛡 TypeScript 로 작성되어 예측 가능한 타입.
- ⚙️ 디자인리소스와 개발 도구를 모두 포함한 구성.
- 🌍 수십가지 언어에 대한 국제화 지원.
- 🎨 모든 세부 요소에 대한 강력한 테마 커스터마이징.

## 🖥 지원 환경

- 최신 브라우저
- 서버 사이드 렌더링
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📦 설치

```bash
npm install antd
```

```bash
yarn add antd
```

## 🔨 사용법

```jsx
import { Button, DatePicker } from 'antd';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </>
);
```

### TypeScript

`antd` 는 TypeScript 로 작성되어 완벽한 타입 정의가 포함되어있습니다, [TypeScript 와 함께 사용하는 방법](https://ant.design/docs/react/use-in-typescript)을 읽고 시작하세요.

## 🌍 국제화

`antd`는 수십개의 언어를 지원합니다. [i18n](https://ant.design/docs/react/i18n)문서를 확인하세요.

## 🔗 링크

- [홈페이지](https://ant.design/)
- [컴포넌트 개요](https://ant.design/components/overview)
- [Ant Design Pro](http://pro.ant.design/)
- [변경사항](CHANGELOG.en-US.md)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Ant Design Pro Components](https://procomponents.ant.design)
- [Ant Design Charts](https://charts.ant.design)
- [Ant Design Icons](https://github.com/ant-design/ant-design-icons)
- [Ant Design Colors](https://github.com/ant-design/ant-design-colors)
- [Landing Pages](https://landing.ant.design)
- [Motion](https://motion.ant.design)
- [Scaffold Market](http://scaffold.ant.design)
- [개발자 지침](https://github.com/ant-design/ant-design/wiki/Development)
- [릴리즈 노트](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://ant.design/docs/react/faq)
- [CodeSandbox 템플릿](https://u.ant.design/codesandbox-repro) for bug reports
- [커스터마이징 테마](https://ant.design/docs/react/customize-theme)
- [콜라보레이터 신청 방법](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ 개발

Gitpod 는 GitHb을 위한 무료 온라인 개발환경입니다.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

혹은 로컬에서 clone:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

브라우저를 열고 http://127.0.0.1:8001 에 접속하세요, 관련 정보를 더 얻고 싶다면 [개발문서](https://github.com/ant-design/ant-design/wiki/Development)를 확인하세요.

## 🤝 기여 [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

우리의 [기여 가이드](https://ant.design/docs/react/contributing)를 읽고 더 나은 `antd`를 함께 만들어 봅시다.

우리는 모든 기여자를 환영합니다. 먼저 [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md)를 읽어주세요. 당신은 여러 아이디어를 [풀 리퀘스트](https://github.com/ant-design/ant-design/pulls)나 [GitHub 이슈](https://github.com/ant-design/ant-design/issues)를 통하여 제출할 수 있습니다. 만약 코드로 개선하는 것을 좋아한다면, [개발 지침](https://github.com/ant-design/ant-design/wiki/Development)을 확인해주세요. 즐겁게 `antd`에 기여길 바랍니다.

만약 당신이 콜라보레이터라면, [콜라보레이터 템플릿](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md)을 통한 풀 리퀘스트 생성시, [풀 리퀘스트 원칙](https://github.com/ant-design/ant-design/wiki/PR-principle)을 따라주세요.

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ 스폰서 및 후원자 [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
