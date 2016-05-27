import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Router, Route, IndexRoute, Redirect, useRouterHistory } from 'react-router';
import antd from '../../index.js';
import * as utils from './utils';
import '../common/lib';
import App from '../component/App';
import Home from '../component/Home/index';
import NotFound from '../component/NotFound/index';
import practice from '../../_data/practice';
import pattern from '../../_data/pattern';
import reactComponents from '../../_data/react-components';
import spec from '../../_data/spec';
import resource from '../../_data/resource';
import config from '../website.config';
import enLocale from './en-US.js';
import cnLocale from './zh-CN.js';
import { createHashHistory } from 'history';

// useRouterHistory creates a composable higher-order function
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

// TODO: pack dependencies with atool build
// Expose React, ReactDOM
window.react = React;
window['react-dom'] = ReactDOM;
window.antd = antd;

const ReactComponents = utils.generateContainer(reactComponents);
const Practice = utils.generateContainer(practice);
const Pattern = utils.generateContainer(pattern);
const Spec = utils.generateContainer(spec);
const Resource = utils.generateContainer(resource);
const redirects = Object.keys(config.redirects).map((from, index) => {
  return <Redirect from={from} to={config.redirects[from]} key={index} />;
});

// Enable Google Analytics
if (!location.port) {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-72788897-1', 'auto');
  ga('send', 'pageview');

  appHistory.listen((loc) => {
    ga('send', 'pageview', loc.pathname + loc.search);
  });
  /* eslint-enable */
}

// Polyfill
const areIntlLocalesSupported = require('intl-locales-supported');
const localesMyAppSupports = ['zh-CN', 'en-US'];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(localesMyAppSupports)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and patch the constructors we need with the polyfill's.
    /* eslint-disable global-require */
    const IntlPolyfill = require('intl');
    /* eslint-enable global-require */
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  /* eslint-disable global-require */
  global.Intl = require('intl');
  /* eslint-enable global-require */
}


const isZhCN = (typeof localStorage !== 'undefined' && localStorage.getItem('locale') !== 'en-US');
        // (typeof localStorage !== 'undefined' && localStorage.getItem('locale') === 'zh-CN') ||
        // (navigator.language === 'zh-CN');
const appLocale = isZhCN ? cnLocale : enLocale;
addLocaleData(appLocale.data);

ReactDOM.render(
  <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
    <Router history={appHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="components" component={ReactComponents}>
          {utils.generateIndex(reactComponents)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(reactComponents)}
            component={utils.getChildrenWrapper(reactComponents)} />
        </Route>
        {redirects}
        <Route path="docs/react" component={ReactComponents}>
          {utils.generateIndex(reactComponents)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(reactComponents)}
            component={utils.getChildrenWrapper(reactComponents)} />
        </Route>
        <Route path="docs/practice" component={Practice}>
          {utils.generateIndex(practice)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(practice)}
            component={utils.getChildrenWrapper(practice)} />
        </Route>
        <Route path="docs/pattern" component={Pattern}>
          {utils.generateIndex(pattern)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(pattern)}
            component={utils.getChildrenWrapper(pattern)} />
        </Route>
        <Route path="docs/spec" component={Spec}>
          {utils.generateIndex(spec)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(spec)}
            component={utils.getChildrenWrapper(spec)} />
        </Route>
        <Route path="docs/resource" component={Resource}>
          {utils.generateIndex(resource)}
          <Route path=":children"
            onEnter={utils.getEnterHandler(resource)}
            component={utils.getChildrenWrapper(resource)} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </IntlProvider>
  , document.getElementById('react-content')
);
