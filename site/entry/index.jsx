import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
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

// Expose React, ReactDOM
window.react = React;
window['react-dom'] = ReactDOM;
window.antd = antd;

function addFileNameToMeta(data) {
  Object.keys(data).forEach((key) => {
    data[key].meta.fileName = key;
  });
  return data;
}

const ReactComponents = utils.generateContainer('components', reactComponents);
const reactComponentsChildren = utils.generateChildren(addFileNameToMeta(reactComponents));

const Practice = utils.generateContainer('practice', practice);
const practiceChildren = utils.generateChildren(practice);

const Pattern = utils.generateContainer('pattern', pattern);
const patternChildren = utils.generateChildren(pattern);

const Spec = utils.generateContainer('spec', spec);
const specChildren = utils.generateChildren(addFileNameToMeta(spec));

const Resource = utils.generateContainer('resource', resource);
const resourceChildren = utils.generateChildren(resource);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="components" component={ReactComponents}>
        { reactComponentsChildren }
      </Route>
      <Route path="practice" component={Practice}>
        { practiceChildren }
      </Route>
      <Route path="pattern" component={Pattern}>
        { patternChildren }
      </Route>
      <Route path="spec" component={Spec}>
        { specChildren }
      </Route>
      <Route path="resource" component={Resource}>
        { resourceChildren }
      </Route>
    </Route>
  </Router>
  , document.getElementById('react-content')
);
