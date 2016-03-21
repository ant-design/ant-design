import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import antd from '../../';
import * as utils from './utils';
import '../common/lib';
import App from '../component/App';
import Home from '../component/Home';
import practice from '../../_site/data/practice';
import pattern from '../../_site/data/pattern';
import reactComponents from '../../_site/data/react-components';
import spec from '../../_site/data/spec';
import resource from '../../_site/data/resource';
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

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="components" component={ReactComponents}>
        { utils.generateIndex(reactComponents) }
        <Route path=":children"
          component={utils.getChildrenWrapper(reactComponents)} />
      </Route>
      { redirects }
      <Route path="docs/practice" component={Practice}>
        { utils.generateIndex(practice) }
        <Route path=":children"
          component={utils.getChildrenWrapper(practice)} />
      </Route>
      <Route path="docs/pattern" component={Pattern}>
        { utils.generateIndex(pattern) }
        <Route path=":children"
          component={utils.getChildrenWrapper(pattern)} />
      </Route>
      <Route path="docs/spec" component={Spec}>
        { utils.generateIndex(spec) }
        <Route path=":children"
          component={utils.getChildrenWrapper(spec)} />
      </Route>
      <Route path="docs/resource" component={Resource}>
        { utils.generateIndex(resource) }
        <Route path=":children"
          component={utils.getChildrenWrapper(resource)} />
      </Route>
    </Route>
  </Router>
  , document.getElementById('react-content')
);
