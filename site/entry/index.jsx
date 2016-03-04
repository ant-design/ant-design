import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import * as utils from './utils';

import '../common/lib';
import App from '../component/App';
import Home from '../component/Home';
import Article from '../component/Article';
import introduce from '../../_site/data/introduce';
import gettingStarted from '../../_site/data/getting-started';
import install from '../../_site/data/install';
import upgradeNotes from '../../_site/data/upgrade-notes';
import changelog from '../../_site/data/changelog';
import ReactComponents from '../component/ReactComponents';
import ComponentDoc from '../component/ComponentDoc';
import componentDocsList from '../../_site/data/component-docs-list';
import demosList from '../../_site/data/demos-list';

import practice from '../../_site/data/practice';
import pattern from '../../_site/data/pattern';
import spec from '../../_site/data/spec';
import resource from '../../_site/data/resource';

const Introduce = () => <Article content={introduce[0]} />;
const GettingStarted = () => <Article content={gettingStarted[0]} />;
const Install = () => <Article content={install[0]} />;
const UpgradeNotes = () => <Article content={upgradeNotes[0]} />;
const Changelog = () => <Article content={changelog[0]} />;

const demosListChildren = componentDocsList.map((componentDoc) => {
  const key = componentDoc.meta.english.toLowerCase();
  const ComponentDocWrapper =
          () => <ComponentDoc doc={componentDoc} demos={demosList[key]} />;

  return <Route path={key} component={ComponentDocWrapper} key={key} />;
});

const Practice = utils.generateContainer('practice', practice);
const practiceChildren = utils.generateChildren(practice);

const Pattern = utils.generateContainer('pattern', pattern);
const patternChildren = utils.generateChildren(pattern);

const Spec = utils.generateContainer('spec', spec);
const specChildren = utils.generateChildren(spec);

const Resource = utils.generateContainer('resource', resource);
const resourceChildren = utils.generateChildren(resource);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="components" component={ReactComponents}>
        <IndexRoute component={Introduce} />
        <Route path="introduce" component={Introduce} />
        <Route path="getting-started" component={GettingStarted} />
        <Route path="install" component={Install} />
        <Route path="upgrade-notes" component={UpgradeNotes} />
        <Route path="changelog" component={Changelog} />
        { demosListChildren }
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
