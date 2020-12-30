<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

Uma solução empresarial de design e biblioteca UI para React.

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url] [![Total alerts][lgtm-image]][lgtm-url] [![FOSSA Status][fossa-image]][fossa-url]

[![Follow Twitter][twitter-image]][twitter-url] [![Discussions][discussions-image]][discussions-url] [![Issues need help][help-wanted-image]][help-wanted-url]

[npm-image]: http://img.shields.io/npm/v/antd.svg?style=flat-square
[npm-url]: http://npmjs.org/package/antd
[github-action-image]: https://github.com/ant-design/ant-design/workflows/test/badge.svg
[github-action-url]: https://github.com/ant-design/ant-design/actions?query=workflow%3Atest
[codecov-image]: https://img.shields.io/codecov/c/github/ant-design/ant-design/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/ant-design/ant-design/branch/master
[david-image]: https://img.shields.io/david/ant-design/ant-design?style=flat-square
[david-dev-url]: https://david-dm.org/ant-design/ant-design?type=dev
[david-dev-image]: https://img.shields.io/david/dev/ant-design/ant-design?style=flat-square
[david-url]: https://david-dm.org/ant-design/ant-design
[download-image]: https://img.shields.io/npm/dm/antd.svg?style=flat-square
[download-url]: https://npmjs.org/package/antd
[lgtm-image]: https://flat.badgen.net/lgtm/alerts/g/ant-design/ant-design
[lgtm-url]: https://lgtm.com/projects/g/ant-design/ant-design/alerts/
[fossa-image]: https://app.fossa.io/api/projects/git%2Bgithub.com%2Fant-design%2Fant-design.svg?type=shield
[fossa-url]: https://app.fossa.io/projects/git%2Bgithub.com%2Fant-design%2Fant-design?ref=badge_shield
[help-wanted-image]: https://flat.badgen.net/github/label-issues/ant-design/ant-design/help%20wanted/open
[help-wanted-url]: https://github.com/ant-design/ant-design/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22
[twitter-image]: https://img.shields.io/twitter/follow/AntDesignUI.svg?label=Ant%20Design&style=social
[twitter-url]: https://twitter.com/AntDesignUI
[discussions-image]: https://img.shields.io/badge/discussions-on%20github-blue?style=flat-square
[discussions-url]: https://github.com/ant-design/ant-design/discussions

</div>

[![](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Yl83RJhUE7kAAAAAAAAAAABkARQnAQ)](https://ant.design)

[English](./README.md) | Português | [简体中文](./README-zh_CN.md)

## ✨ Funcionalidades

- 🌈 Design empresarial de interface para aplicações web.
- 📦 Um conjunto de alta qualidade, componentes React prontos para uso.
- 🛡 Escrito em TypeScript com tipos previsíveis.
- ⚙️ Pacote completo de recursos de design e ferramentas de desenvolvimento.
- 🌍 Suporte de internacionalização para dezenas de idiomas.
- 🎨 Personalização poderosa do tema em todos os detalhes.

## 🖥 Suporte aos ambientes

- Navegadores modernos e Internet Explorer 11 (com [polyfills](https://ant.design/docs/react/getting-started#Compatibility))
- Renderização no lado do servidor (server-side)
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --- | --- | --- | --- | --- | --- |
| IE11, Edge | últimas 2 versões | últimas 2 versões | últimas 2 versões | últimas 2 versões | últimas 2 versões |

## 📦 Instalação

```bash
npm install antd
```

```bash
yarn add antd
```

## 🔨 Uso

```jsx
import { Button, DatePicker } from 'antd';

const App = () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker />
  </>
);
```

Importe o estilo manualmente:

```jsx
import 'antd/dist/antd.css'; // ou 'antd/dist/antd.less'
```

### TypeScript

Veja [Uso no Typescript](https://ant.design/docs/react/use-in-typescript).

## 🌍 Internacionalização

Veja [i18n](https://ant.design/docs/react/i18n).

## 🔗 Links

- [Página inicial](https://ant.design/)
- [Componentes](https://ant.design/components/overview)
- [Ant Design Pro](http://pro.ant.design/)
- [Ant Design Charts](https://charts.ant.design)
- [Change Log](CHANGELOG.en-US.md)
- [rc-components](http://react-component.github.io/)
- [Mobile UI](http://mobile.ant.design)
- [Ant Design Icones](https://github.com/ant-design/ant-design-icons)
- [Ant Design Cores](https://github.com/ant-design/ant-design-colors)
- [Ant Design Pro Layout](https://github.com/ant-design/ant-design-pro-layout)
- [Ant Design Pro Blocks](https://github.com/ant-design/pro-blocks)
- [Tema escuro](https://github.com/ant-design/ant-design-dark-theme)
- [Página de aterrissagem](https://landing.ant.design)
- [Motion](https://motion.ant.design)
- [Mercado de páginas](http://scaffold.ant.design)
- [Instruções ao desenvolvedor](https://github.com/ant-design/ant-design/wiki/Development)
- [Versionando as notas de atualização](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://ant.design/docs/react/faq)
- [CodeSandbox Template](https://u.ant.design/codesandbox-repro) para relatório de erros
- [Awesome Ant Design](https://github.com/websemantics/awesome-ant-design)
- [Customize Theme](https://ant.design/docs/react/customize-theme)
- [How to Apply for Being A Collaborator](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ Desenvolvimento

Use Gitpod, um ambiente de desenvolvimento online para GitHub.

[![Abrir no Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

Ou clone localmente:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

Abra seu navegador e visite http://127.0.0.1:8001, veja mais em [Desenvolvimento](https://github.com/ant-design/ant-design/wiki/Development).

## 🤝 Contribuição [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Leia nosso [guia de contribução](https://ant.design/docs/react/contributing) e vamos contruir um melhor antd juntos.

Nós saudamos todas as contribuições. Por favor, leia nosso [CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) primeiro. Você pode submeter todas as ideias como [Pull Requests](https://github.com/ant-design/ant-design/pulls) ou como [GitHub issues](https://github.com/ant-design/ant-design/issues). Se você quiser melhorar o código, verifique [instruções ao desenvolvedor](https://github.com/ant-design/ant-design/wiki/Development) e divirta-se! :)

Se você é um colaborador, por favor siga nossa [Pull Request princípio](https://github.com/ant-design/ant-design/wiki/PR-principle) para criar um Pull Request através do [template do colaborador](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md).

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ Patrocionadores e Apoiadores [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
