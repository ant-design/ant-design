<p align="center">
  <a href="https://ant.design">
    <img width="200" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg">
  </a>
</p>

<h1 align="center">Ant Design</h1>

<div align="center">

Un lenguaje de diseño de interfaz de usuario de clase empresarial y una biblioteca de interfaz de usuario React.

[![CI status][github-action-image]][github-action-url] [![codecov][codecov-image]][codecov-url] [![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![Renovate status][renovate-image]][renovate-dashboard-url] [![Total alerts][lgtm-image]][lgtm-url] [![][bundlesize-js-image]][unpkg-js-url] [![][bundlesize-css-image]][unpkg-css-url]

[![Follow Twitter][twitter-image]][twitter-url] [![FOSSA Status][fossa-image]][fossa-url] [![Discussions][discussions-image]][discussions-url] [![][issues-helper-image]][issues-helper-url] [![Issues need help][help-wanted-image]][help-wanted-url]

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
[twitter-image]: https://img.shields.io/twitter/follow/AntDesignUI.svg?label=Ant%20Design&style=social
[twitter-url]: https://twitter.com/AntDesignUI
[discussions-image]: https://img.shields.io/badge/discussions-on%20github-blue?style=flat-square
[discussions-url]: https://github.com/ant-design/ant-design/discussions
[bundlesize-js-image]: https://img.badgesize.io/https:/unpkg.com/antd/dist/antd.min.js?label=antd.min.js&compression=gzip&style=flat-square
[bundlesize-css-image]: https://img.badgesize.io/https:/unpkg.com/antd/dist/antd.min.css?label=antd.min.css&compression=gzip&style=flat-square
[unpkg-js-url]: https://unpkg.com/browse/antd/dist/antd.min.js
[unpkg-css-url]: https://unpkg.com/browse/antd/dist/antd.min.css
[issues-helper-image]: https://img.shields.io/badge/using-issues--helper-orange?style=flat-square
[issues-helper-url]: https://github.com/actions-cool/issues-helper
[renovate-image]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?style=flat-square
[renovate-dashboard-url]: https://github.com/ant-design/ant-design/issues/32498

</div>

[![](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*Yl83RJhUE7kAAAAAAAAAAABkARQnAQ)](https://ant.design)

[English](./README.md) | [Português](./README-pt_BR.md) | [简体中文](./README-zh_CN.md) | [Українською](./README-uk_UA.md) | Spanish | [日本語](./README-ja_JP.md)

## ✨ Características

- 🌈 Interfaz de usuario de clase empresarial diseñada para aplicaciones de web
- 📦 Un conjunto de componentes React de alta calidad listos para usar.
- 🛡 Escrito en TypeScript con tipos estáticos predecibles.
- ⚙️ Paquete completo de recursos de diseño y herramientas de desarrollo.
- 🌍 Soporte de internacionalización para decenas de idiomas.
- 🎨 Potente personalización del tema en cada detalle.

## 🖥 Entornos soportados

- Navegadores modernos y Internet Explorer 11 (con [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- Representación del lado del servidor
- [Electron](https://www.electronjs.org/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| IE11, Edge | últimas 2 versiones | últimas 2 versiones | últimas 2 versiones | últimas 2 versiones |

## 📦 Instalar 

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
    <DatePicker placeholder="select date" />
  </>
);
```

Y importar el estilo manualmente:

```jsx
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

### TypeScript

`antd` está escrito en TypeScript con definiciones completas, ver Usar en TypeScript [Usar en TypeScript](https://ant.design/docs/react/use-in-typescript) para comenzar.

## 🌍 Internacionalización

Docenas de idiomas compatibles en `antd`, ver [i18n](https://ant.design/docs/react/i18n).

## 🔗 Enlaces

- [Página de Inicio](https://ant.design/)
- [Descripción General de los Componentes](https://ant.design/components/overview)
- [Ant Design Pro](http://pro.ant.design/)
- [Cambio de Registro](CHANGELOG.en-US.md)
- [componentes-rc](http://react-component.github.io/)
- [Interfaz de Usuario Móvil](http://mobile.ant.design)
- [Componentes Ant Design Pro](https://procomponents.ant.design)
- [Gráficos de Diseño de Ant Design](https://charts.ant.design)
- [Iconos de Diseño de Ant Design](https://github.com/ant-design/ant-design-icons)
- [Colores de Diseño de Ant Design](https://github.com/ant-design/ant-design-colors)
- [Páginas de Destino](https://landing.ant.design)
- [Movimiento](https://motion.ant.design)
- [Mercado Scaffold](http://scaffold.ant.design)
- [Instrucción para Desarrolladores](https://github.com/ant-design/ant-design/wiki/Development)
- [Nota de la Versión de Control de Versiones](https://github.com/ant-design/ant-design/wiki/%E8%BD%AE%E5%80%BC%E8%A7%84%E5%88%99%E5%92%8C%E7%89%88%E6%9C%AC%E5%8F%91%E5%B8%83%E6%B5%81%E7%A8%8B)
- [FAQ](https://ant.design/docs/react/faq)
- [Plantilla de CodeSandbox](https://u.ant.design/codesandbox-repro) para reportes de errores
- [Tema personalizado](https://ant.design/docs/react/customize-theme)
- [Cómo Postularse para ser Colaborador](https://github.com/ant-design/ant-design/wiki/Collaborators#how-to-apply-for-being-a-collaborator)

## ⌨️ Desarrollo

Utilice Gitpod, un entorno de desarrollo en línea gratuito para GitHub.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/ant-design)

O clonar localmente:

```bash
$ git clone git@github.com:ant-design/ant-design.git
$ cd ant-design
$ npm install
$ npm start
```

Abra su navegador y visite http://127.0.0.1:8001 , vea más en [Desarollo](https://github.com/ant-design/ant-design/wiki/Development).

## 🤝 Contribuyendo [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Lea nuestro [guía de contribución](https://ant.design/docs/react/contributing) y construyamos un mejor antd juntos.

Damos la bienvenida a todas las contribuciones. Por favor lea nuestro[CONTRIBUTING.md](https://github.com/ant-design/ant-design/blob/master/.github/CONTRIBUTING.md) primero. Puede enviar ideas como [solicitudes de extracción](https://github.com/ant-design/ant-design/pulls) o como [problemas de GitHub](https://github.com/ant-design/ant-design/issues). Si desea mejorar el código, consulte las [Instrucciones de Desarrollo](https://github.com/ant-design/ant-design/wiki/Development) y ¡diviértase! :)

Si usted es un colaborador, siga nuestro [principio de solicitud de extracción](https://github.com/ant-design/ant-design/wiki/PR-principle) para crear una solicitud de extracción con una [plantilla de colaborador](https://github.com/ant-design/ant-design/compare?expand=1&template=collaborator.md).

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/34526884)

## ❤️ Patrocinadores [![](https://opencollective.com/ant-design/tiers/sponsors/badge.svg?label=Sponsors&color=brightgreen)](https://opencollective.com/ant-design#support) [![](https://opencollective.com/ant-design/tiers/backers/badge.svg?label=Backers&color=brightgreen)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/sponsors.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)

[![](https://opencollective.com/ant-design/tiers/backers.svg?avatarHeight=36)](https://opencollective.com/ant-design#support)
