import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import antd from '../../index.js';
import * as utils from './utils';
import '../common/lib';
import App from '../component/App';
import Home from '../component/Home';
import NotFound from '../component/NotFound';
import practice from '../../_data/practice';
import pattern from '../../_data/pattern';
import reactComponents from '../../_data/react-components';
import spec from '../../_data/spec';
import resource from '../../_data/resource';
import config from '../website.config';

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

  hashHistory.listen((loc) => {
    ga('send', 'pageview', loc.pathname + loc.search);
  });
  /* eslint-enable */
}

ReactDOM.render(
  <Router history={hashHistory}>
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
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
  , document.getElementById('react-content')
);
