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

// TODO: pack dependencies with atool build
// Expose React, ReactDOM
window.react = React;
window['react-dom'] = ReactDOM;
window.antd = antd;

const ReactComponents = utils.generateContainer(reactComponents);
const reactComponentsChildren = utils.generateChildren(reactComponents);

const Practice = utils.generateContainer(practice);
const practiceChildren = utils.generateChildren(practice);

const Pattern = utils.generateContainer(pattern);
const patternChildren = utils.generateChildren(pattern);

const Spec = utils.generateContainer(spec);
const specChildren = utils.generateChildren(spec);

const Resource = utils.generateContainer(resource);
const resourceChildren = utils.generateChildren(resource);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="components" component={ReactComponents}>
        { reactComponentsChildren }
      </Route>
      <Redirect from="docs/react/introduce" to="components/introduce" />
      <Redirect from="docs/react/getting-started"
        to="components/getting-started" />
      <Redirect from="docs/react/install" to="components/install" />
      <Redirect from="docs/react/upgrade-notes" to="components/upgrade-notes" />
      <Redirect from="CHANGELOG" to="components/changelog" />
      <Route path="docs/practice" component={Practice}>
        { practiceChildren }
      </Route>
      <Route path="docs/pattern" component={Pattern}>
        { patternChildren }
      </Route>
      <Route path="docs/spec" component={Spec}>
        { specChildren }
      </Route>
      <Route path="docs/resource" component={Resource}>
        { resourceChildren }
      </Route>
    </Route>
  </Router>
  , document.getElementById('react-content')
);
